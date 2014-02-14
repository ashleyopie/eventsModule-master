'use strict';

angular.module('eventsAppApp')
    .factory('defaultImages', function() {
        // Service logic
        // ...
        var category = [{
            "id": 100000,
            "parent_id": 0,
            "title": "PublicCats",
            "image": ""
        }, {
            "id": 1000001,
            "parent_id": 100000,
            "title": "Arts",
            "image": "images/by-top-level-category/art.png"
        }, {
            "id": 1000002,
            "parent_id": 1000001,
            "title": "Dance",
            "image": "images/by-top-level-category/sub-category-1/arts/dance.png"
        }, {
            "id": 1000003,
            "parent_id": 1000001,
            "title": "Exhibits & Gallery Shows",
            "shortTitle": "Exhibits",
            "image": ""
        }, {
            "id": 1000004,
            "parent_id": 1000001,
            "title": "Fashion",
            "image": "images/by-top-level-category/sub-category-1/arts/fashion.png"
        }, {
            "id": 1000006,
            "parent_id": 1000001,
            "title": "Film",
            "image": "images/by-top-level-category/sub-category-1/arts/film.png"
        }, {
            "id": 1000005,
            "parent_id": 1000001,
            "title": "Literary",
            "image": "images/by-top-level-category/sub-category-1/arts/literary.png"
        }, {
            "id": 1000007,
            "parent_id": 1000001,
            "title": "Theater",
            "image": "images/by-top-level-category/sub-category-1/arts/theater.png"
        }, {
            "id": 1000008,
            "parent_id": 100000,
            "title": "Community",
            "image": "images/by-top-level-category/community.png"
        }, {
            "id": 1000016,
            "parent_id": 1000008,
            "title": "Business & Networking",
            "shortTitle": "Business",
            "image": "images/by-top-level-category/sub-category-1/community/businessnetworking.png"
        }, {
            "id": 1000018,
            "parent_id": 1000008,
            "title": "Business Events",
            "image": "images/by-top-level-category/sub-category-1/community/businessnetworking.png"
        }, {
            "id": 1000014,
            "parent_id": 1000008,
            "title": "Classes & Workshops",
            "shortTitle": "Classes",
            "image": "images/by-top-level-category/sub-category-1/community/classesworkshops.png"
        }, {
            "id": 1000012,
            "parent_id": 1000008,
            "title": "Expos & Trade Shows",
            "image": ""
        }, {
            "id": 1000011,
            "parent_id": 1000008,
            "title": "Family Friendly",
            "image": "images/by-top-level-category/sub-category-1/community/familyfriendly.png"
        }, {
            "id": 1000009,
            "parent_id": 1000008,
            "title": "Festivals",
            "image": ""
        }, {
            "id": 1000010,
            "parent_id": 1000008,
            "title": "Fundraisers & Volunteer Opportunities",
            "shortTitle": "Volunteer",
            "image": ""
        }, {
            "id": 1000013,
            "parent_id": 1000008,
            "title": "Home & Garden",
            "image": "images/by-top-level-category/sub-category-1/community/homeandgarden.png"
        }, {
            "id": 1000015,
            "parent_id": 1000008,
            "title": "Special Events",
            "image": ""
        }, {
            "id": 1000017,
            "parent_id": 1000008,
            "title": "Talks & Lectures",
            "image": ""
        }, {
            "id": 1000019,
            "parent_id": 100000,
            "title": "Food & Drink",
            "image": "images/by-top-level-category/Fooddrink.png"
        }, {
            "id": 1000020,
            "parent_id": 1000019,
            "title": "Bars",
            "image": "images/by-top-level-category/nightlife.png"
        }, {
            "id": 1000021,
            "parent_id": 1000019,
            "title": "Breweries",
            "image": "images/by-top-level-category/sub-category-1/fooddrink/brewery.png"
        }, {
            "id": 1000022,
            "parent_id": 1000019,
            "title": "Coffeehouses",
            "image": "images/by-top-level-category/sub-category-1/fooddrink/coffeehouses.png"
        }, {
            "id": 1000023,
            "parent_id": 1000019,
            "title": "Farmers Markets",
            "image": "images/by-top-level-category/sub-category-1/fooddrink/farmersmarkets.png"
        }, {
            "id": 1000024,
            "parent_id": 1000019,
            "title": "Restaurants",
            "image": "images/by-top-level-category/sub-category-1/fooddrink/restaurants.png"
        }, {
            "id": 1000025,
            "parent_id": 1000019,
            "title": "Wineries",
            "image": "images/by-top-level-category/sub-category-1/fooddrink/winery.png"
        }, {
            "id": 1000031,
            "parent_id": 100000,
            "title": "Live Music",
            "image": "images/by-top-level-category/music.png"
        }, {
            "id": 1000033,
            "parent_id": 1000031,
            "title": "Local Bands",
            "image": "images/by-top-level-category/sub-category-1/livemusic/localbands.png"
        }, {
            "id": 1000032,
            "parent_id": 1000031,
            "title": "Touring Acts",
            "image": ""
        }, {
            "id": 1000026,
            "parent_id": 100000,
            "title": "Nightlife",
            "image": "images/by-top-level-category/nightlife.png"
        }, {
            "id": 1000028,
            "parent_id": 1000026,
            "title": "Comedy",
            "image": "images/by-top-level-category/sub-category-1/nightlife/comedy.png"
        }, {
            "id": 1000029,
            "parent_id": 1000026,
            "title": "Concerts",
            "image": "images/by-top-level-category/sub-category-1/nightlife/concerts.png"
        }, {
            "id": 1000027,
            "parent_id": 1000026,
            "title": "DJs & Dancing",
            "image": "images/by-top-level-category/sub-category-1/nightlife/djsdancing.png"
        }, {
            "id": 1000030,
            "parent_id": 1000026,
            "title": "Karaoke",
            "image": "images/by-top-level-category/sub-category-1/nightlife/karaoke.png"
        }, {
            "id": 1000034,
            "parent_id": 100000,
            "title": "Recreation & Outdoors",
            "shortTitle": "Recreation",
            "image": "images/by-top-level-category/outdoor.png"
        }, {
            "id": 1000036,
            "parent_id": 1000034,
            "title": "Adult Recreational Sports",
            "shortTitle": "Sports",
            "image": "images/by-top-level-category/sub-category-1/recreation_outdoors/adultrec.png"
        }, {
            "id": 1000035,
            "parent_id": 1000034,
            "title": "Fitness Events",
            "shortTitle": "Fitness",
            "image": ""
        }, {
            "id": 1000037,
            "parent_id": 1000034,
            "title": "Nature",
            "image": "images/by-top-level-category/sub-category-1/recreation_outdoors/nature.png"
        }, {
            "id": 1000038,
            "parent_id": 100000,
            "title": "Spectator Sports",
            "image": "images/by-top-level-category/sports.png"
        }, {
            "id": 1000039,
            "parent_id": 1000038,
            "title": "Auto Racing",
            "image": "images/by-top-level-category/sub-category-1/spectatorsports/autoracing.png"
        }, {
            "id": 1000040,
            "parent_id": 1000038,
            "title": "Baseball",
            "image": "images/by-top-level-category/sub-category-1/spectatorsports/baseball.png"
        }, {
            "id": 1000041,
            "parent_id": 1000038,
            "title": "Basketball",
            "image": "images/by-top-level-category/sub-category-1/spectatorsports/basketball.png"
        }, {
            "id": 1000042,
            "parent_id": 1000038,
            "title": "Football",
            "image": "images/by-top-level-category/sub-category-1/spectatorsports/football.png"
        }, {
            "id": 1000043,
            "parent_id": 1000038,
            "title": "Hockey",
            "image": "images/by-top-level-category/sub-category-1/spectatorsports/HOCKEY.png"
        }, {
            "id": 1000044,
            "parent_id": 1000038,
            "title": "Soccer",
            "image": "images/by-top-level-category/sub-category-1/spectatorsports/soccer.png"
        }, {
            "id": 200000,
            "parent_id": 0,
            "title": "SystemCats",
            "image": ""
        }, {
            "id": 200001,
            "parent_id": 200000,
            "title": "Featured Events",
            "image": ""
        }, {
            "id": 1000470,
            "parent_id": 0,
            "title": "Unknown",
            "image": ""
        }, {
            "id": 1000467,
            "parent_id": 0,
            "title": "Unknown",
            "image": ""
        }];

        function addDefaultImage(object) {
            var i;


            i = 0;
            while ((object.categories[0].id != category[i].id)) {
                i++;
                //console.log(object.categories[0].id + ' : ' + category[i].id);

                if (typeof category[i].id !== undefined) {
                    if (object.categories[0].id === category[i].id) {
                        object.default_image = {
                            id: category[i].id,
                            parent_id: category[i].parent_id,
                            title: category[i].title,
                            image: category[i].image
                        }
                    };
                };
            };
            //console.log(object.default_image);
            return object.default_image;
        }

        // Public API here
        return {
            addDefaultImage: function(object) {
                return addDefaultImage(object);
            }
        };
    });