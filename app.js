var RoonApi          = require("node-roon-api");
var RoonApiStatus    = require("node-roon-api-status");
var RoonApiTransport = require("node-roon-api-transport");

var zones=[];
var zone;
var name=process.argv[2];
var ctrlcmd=process.argv[3];

var roon = new RoonApi({
    extension_id:        'com.vernaillen.roon.test',
    display_name:        "Roon API Test",
    display_version:     "0.0.1",
    publisher:           'Wouter Vernaillen',
    email:               'wouter@vernaillen.com',
    website:             'https://github.com/vernaillen/roon-extension-test',

    core_paired: function(core) {
        transport = core.services.RoonApiTransport;

        // get available zones
        transport.subscribe_zones(function(cmd, data) {
            if (cmd == "Subscribed") {
                console.log("Subscribed:", data);
                zones = data.zones;
            } else if (cmd == "Changed") {
                if ("zones_added" in data) {
//                    console.log("zones_added:", data.zones_added);
                    for (var item in data.zones_added) {
                        if (!getZoneByName(data.zones_added[item].display_name)) {     $
                            zones.push(data.zones_added[item]);
                        }
                    }
                }
            } else {
                console.log("unhandled transport cmd",cmd,":",data);
            }
            zone=getZoneByName(name);


            //Send Control command to Roon
            transport.control(zone,ctrlcmd);
        });
    },

    core_unpaired: function(core) {
        console.log("unpaired core", core.display_name);
    }


});

var svc_status = new RoonApiStatus(roon);

roon.init_services({
    required_services: [ RoonApiTransport ],
    provided_services: [ svc_status ],
});

svc_status.set_status("All is good", false);

roon.start_discovery();

// helper function to get zone by their name
function getZoneByName(name) {
    for (item in zones) {
        if (name == zones[item].display_name) {
            return zones[item];
        }
    }
    return null;
}
