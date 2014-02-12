if (typeof PlanetDiscoverAPI === 'undefined') {
    PlanetDiscoverAPI = {};
}
if (typeof PlanetDiscoverCached === 'undefined') {
    PlanetDiscoverCached = {};
}



PlanetDiscoverAPI = {

    // Public Interface

    // API config (default values, can be overriden in init())
    config: {

        PD_API_KEY: 'vm29t4jhk9vlkpfl7j95omgu0',
        debuggingMode: true,
        debugAPIOutputContainer: '#testAPIOutput',
        useCache: true,
        domainURL: document.domain,
        displayMode: "grid", // options: grid, 3up, list,

        // test environment API endpoint URLs (must have ? to allow '&api_key=' after)
        apiEndPoints: {
            // get Event Categories API URL
            EventCategoriesEndPointURL: 'http://indystar.admin.test.planetdiscover.com/api/categories/?type=events',
            // get Events API URL
            EventsEndPointURL: 'http://indystar.admin.test.planetdiscover.com/api/events/?'

        },

        defaultDisplay: {
            'tba': "TBA",
            'allday': "All Day",
            'tillclose': "'till close",
            'dawn': "Dawn",
            'dusk': "Dusk"

        },

        more: {
            maxLength: 235,
            displayText: "more...",
            css_class: "planetdiscover-event-srpdetail-more",
            extendedText_css_class: "planetdiscover-event-srpdetail-online-description-extended"
        },

        defaultEventPicturesByTopLevelCategory: {
            // Art
            1000001: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/art.png',
            // Community
            1000008: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/community.png',
            // Food & Drinnk
            1000019: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/Fooddrink.png',
            // Nightlife
            1000026: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/nightlife.png',
            // Live Music
            1000031: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/music.png',
            // Outdoors & Nature
            1000034: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/outdoor.png',
            // Sports
            1000048: '/digital/production/PlanetDiscover/wp-content/themes/noteworthy/library/images/default-event-images/by-top-level-category/sports.png'
        },

        // display values for date formatting
        weekdays: {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        },
        months: {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        },
    },
    lazyLoading: {
        resultsPerQuery: 10
    },
    // holds all events
    events: [

    ],
    // holds all events indexed by id
    indexedEvents: {

    },
    indexedVenues: {

    },
    // holds all events for display on the search results page (subset of all events)
    srpEvents: [

    ],
    arrows: {
        currentEventKey: null
    },
    lastEventsSearchResults: {},


    // accepts options to override config values
    init: function(options) {

        this.config = $.extend(this.config, options);

        this.getEventCategoriesFlat();
        this.getEventCategoriesTree();
        this.objectifyCategoryArrays();

    },


    // returns eventCategoriesTree, else calls callback(eventCategoriesTree)
    eventCategoriesTree: function(callback) {
        if (typeof callback === 'undefined') {
            return this.indexedEventCategoriesTree;
        } else {
            callback(this.indexedEventCategoriesTree);
        }

    },
    // returns eventCategoriesTree, else calls callback(eventCategoriesTree)
    eventCategoriesFlat: function(callback) {
        if (typeof callback === 'undefined') {
            return this.indexedEventCategoriesFlat;
        } else {
            callback(this.indexedEventCategoriesFlat);
        }
    },

    eventTopCategories: function(callback) {
        topEventCategories = this.indexedEventCategoriesTree;

        if (typeof callback === 'undefined') {
            return topEventCategories;
        } else {
            callback(topEventCategories);
        }
    },

    eventSubCategories: function(categoryId, callback) {
        category = this.indexedEventCategoriesTree[categoryId];
        subCategories = category.children;

        if (typeof callback === 'undefined') {
            return subCategories;
        } else {
            callback(subCategories);
        }

    },

    eventQuery: function(options, callback) {

        if (typeof options === 'undefined') {
            options = {};
        }

        PlanetDiscoverAPI.performance.eventsQueryAjaxTime = new Timer();

        query = new PlanetDiscoverAPI.objEventQuery(options);

        requestObject = query.options;

        that = this;
        extResponseObject = null;

        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            data: requestObject,
            url: this.config.apiEndPoints.EventsEndPointURL + '&api_key=' + this.config.PD_API_KEY,
            success: function(responseObject) {
                if (that.config.debuggingMode === true) {
                    that.showResults(JSON.stringify(responseObject, false, " "));
                    console.log(responseObject);
                }

                // build custom parsed event properties
                responseObject.events = PlanetDiscoverAPI.customParseEvents(responseObject.events);
                responseObject.indexedEvents = PlanetDiscoverAPI.indexEventsById(responseObject.events);

                // save last event search results
                that.lastEventsSearchResults = responseObject;

                if (typeof callback !== 'undefined') {
                    callback(responseObject);
                } else {
                    extResponseObject = responseObject;
                }
            },
            async: (typeof callback === 'undefined') ? false : true
        });

        if (typeof callback === 'undefined') {
            return extResponseObject;
        }

    },

    //handlebars: new HandlebarsRenderer(),



    // private properties
    unindexedEventCategoriesFlat: [],
    indexedEventCategoriesFlat: [],
    indexedEventCategoriesTree: [],

    // Private Methods

    // for storing performance measurements
    performance: {
        _time_units: "milliseconds"


    },

    // get EventCategories (flat array) .. if not cached, then fetch
    getEventCategoriesFlat: function() {

        // blank out API Result
        this.showResults('');

        // if cached value does not exist, or config.useCache === false, fetch categories
        if (
            typeof PlanetDiscoverCached.eventCategoriesFlat === 'undefined' || this.config.useCache === false
        ) {
            // debugging info
            if (this.config.debuggingMode === true) {
                console.log('fetching EventCategories (flat) from PD API');
            }

            // fetch categories
            this.fetchEventCategoriesFlat();

            // else, pull categories from cache
        } else {

            // debugging info
            if (this.config.debuggingMode === true) {
                console.log('pulling EventCategories (flat) from cache');
            }

            // pull categories from cache
            this.unindexedEventCategoriesFlat = PlanetDiscoverCached.eventCategoriesFlat;
        }

        this.indexEventCategoriesFlat();
        this.indexedEventCategoriesFlat = PlanetDiscoverAPI.appendCategoryTiers(this.indexedEventCategoriesFlat);

        if (this.config.debuggingMode === true) {
            console.log(this.indexedEventCategoriesFlat);
        }


    },

    indexEventCategoriesFlat: function() {
        categories = this.unindexedEventCategoriesFlat.categories;

        // first index by their own id
        indexedCategories = new Array();
        indexedCategories[0] = {
            parent_id: null,
            id: 0
        };
        for (key in categories) {
            category = categories[key];
            indexedCategories[category.id] = category;
        }

        delete indexedCategories[0];

        this.indexedEventCategoriesFlat = indexedCategories;

    },

    fetchEventCategoriesFlat: function() {
        that = this;
        jQuery.ajax({
            url: this.config.apiEndPoints.EventCategoriesEndPointURL + '&api_key=' + this.config.PD_API_KEY,
            success: function(eventCategoriesFlat) {
                if (that.config.debuggingMode === true) {
                    that.showResults(JSON.stringify(eventCategoriesFlat, false, " "));
                    console.log(eventCategoriesFlat);
                }

                that.setEventCategoriesFlat(eventCategoriesFlat);
            },
            async: false
        });

    },

    setEventCategoriesFlat: function(eventCategoriesFlat) {
        this.unindexedEventCategoriesFlat = eventCategoriesFlat;
    },

    getEventCategoriesTree: function() {
        if (
            typeof PlanetDiscoverCached.eventCategoriesTree === 'undefined' || this.config.useCache === false
        ) {
            // get categories, then build tree
            if (this.indexedEventsCategoriesFlat === 'undefined') {
                this.getEventCategoriesFlat();
            }
            this.buildEventCategoriesTree();
        } else {
            // cached category tree
            this.eventCategoriesTree = PlanetDiscoverCached.eventCategoriesTree;
        }

        if (this.config.debuggingMode === true) {
            console.log(this.indexedEventCategoriesTree);
        }

    },

    buildEventCategoriesTree: function() {
        categories = this.unindexedEventCategoriesFlat.categories;

        // first index by their own id
        indexedCategories = new Array();
        indexedCategories[0] = {
            parent_id: null,
            id: 0
        };
        for (key in categories) {
            category = categories[key];
            indexedCategories[category.id] = category;
        }

        // then nest children
        for (key in categories) {
            category = categories[key];

            if (category.id !== 0 && indexedCategories[category.parent_id]) {
                if (typeof indexedCategories[category.parent_id].children === 'undefined') {
                    indexedCategories[category.parent_id].children = new Array();
                }
                // nest in children
                indexedCategories[category.parent_id].children.push(category);

                // remove this from the top level
                delete indexedCategories[category.id];
            }
        }

        delete indexedCategories[0];

        // now index the children
        for (key in indexedCategories) {
            category = indexedCategories[key];
            indexedChildren = new Array();
            for (childKey in category.children) {
                child = category.children[childKey];
                indexedChildren[child.id] = child;
            }
            category.children = $.extend({}, indexedChildren);
        }


        this.indexedEventCategoriesTree = indexedCategories;

    },


    showResults: function(strResults) {
        $(this.config.debugAPIOutputContainer).html('<pre>' + strResults + '</pre>');
    },
    showCategoryTree: function() {
        strTree = JSON.stringify(this.indexedEventCategoriesTree, false, " ");

        $(this.config.debugAPIOutputContainer).html('<pre>' + strTree + '</pre>');
    },
    showCategoryFlat: function() {
        strFlat = JSON.stringify(this.indexedEventCategoriesFlat, false, " ");

        $(this.config.debugAPIOutputContainer).html('<pre>' + strFlat + '</pre>');
    },
    objectifyCategoryArrays: function() {
        this.indexedEventCategoriesFlat = $.extend({}, this.indexedEventCategoriesFlat);
        this.indexedEventCategoriesTree = $.extend({}, this.indexedEventCategoriesTree);
    },
    getOneWeekDate: function() {
        today = microtime();
        oneWeek = today + (60 * 60 * 24 * 7);
        oneWeekDateString = formatDate(oneWeek);
        return oneWeekDateString;
    }
};

