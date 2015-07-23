var makeHolmenkollbanenMap = function (dataset, msv,options,tmap) {
    var self = {};

    // private variables
    var ticker;
    var map;
    var train;
    options = options || {};

    var initialise = function () {
        map = new L.Map(tmap);
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osm = new L.TileLayer(osmUrl, {
            minZoom: 8,
            maxZoom: 20
        });

        map.setView(new L.LatLng(59.929, 10.715), 12);
        map.addLayer(osm);
        map.dragging.disable();

        // add the trainPath
        var baneLayer = L.geoJson(holmenkollbanen).on('click', function (e) {

            var latLng = {
                lat: function () {
                    return e.latlng.lat;
                },
                lng: function () {
                    return e.latlng.lng;
                }
            };
            var point = find_closest(latLng);
            move_train(point.lat, point.lng)
            jumpTo(point.time);
        }).addTo(map);


        // add stations
        stations.forEach(function (station) {
            if (station.lat && station.long) {
                L.marker([station.lat, station.long]).on('click', function (e) {
                    jumpTo(station.time);
                }).bindPopup(station.name).on('mouseout', function (e) {
                    this.closePopup();
                }).on('mouseover', function (e) {
                    this.openPopup();
                }).on('contextmenu', function (e) {
                    jumpTo(station.time);
                }).addTo(map);
            }
        },this);




        var trainIcon = L.icon({
            iconUrl: '../resources/wcs/mediascape-nor-map/map/img/train.png',
            iconSize: [34, 34], // size of the icon
            iconAnchor: [17, 17], // point of the icon which will correspond to marker's location
        });

        train = L.marker([59.92965277195432, 10.7156038551178], {
            icon: trainIcon,
            clickable: false
        }).addTo(map);


        // Connect with the clock
        follow_train();
    };

    var find_closest = function (latlng) {
        var min_dist = 10000;
        var closest_point;
        for (i in dataset) {
            var entry = dataset[i];
            var dst = Math.abs(parseFloat(entry.lat) - latlng.lat()) + Math.abs(parseFloat(entry.lng) - latlng.lng());
            if (dst < min_dist) {
                closest_point = entry;
                min_dist = dst;
            }
        }
        return closest_point;
    };

    var jumpTo = function (position) {
        msv.update(position, null, null);
    };

    var move_train = function (lat, lng) {
        train.setLatLng(new L.LatLng(lat, lng));
        follow_train();
    };
    // pan map to follow train
    var follow_train = function () {
        var pos = train.getLatLng();
        map.setView([pos.lat, pos.lng]);
    };




    // refresh train on map
    var refresh = function (_seconds) {
        var seconds = parseFloat(msv.pos);
        // Search through the data to find the correct point
        var idx = 0;
        for (i in dataset) {
            if (dataset[i]["time"] > seconds) {
                idx = i;
                break;
            }
        }
        if (idx == 0) {
            move_train(dataset[0]["lat"], dataset[0]["lng"]);
        } else {
            // Interpolate between last point and this one
            var delta_t = parseFloat(dataset[idx]["time"]) - parseFloat(dataset[idx - 1]["time"])
            var relative_t = (seconds - parseFloat(dataset[idx - 1]["time"])) / delta_t;
            var lat = parseFloat(dataset[idx - 1]["lat"]) + (parseFloat(dataset[idx]["lat"]) - parseFloat(dataset[idx - 1]["lat"])) * relative_t;
            var lng = parseFloat(dataset[idx - 1]["lng"]) + (parseFloat(dataset[idx]["lng"]) - parseFloat(dataset[idx - 1]["lng"])) * relative_t;
            move_train(lat, lng);
        }
    };




    // Initialise
    initialise();
    msv.on("timeupdate", refresh);
    return self;
};
