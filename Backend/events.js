document.addEventListener("DOMContentLoaded", function() {
    const monthsInYear = ["January", "February", "March", "April", "May", "September", "October", "November", "December"];

    function isValidMonth(month) {
        return monthsInYear.includes(month);
    }

    function customDateToDayCount(dateStr) {
        const [_, month, day, year] = dateStr.match(/(\w+) (\d+)[a-z]*, (\d+)/);
        if (!isValidMonth(month)) {
            return null; // This will indicate an invalid date.
        }
        const monthIndex = monthsInYear.indexOf(month);
        return (parseInt(year) * 270) + (monthIndex * 30) + (parseInt(day) - 1);
    }

    function getStatus(currentDayCount, startDayCount, endDayCount) {
        if (startDayCount === null || endDayCount === null) return "Invalid Date";
        if (currentDayCount < startDayCount) return "Upcoming";
        else if (currentDayCount >= startDayCount && currentDayCount <= endDayCount) return "In Progress";
        else return "Ended";
    }

    let displayedCurrentDateStr = document.querySelector(".current-date").textContent.replace("Current Date: ", "");
    let currentDayCount = customDateToDayCount(displayedCurrentDateStr);

    let events = Array.from(document.querySelectorAll(".event"));
    events.forEach(event => {
        let startDateStr = event.querySelector(".start-date").textContent;
        let endDateStr = event.querySelector(".end-date").textContent;

        let startDayCount = customDateToDayCount(startDateStr);
        let endDayCount = customDateToDayCount(endDateStr);

        let status = getStatus(currentDayCount, startDayCount, endDayCount);

        if (status === "Invalid Date") {
            event.remove(); // This event has an invalid date and will be removed from the DOM.
        } else {
            let statusSpan = event.querySelector(".status");
            statusSpan.textContent = status;
            statusSpan.className = "status " + status.toLowerCase().replace(" ", "-");

            event.classList.add(status.toLowerCase().replace(" ", "-"));
            event.dataset.status = status;
        }
    });

    // Sort and display the remaining events
    events = events.filter(event => event.dataset.status !== "Invalid Date"); // Remove events with invalid dates from the array

    events.sort((a, b) => {
        const order = ["In Progress", "Upcoming", "Ended"];
        return order.indexOf(a.dataset.status) - order.indexOf(b.dataset.status);
    });

    let eventsList = document.querySelector(".events-list");
    eventsList.innerHTML = ''; // Clear the list before re-adding events
    events.forEach(event => eventsList.appendChild(event));
});