PlanetDiscoverAPI.objEventQuery = function(queryOptions) {

    // default options (none of these api request parameters are required)
    this.options = {

        // api response output
        format: 'json',

        // api response limit
        limit: 10,

        // api response offset (pagination)
        start: 0,

        // api modified since (x month ago)
        ms: null,

        // pulls specific events (comma-separated string)
        ids: null,

        // shows only Deleted event, otherwise shows only nonDeleted events
        //onlyDeleted     : false,

        // startDate and endDate
        // api defaults to sd -5y ed +10y
        // format is string("mm/dd/yyyy" or "mm/dd/yyyy hh:mm:ss")
        // also accepts "today"
        sd: null,
        ed: null,

        // comma-separated string, restricts result set 
        // to events occuring in provided zipcodes
        zip: null,

        // restrict result set of Events to only events occuring at given venueId
        venueId: null,

        // restrict to only events in these categories (comma-seperate string of IDs)
        catIds: null,

        // also search child categories for events?
        searchChildCats: true,

        // attribute filter (see docs, to be implemented later, 
        // will contain enum of attribs, methods for toggling/setting them
        // and method for building the api string for submission
        attribFilter: null,

        // Keywords (spaaaaaace-separated string)
        kw: null,

        // address and distance, restricts search results by distance
        address: null, // string
        distaince: null, // string, but decimal value, number of miles away from address

        // sort method - valid values are:
        // title, score, random, site_title, dateModified, distance, startDate
        sort: 'startDate'


    };

    // method to merge query options with default options 
    this.merge = function(queryOptions) {
        this.options = $.extend(this.options, queryOptions);
    };

    // if queryOptions were passed to constructor, merge them in
    if (typeof queryOptions !== 'undefined') {
        this.merge(queryOptions);
    };


};

