// Global Variable. This is mostly a bad idea
const events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

// builds the drop down with a list of unique cities
function buildDropdown() {

    // first step is get a handle on the drop down
    let eventDD = document.getElementById("eventDropdownList");
    // resets the list
    eventDD.innerHTML = "";

    // <li><a class="dropdown-item" href="#">Action</a></li>
    // get the template
    let ddTemplate = document.getElementById("dropdown-template");
    // get the template node
    let ddItem = document.importNode(ddTemplate.content, true);

    // add the all to the dropdown
    let ddLink = ddItem.querySelector("a");
    ddLink.setAttribute("data-city", "All");
    ddLink.textContent = "All";
    eventDD.appendChild(ddItem);

    // add links for the unique cities
    let curEvents = getEvents();
    // get our data

    // get a distinct list of city names
    let distinctCities = [...new Set(curEvents.map((event) => event.city))];

    // filter our data to unique set of cities
    for (let index = 0; index < distinctCities.length; index++) {
        let ddItem = document.importNode(ddTemplate.content, true);

        // add all the items to the dropdown
        let ddLink = ddItem.querySelector("a");
        ddLink.setAttribute("data-city", distinctCities[index]);
        ddLink.textContent = distinctCities[index];
        eventDD.appendChild(ddItem);

    }

    // set the header
    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = 'Stats for ALL events!';

    displayStats(curEvents);

    displayEventData(curEvents);

}

// this called everytime a city name is clicked in the dropdown
function getEventData(element) {
    let city = element.getAttribute("data-city");

    // create the stats for the clicked city
    let curEvents = getEvents();

    let filteredEvents = curEvents;
    if (city != 'All') {
        // return an array with only the events for the selected city
        filteredEvents = curEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }

    // set the header
    let statsHeader = document.getElementById("statsHeader");
    statsHeader.innerHTML = `Stats for ${city} events`;

    displayStats(filteredEvents);
}

function getEvents() {
    let curEvents = JSON.parse(localStorage.getItem("eventData"));

    if (curEvents === null) {
        curEvents = events;
        localStorage.setItem("eventData", JSON.stringify(curEvents));
    }

    return curEvents;
}

// this function displays stas for the selected city
function displayStats(filteredEvents) {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let index = 0; index < filteredEvents.length; index++) {
        currentAttendance = filteredEvents[index].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }

    }

    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );

}

// this functino displays all of the event data in a grid on the bottom of the page
function displayEventData(curEvents) {
    let template = document.getElementById("eventData-template");
    let eventBody = document.getElementById("eventBody");
    eventBody.innerHTML = "";

    for (let index = 0; index < curEvents.length; index++) {
        let eventRow = document.importNode(template.content, true);

        let eventCols = eventRow.querySelectorAll("td");
        eventCols[0].textContent = curEvents[index].event;
        eventCols[1].textContent = curEvents[index].city;
        eventCols[2].textContent = curEvents[index].state;
        eventCols[3].textContent = curEvents[index].attendance;
        eventCols[4].textContent = new Date(curEvents[index].date).toLocaleDateString();
        eventBody.appendChild(eventRow);
    }
}

function saveEventData() {
    // get all fo the course data from localstorage
    let curEvents = getEvents();

    let eventObj = {
        event: "name",
        city: "city",
        state: "state",
        attendance: 0,
        date: "01/01/2000"
    }

    // get the values from the form
    eventObj.event = document.getElementById("newEventName").value;
    eventObj.event = document.getElementById("newEventCity").value;

    let stateSel = document.getElementById("newEventState");
    eventObj.state = stateSel.options[stateSel.selectedIndex].text;

    let attendanceNumber = parseInt(document.getElementById("newEventAttendance").value, 10);
    eventObj.attendance = attendanceNumber;

    let eventDate = document.getElementById("newEventDate").value;
    let eventDateFormatted = `${eventDate} 00:00`;
    eventObj.date = new Date(eventDateFormatted).toLocaleDateString();

    curEvents.push(eventObj);
    localStorage.setItem("eventData", JSON.stringify(curEvents));

    buildDropdown();

}