PlanetDiscoverAPI.customParseEvents = function(events) {
    PlanetDiscoverAPI.performance.parseEventsTime = new Timer();

    parsedEvents = [];


    for (key in events) {
        // get event
        event = events[key];

        // parse event
        parsedEvent = PlanetDiscoverAPI.eventParser.customParseEvent(event);

        // save event
        parsedEvents.push(parsedEvent);
    }

    PlanetDiscoverAPI.performance.parseEventsTime =
        PlanetDiscoverAPI.performance.parseEventsTime.markEndTime();
    return parsedEvents;
};

PlanetDiscoverAPI.eventParser = {};

PlanetDiscoverAPI.eventParser.customParseEvent = function(event) {

    event.attributes = PlanetDiscoverAPI.indexAttributesByKey(event.attributes);
    event.listing.attributes = PlanetDiscoverAPI.indexAttributesByKey(event.listing.attributes);
    if (event.occurrences.length > 1) {
        event.occurrences = PlanetDiscoverAPI.eventParser.sortOccurrences(event);
    }

    PlanetDiscoverAPI.eventParser.fixOccurrenceTimezones(event);

    // trim whitespace from edges of online_description
    event.online_description = event.online_description.trim();
    event.online_description = event.online_description.replace(/\?\?\?\?\?\?/g, "'");




    // begin building event.parsedValues
    parsedEvent = event;
    parsedEvent.parsedValues = {};

    // if description is long, insert "more"
    if (event.online_description.length > PlanetDiscoverAPI.config.more.maxLength) {
        event.parsedValues.truncated_online_description = PlanetDiscoverAPI.truncateOnlineDescription(event);
    }

    // build unique array of weblinks
    parsedEvent.parsedValues.weblinks = PlanetDiscoverAPI.eventParser.parseWeblinks(event);

    // first event category
    parsedEvent.parsedValues.firstCategory = event.categories[0];
    // additional event categories
    parsedEvent.parsedValues.additionalCategorynames = PlanetDiscoverAPI.eventParser.parseAdditionalCategoryNames(event);
    // main event category
    parsedEvent.parsedValues.mainCategory = PlanetDiscoverAPI.eventParser.parseMainCategory(event);
    // main picture
    parsedEvent.parsedValues.mainPicture = PlanetDiscoverAPI.eventParser.parseMainPicture(event);

    // parse for primary phone
    parsedEvent.parsedValues.primaryPhone = PlanetDiscoverAPI.eventParser.parsePrimaryPhone(event);

    // pull additional category data for event categories from indexedCategoriesFlat
    parsedEvent.categories = PlanetDiscoverAPI.eventParser.parseFullCategories(parsedEvent);
    // parse date_added
    parsedEvent.parsedValues.date_added = PlanetDiscoverAPI.formatDateTime(event.date_added);
    // startTime of first occurence
    parsedEvent.parsedValues.startTime = PlanetDiscoverAPI.eventParser.parseStartTime(event);
    // date of first occurence
    parsedEvent.parsedValues.startDate = PlanetDiscoverAPI.eventParser.parseStartDate(event);

    // custom startTime (time tags)
    if (PlanetDiscoverAPI.eventParser.isTBA(event)) {
        parsedEvent.parsedValues.startTime = PlanetDiscoverAPI.config.defaultDisplay.tba;
    }
    if (PlanetDiscoverAPI.eventParser.isDawn(event)) {
        parsedEvent.parsedValues.startTime = PlanetDiscoverAPI.config.defaultDisplay.dawn;
    }
    if (PlanetDiscoverAPI.eventParser.isDusk(event)) {
        parsedEvent.parsedValues.startTime = PlanetDiscoverAPI.config.defaultDisplay.dusk;
    }
    if (PlanetDiscoverAPI.eventParser.isHours24(event)) {
        parsedEvent.parsedValues.startTime = PlanetDiscoverAPI.config.defaultDisplay.allday;
    }
    if (PlanetDiscoverAPI.eventParser.isTillClose(event)) {
        parsedEvent.parsedValues.startTime = PlanetDiscoverAPI.config.defaultDisplay.tillclose;
    }

    // formatting of endDate



    return parsedEvent;
};

// parse for unique array of web links
PlanetDiscoverAPI.eventParser.parseWeblinks = function(event) {

    // build array of all weblinks
    weblinks = new Array();

    if (!empty(event.website)) {
        weblinks.push(event.website);
    }
    if (!empty(event.web_link_1)) {
        weblinks.push(event.web_link_1);
    }
    if (!empty(event.web_link_2)) {
        weblinks.push(event.web_link_2);
    }
    if (!empty(event.web_link_3)) {
        weblinks.push(event.web_link_3);
    }
    if (!empty(event.listing.website)) {
        weblinks.push(event.listing.website);
    }

    // remove duplicates
    uniqueWeblinks = new Array();
    for (key in weblinks) {
        weblink = weblinks[key];
        if (uniqueWeblinks.indexOf(weblink) === -1) {
            uniqueWeblinks.push(weblink);
        }
    }

    return uniqueWeblinks;

};

PlanetDiscoverAPI.eventParser.parsePrimaryPhone = function(event) {
    if (!empty(event.public_phone)) {
        return event.public_phone;
    }
    if (!empty(event.listing.phone)) {
        return event.listing.phone;
    }
    if (!empty(event.listing.attributes.contact_phone)) {
        return event.listing.attributes.contact_phone;
    }


    return null;
};

PlanetDiscoverAPI.indexEventsById = function(events) {

    indexedEvents = [];

    for (key in events) {
        event = events[key];
        indexedEvents[event.id] = event;
    }

    return indexedEvents;
};

PlanetDiscoverAPI.indexAttributesByKey = function(attributes) {

    indexedAttributes = {};

    for (key in attributes) {
        attribute = attributes[key];
        indexedAttributes[attribute.key] = attribute;
    }

    return indexedAttributes;
};



PlanetDiscoverAPI.eventParser.isTBA = function(event) {
    return PlanetDiscoverAPI.eventParser.hasAttribute(event, 'tba');
};
PlanetDiscoverAPI.eventParser.isDawn = function(event) {
    return PlanetDiscoverAPI.eventParser.hasAttribute(event, 'dawn');
};
PlanetDiscoverAPI.eventParser.isDusk = function(event) {
    return PlanetDiscoverAPI.eventParser.hasAttribute(event, 'dusk');
};
PlanetDiscoverAPI.eventParser.isHours24 = function(event) {
    return PlanetDiscoverAPI.eventParser.hasAttribute(event, 'hours24');
};
PlanetDiscoverAPI.eventParser.isTillClose = function(event) {
    return PlanetDiscoverAPI.eventParser.hasAttribute(event, 'till_close');
};

PlanetDiscoverAPI.eventParser.hasAttribute = function(event, attributeName) {

    // check each attribute of an event
    for (key in event.attributes) {
        attribute = event.attributes[key];
        // if it has the attribute, return true
        if (attribute.key === attributeName) {
            return true;
        }
    }
    // else return false
    return false;
};


PlanetDiscoverAPI.eventParser.sortOccurrences = function(event) {

    var FirstDateTime = new Date(event.occurrences[0].startdatetime);
    var SecondDateTime = new Date(event.occurrences[1].startdatetime);

    if (FirstDateTime > SecondDateTime) {
        sortedOccurrences = PlanetDiscoverAPI.eventParser.reverseOccurrences(event);
    } else {
        sortedOccurrences = event.occurrences;
    }

    return sortedOccurrences;
};

PlanetDiscoverAPI.eventParser.reverseOccurrences = function(event) {
    // reverse order of occurrences so that soonest occurences are first in array
    reOrderedOccurrences = new Array();
    count = 1;
    for (key in event.occurrences) {
        occurrence = event.occurrences[key];

        reOrderedOccurrences[event.occurrences.length - count] = occurrence;
        count++;
    }
    return reOrderedOccurrences;
};

PlanetDiscoverAPI.eventParser.fixOccurrenceTimezones = function(event) {

    for (key in event.occurrences) {
        occurrence = event.occurrences[key];

        // fix time zone issues with searchPublisher (assumes Central, when Eastern timezone)
        occurrence.startdatetime = occurrence.startdatetime.replace("CDT", "EDT");
        occurrence.startdatetime = occurrence.startdatetime.replace("CST", "EST");
        occurrence.enddatetime = occurrence.enddatetime.replace("CDT", "EDT");
        occurrence.enddatetime = occurrence.enddatetime.replace("CST", "EST");

    }

};
PlanetDiscoverAPI.eventParser.parseStartDate = function(event) {

    startDate = event.parsedValues.timeVals.startTime[0][0];
    dateComponents = startDate.split("/");
    if (
        dateComponents[0].indexOf("10") === -1 && dateComponents[0].indexOf("20") === -1 && dateComponents[0].indexOf("30") === -1) {

        dateComponents[0] = dateComponents[0].replace("0", "");
    }
    if (
        dateComponents[1].indexOf("10") === -1 && dateComponents[1].indexOf("20") === -1 && dateComponents[1].indexOf("30") === -1) {


        dateComponents[1] = dateComponents[1].replace("0", "");
    }
    dateComponents[2] = dateComponents[2].slice(2);

    parsedStartDate = dateComponents[0] + "/" + dateComponents[1] + "/" + dateComponents[2];

    parsedStartDate = PlanetDiscoverAPI.eventParser.formatDate(parsedStartDate);

    return parsedStartDate;

};

PlanetDiscoverAPI.eventParser.formatDate = function(strDate) {

    dateVals = strDate.split("/");
    month = dateVals[0];
    day = dateVals[1];
    if (dateVals[2].length < 3) {
        year = "20" + dateVals[2];
    } else {
        year = dateVals[2];
    }

    month = +month;
    newDate = new Date(year, month - 1, day);
    strWeekday = PlanetDiscoverAPI.config.weekdays[newDate.getDay()];
    strMonth = PlanetDiscoverAPI.config.months[month];
    strDay = day; // padding already stripped
    strYear = year;

    strFormattedDate = strWeekday + ", " + strMonth + " " + strDay + ", " + strYear;

    return strFormattedDate;
};

PlanetDiscoverAPI.formatDateTime = function(strDateTime) {

    formattedDateTime = strDateTime;
    timeVals = formattedDateTime.split(" ");

    if (typeof timeVals === 'undefined') {
        timeVals = {};
        timeVals.startTime = [];
    }

    dateVals = timeVals[0].split("/");
    dateString = dateVals[2] + "-" + dateVals[0] + "-" + dateVals[1];

    standardStartTimeString = dateString + "T" + timeVals[1] + PlanetDiscoverAPI.timeZones[timeVals[2]] // getting rid of timezone
    ;

    theDate = new Date(standardStartTimeString);

    unformattedTime = PlanetDiscoverAPI.getStandardTimeString(
        theDate
    );

    formattedTime = PlanetDiscoverAPI.eventParser.formatTimeNoPaddingNoSeconds(unformattedTime);

    formattedDate = PlanetDiscoverAPI.eventParser.formatDate(timeVals[0]);

    formattedDateTime = formattedDate + " " + formattedTime;

    return formattedDateTime;

};

PlanetDiscoverAPI.eventParser.parseStartTime = function(event) {

    //console.log("first occurrence: " + event.occurrences[1].startdatetime);
    if (typeof event.occurrences[0].startdatetime === 'undefined') {
        return '00:00:01 - NA';
    }
    timeVals = event.occurrences[0].startdatetime.split(" ");

    if (typeof event.parsedValues.timeVals === 'undefined') {
        event.parsedValues.timeVals = {};
        event.parsedValues.timeVals.startTime = [];
    }
    event.parsedValues.timeVals.startTime.push(timeVals);


    dateVals = timeVals[0].split("/");
    dateString = dateVals[2] + "-" + dateVals[0] + "-" + dateVals[1];

    event.parsedValues.standardStartTimeString =
        standardStartTimeString = dateString + "T" + timeVals[1] + PlanetDiscoverAPI.timeZones[timeVals[2]] // getting rid of timezone
    ;

    event.parsedValues.standardStartTimeString = standardStartTimeString;
    theDate = new Date(standardStartTimeString);

    startTime = PlanetDiscoverAPI.getStandardTimeString(
        theDate
    );

    startTime = PlanetDiscoverAPI.eventParser.formatTimeNoPaddingNoSeconds(startTime);

    return startTime;
};

PlanetDiscoverAPI.eventParser.formatTimeNoPaddingNoSeconds = function(strTime) {

    timeComponents1 = strTime.split(" ");
    timeComponents2 = timeComponents1[0].split(":");
    // strip zero-padding.  Instead of replacing 01, 02, just check for 10 or 20, 
    // skip if 10 or 20 hour
    if (timeComponents2[0].indexOf("10") === -1 && timeComponents2[0].indexOf("20") === -1) {
        timeComponents2[0] = timeComponents2[0].replace("0", "");
    }

    parsedStrTime = timeComponents2[0] + ":" + timeComponents2[1] + " " + timeComponents1[1];

    return parsedStrTime;
};

PlanetDiscoverAPI.timeZones = {

    EST: "-0500",
    EDT: "-0400",
    CST: "-0600",
    CDT: "-0500",
    MST: "-0700",
    MDT: "-0600",
    PST: "-0800",
    PDT: "-0700"

};

PlanetDiscoverAPI.eventParser.parseFullCategories = function(event) {

    fullCategories = [];
    for (key in event.categories) {
        pCat = event.categories[key];
        fullCat = PlanetDiscoverAPI.indexedEventCategoriesFlat[pCat.id];

        fullCategories[key] = fullCat;
    }
    return fullCategories;
};

PlanetDiscoverAPI.eventParser.parseMainCategory = function(event) {
    verbose = false;
    //if (event.id === 68118) {verbose = true;} else {verbose = false;}

    mainCategory = null;

    untrimmedCategories = event.categories.slice(0);
    trimmedCategories = event.categories.slice(0);
    trimmedCategories.sort(function(a, b) {
        return b.tier - a.tier;
    });

    // start with category set
    for (key in trimmedCategories) {
        // get the next category (sorted by tier (desc))
        category = trimmedCategories[key];
        // remove it from the array
        delete trimmedCategories[key];

        // look to see if any other categories in the array 
        // are in the same tier (have the same tier value)
        hasPlurality = false;
        for (key2 in trimmedCategories) {
            comparisonCategory = trimmedCategories[key2];
            if (comparisonCategory.tier === category.tier) {
                hasPlurality = true;
            }
        }

        // if other categories in array have same tier, remove them
        if (hasPlurality) {
            for (key3 in trimmedCategories) {
                comparisonCategory = trimmedCategories[key3];
                if (comparisonCategory.tier === category.tier) {
                    delete trimmedCategories[key3];
                }
            }
        } else if (!empty(category)) {
            // otherwise, select this category as the main category    
            mainCategory = category;
            break;
        }

    } // end for loop
    if (verbose) {
        console.log("Event: " + event.id + " -- Pass 1: ");
        console.log(mainCategory);
    }


    // if we found a mainCategory, return it
    if (!empty(mainCategory)) {
        return mainCategory;
    }


    // if no mainCategory was detected, start over and
    // remove all categories that are not top-level categories
    trimmedCategories = event.categories.slice(0);
    for (key4 in trimmedCategories) {
        category = trimmedCategories[key4];
        if (category.tier > 1) {
            delete trimmedCategories[key4];
        }
    }

    // if we have a plurality at the top (and we likely do)
    // refer to priority-selection matrix
    if (trimmedCategories.length > 1) {

        mainCategory = PlanetDiscoverAPI.eventCategoryPriorityMatrix(trimmedCategories);

    } else {
        // otherwise the main category is the single category
        // remaining in this array
        mainCategory = trimmedCategories[0];
    }

    if (verbose) {
        console.log("Event: " + event.id + " -- Pass 2: ");
        console.log(mainCategory);
    }

    // if we found a mainCategory, return it
    if (!empty(mainCategory)) {
        return mainCategory;
    }


    // if we STILL don't have a main category 
    // (example: multiple non-top-level categories, no top-level)
    // just select the first category, and return it's top-level parent category

    if (event.categories.length > 0) {
        mainCategory = PlanetDiscoverAPI.getTopLevelCategory(event.categories[0].id);
    }
    if (verbose) {
        console.log("Event: " + event.id + " -- Pass 3: ");
        console.log(mainCategory);
    }

    // if we found a mainCategory, return it
    if (!empty(mainCategory)) {
        return mainCategory;
    }


    // if we _STILL_ don't have a mainCategory (no categories assigned)
    // then return default catch-all category

    // (community is category 1000008, used as default catch-all)
    mainCategory = PlanetDiscoverAPI.indexedEventCategoriesFlat[1000008];

    if (verbose) {
        console.log("Event: " + event.id + " -- Pass 4: ");
        console.log(mainCategory);
    }

    // at this point, return whatever we have for mainCategory
    return mainCategory;


};

PlanetDiscoverAPI.eventCategoryPriorityMatrix = function(categories) {

    categoryPriority = [
        1000026, // Nightlife
        1000031, // Music
        1000001, // Art
        1000019, // Food & Drink
        1000038, // Sports
        1000034, // Recreation & Outdoors
        1000008, // Community

    ];

    categoriesHasCategory = function(id, categories) {
        for (key in categories) {
            category = categories[key];
            if (category.id === id) {
                return true;
            }
        }

        return false;
    };

    for (key2 in categoryPriority) {
        categoryId = categoryPriority[key2];
        if (categoriesHasCategory(categoryId)) {
            return PlanetDiscoverAPI.indexedEventCategoriesFlat[categoryId];
        }
    }



};



PlanetDiscoverAPI.eventParser.parseAdditionalCategoryNames = function(event) {

    additionalCategoryNames = '';

    count = 0;
    for (key in event.categories) {
        if (count === 0) {
            count++;
            continue;
        }

        category = event.categories[key];
        additionalCategoryNames += category.name;

        count++;
        if (count < event.categories.length) {
            additionalCategoryNames += " | ";
        }
    }

    return additionalCategoryNames;
};

PlanetDiscoverAPI.eventParser.parseMainPicture = function(event) {
    // first look at event.image
    if (!empty(event.image)) {
        return event.image;
    }
    // then event.photos[0]
    if (!empty(event.photos[0])) {
        return event.photos[0];
    }

    // then event.listing.image (not implemented, doesn't exist yet)

    // then event.listing.photos[0]
    /*
    if (!empty(event.listing.photos[0])) {
        return event.listing.photos[0];
    }
    */

    // 

    // then config.defaultPictureByTopLevelCategory
    topLevelCategory = PlanetDiscoverAPI.getTopLevelCategory(event.categories[0].id);
    if (typeof category !== 'undefined') {
        if (!empty(PlanetDiscoverAPI.config.defaultEventPicturesByTopLevelCategory[topLevelCategory.id])) {
            return {
                caption: '',
                image: PlanetDiscoverAPI.config.defaultEventPicturesByTopLevelCategory[topLevelCategory.id],
                resolution: 'large'
            };
        }

    }

    // else return null
    return null;
};



PlanetDiscoverAPI.getTopLevelCategory = function(categoryId) {

    category = PlanetDiscoverAPI.indexedEventCategoriesFlat[categoryId];

    if (typeof category !== 'undefined') {

        while (
            category.parent_id !== 100000 && category.parent_id !== 0
        ) {
            category = PlanetDiscoverAPI.indexedEventCategoriesFlat[category.parent_id];
            tierCount++;
            if (typeof category.parent_id === 'undefined') {
                break;
            }
        }

    }

    return category;
};

PlanetDiscoverAPI.appendCategoryTiers = function(flatCategoryArray) {
    appendedCategories = [];

    for (key in flatCategoryArray) {
        appendedCategory = flatCategoryArray[key];
        appendedCategory.tier = PlanetDiscoverAPI.getCategoryTier(appendedCategory.id);
        appendedCategories[key] = appendedCategory;
    }

    return appendedCategories;
};

PlanetDiscoverAPI.getCategoryTier = function(categoryId) {

    category = PlanetDiscoverAPI.indexedEventCategoriesFlat[categoryId];
    tierCount = 1;

    while (category.parent_id !== 100000 && category.parent_id !== 0) {
        category = PlanetDiscoverAPI.indexedEventCategoriesFlat[category.parent_id];
        tierCount++;
    }

    return tierCount;
};

/* HTML Elmeent Builder Functions */

if (typeof PlanetDiscoverAPI.elementBuilders === 'undefined') {
    PlanetDiscoverAPI.elementBuilders = {}
}

PlanetDiscoverAPI.truncateOnlineDescription = function(event) {
    moreElement = PlanetDiscoverAPI.elementBuilders.more();
    abbreviatedPart =
        event.online_description.slice(
            0, PlanetDiscoverAPI.config.more.maxLength
    );
    extendedPart = "<span class='" + PlanetDiscoverAPI.config.more.extendedText_css_class + "'>" + event.online_description.slice(
        PlanetDiscoverAPI.config.more.maxLength) + "</span>";

    return abbreviatedPart + moreElement + extendedPart;
};

PlanetDiscoverAPI.elementBuilders.more = function() {
    element = "<span class='" + PlanetDiscoverAPI.config.more.css_class + "'>" + PlanetDiscoverAPI.config.more.displayText + "</span>";

    return element;
};


/* Global Scope Functions */

window.empty = function(mixed_var) {
    // Checks if the argument variable is empty
    // undefined, null, false, number 0, empty string,
    // string "0", objects without properties and empty arrays
    // are considered empty
    //
    // http://kevin.vanzonneveld.net
    // +   original by: Philippe Baumann
    // +      input by: Onno Marsman
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: LH
    // +   improved by: Onno Marsman
    // +   improved by: Francesco
    // +   improved by: Marc Jansen
    // +      input by: Stoyan Kyosev (http://www.svest.org/)
    // +   improved by: Rafal Kukawski
    // *     example 1: empty(null);
    // *     returns 1: true
    // *     example 2: empty(undefined);
    // *     returns 2: true
    // *     example 3: empty([]);
    // *     returns 3: true
    // *     example 4: empty({});
    // *     returns 4: true
    // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
    // *     returns 5: false
    var undef, key, i, len;
    var emptyValues = [undef, null, false, 0, "", "0"];

    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (mixed_var === emptyValues[i]) {
            return true;
        }
    }

    if (typeof mixed_var === "object") {
        for (key in mixed_var) {
            // TODO: should we check for own properties only?
            //if (mixed_var.hasOwnProperty(key)) {
            return false;
            //}
        }
        return true;
    }

    return false;
};

Timer = function() {

    this._startTime = null,
    this._endTime = null,

    this.markStartTime = function() {
        this._startTime = new Date().getTime();
    };

    this.markEndTime = function() {
        this._endTime = new Date().getTime();
        return this.getTime();
    };

    this.getTime = function() {
        return this._endTime - this._startTime;
    };

    this.markStartTime();

};


// accepts Date object
PlanetDiscoverAPI.getStandardTimeString = function(date) {
    if ((typeof(date) !== 'object') || (date.constructor !== Date)) {
        throw new Error('argument must be a Date object');
    }

    function pad(s) {
        return (('' + s).length < 2 ? '0' : '') + s;
    };

    function fixHour(h) {
        return (h === 0 ? '12' : (h > 12 ? h - 12 : h));
    };
    var h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        timeStr = [pad(fixHour(h)), pad(m), pad(s)].join(':');
    return timeStr + ' ' + (h < 12 ? 'AM' : 'PM');
};


/*
 * Lazy Load Ahead
 *
 */

PlanetDiscoverAPI.objEventLoader = function() {

    // event loader can have multiple connections
    this.connectionPool = [];

    // name of currently-selected connection
    this.currentConnection = 'default';
    // default connection
    this.connectionPool['default'] = new PlanetDiscoverAPI.eventConnection();

    // tell eventLoader which connection to use
    this.connection = function(connectionName) {
        // set current connection
        this.currentConnection = connectionName;
        // if the connection doesn't exist, create it
        if (this.connectionPool.hasOwnProperty(this.currentConnection) === false) {
            this.connectionPool[this.currentConnection] = new PlanetDiscoverAPI.eventConnection();
        }

        return this.connectionPool[this.currentConnection];
    };

    // use default connection or connection defined in options
    this.query = function(options, callback) {
        if (typeof options.connectionName !== undefined) {
            this.connection(options.connectionName);
        }

        if (this.currentConnection === 'default') {
            this.connectionPool[this.currentConnection] = new PlanetDiscoverAPI.eventConnection();
        }
        this.connectionPool[this.currentConnection].query(options, callback);
    };

};


PlanetDiscoverAPI.eventConnection = function() {

    // initialize instance-properties with default values (config abstraction later)
    this.eventQuery = new PlanetDiscoverAPI.objEventQuery();
    this.callback = function() {};
    this.eventQueryResults = {};

    this._resultsPerPage = 10; // results per page
    this._page = 1; // current page number
    this.pages = [];


    this.getPageResults = function(pageNum, callback) {

        // if this page isn't available, fetch it
        if (typeof this.pages[pageNum] === 'undefined') {
            this._page = pageNum;
            this.query({}, callback);
            this.nextPage();
            this.nextPage();
        } else {
            callback(this.pages[pageNum]);
        }

        // otherwise return it


    };
    this.nextPage = function(callback) {
        console.log("SRPConnection NextPage from page number: " + this._page);
        this._page++;
        if (typeof callback === 'undefined') {
            callback = function(responseObject) {};
        }
        this.query({}, callback);
        return this;
    };

    // mutator methods
    this.resultsPerPage = function(resultsPerPage) {
        if (typeof resultsPerPage === 'undefined') {
            return this._resultsPerPage;
        }
        this._resultsPerPage = resultsPerPage;
        return this;
    };
    this.page = function(page) {
        if (typeof page === 'undefined') {
            return this._page;
        }
        this._page = page;
        return this;
    };

    this.reset = function() {
        this = new PlanetDiscoverAPI.eventConnection();
    };

    // execute query
    this.query = function(options, userDefCallback) {

        /* define and execute events query */
        if (typeof options !== 'undefined') {
            if (typeof options.page !== 'undefined') {
                this.page(options.page);
                delete(options.page);
            }
            if (typeof options.resultsPerPage !== 'undefined') {
                this.resultsPerPage(options.resultsPerPage);
                delete(options.resultsPerPage);
            }

            // merge user-defined queryOptions
            if (typeof options !== 'undefined') {
                if (!empty(options)) {
                    this.eventQuery = new PlanetDiscoverAPI.objEventQuery();
                }
                this.eventQuery.merge(options);
            };
        }


        // set limit/start (pagination)
        this.eventQuery.options.start = ((this._page - 1) * this._resultsPerPage) + 1;
        this.eventQuery.options.limit = this._resultsPerPage;
        // optional callback
        if (typeof userDefCallback !== 'undefined') {
            this.callback = userDefCallback;
        };

        // execute query
        this.doQuery();

    }; //end query();

    // method to execute eventsQuery
    this.doQuery = function() {
        // preserve this context (in global spaaaaaace), 
        // for use within scope of callback function
        that_connection = this;

        // run the query
        PlanetDiscoverAPI.eventQuery(
            // current queryOptions for this connection
            this.eventQuery.options,
            // callback function
            function(responseObject) {
                // save the results of the query for this connection
                that_connection.eventQueryResults = responseObject;
                that_connection.pages[that_connection._page] = responseObject;
                // add results to PlanetDiscoverAPI.indexedEvents
                PlanetDiscoverAPI.indexedEvents =
                    $.extend(PlanetDiscoverAPI.indexedEvents, responseObject.indexedEvents);
                // user-defined callback
                that_connection.callback(responseObject);
            } // end callback function
        ); // eventQuery()
    };



};

PlanetDiscoverAPI.eventLoader = new PlanetDiscoverAPI.objEventLoader();

/*
 * View Models
 *
 */

// SPR View
PlanetDiscoverAPI.SRPview = {};
PlanetDiscoverAPI.SRPview.pageNum = 1;
PlanetDiscoverAPI.SRPview.addEvents = function(events) {

    additionalEventsHTML = "";

    additionalEventsHTML = PlanetDiscoverAPI.handlebars
        .compile(
            '#AdditionalEventsSRPTemplate', {
                events: events
            }
    );

    // insert the HTML into the SRP results on page
    $('.events-show-more')
        .before(additionalEventsHTML)
        .slideDown("slow");
    /* After the rendering.. */

    // attach this eventhandler to each "more..." element
    $("." + PlanetDiscoverAPI.config.more.css_class)
        .unbind('click')
        .bind('click', function() {

            // navigate dom to get parent element
            // that contains event_id in it's data attributes
            parent = this.parentNode.parentNode;

            // get event_id from data-attribute
            eventId = $(parent).attr("data-event_id");

            // display event
            PlanetDiscoverAPI.displayEvent(eventId);

        }); // end "more" event handler


    $(".eventtitle")
        .unbind("click")
        .bind("click", function() {

            // navigate dom to get parent element
            // that contains event_id in it's data attributes
            parent = this.parentNode;

            // get event_id from data-attribute
            eventId = $(parent).attr("data-event_id");
            // display event
            PlanetDiscoverAPI.displayEvent(eventId);
        });

    // attach this event handler to "back to all event"
    $(".single-event-back-to-all-events")
        .unbind("click")
        .bind("click", function() {
            PlanetDiscoverAPI.disableOverlay();
        });


};
// display next page of results
PlanetDiscoverAPI.SRPview.nextPage = function() {

    // advance the current pageNum counter for this view
    PlanetDiscoverAPI.SRPview.pageNum++;

    // if the eventLoader connection for SRP isn't 2 pages ahead, load two more pages
    if (PlanetDiscoverAPI
        .eventLoader
        .connectionPool['SRP']
        .pages
        .length <
        PlanetDiscoverAPI
        .SRPview
        .pageNum + 2) {

        PlanetDiscoverAPI
            .eventLoader
            .connection('SRP')
            .nextPage()
            .nextPage();
    }

    // get whatever data is available (cached or not) for this pageNum
    events = PlanetDiscoverAPI
        .eventLoader
        .connection('SRP')
        .getPageResults(
            PlanetDiscoverAPI.SRPview.pageNum,
            function(responseObject) {
                PlanetDiscoverAPI.SRPview.addEvents(responseObject.events);
            });



};


/*
 * Misc. Utility functions
 */
PlanetDiscoverAPI.utils = {};

// utility function to calculate length of sparse arrays
PlanetDiscoverAPI.utils.realLength = function(arr) {
    rlength = 0;
    for (key in arr) {
        if (!isNaN(key)) {
            rlength++;
        }
    }
    return rlength;
};

PlanetDiscoverAPI.utils.keyExists = function(arrKey, arr) {
    for (key in arr) {
        // intentionally left type-conversion eneabled using "==" instead of "==="
        if (key == arrKey) {
            return true;
        }
    }
    return false;

};