document.addEventListener("DOMContentLoaded", function() {
    function parseDate(dateStr) {
        const [_, month, day, year] = dateStr.match(/(\w+) (\d+)[a-z]*, (\d+)/);
        return new Date(`${month} ${day}, ${year}`);
    }

    let displayedCurrentDateStr = document.querySelector(".current-date").textContent.replace("Current Date: ", "");
    let currentDate = parseDate(displayedCurrentDateStr);
    currentDate.setHours(0, 0, 0, 0); // Resetting time to midnight for accurate comparison

    let events = Array.from(document.querySelectorAll(".event"));

    // Assign a status to each event and store it as a data attribute
    events.forEach(event => {
        let startDate = parseDate(event.querySelector(".start-date").textContent);
        let endDate = parseDate(event.querySelector(".end-date").textContent);
        endDate.setHours(23, 59, 59, 999); // Setting time to end of day for accurate comparison

        let status;
        if (currentDate < startDate) {
            status = "Upcoming";
        } else if (currentDate >= startDate && currentDate <= endDate) {
            status = "In Progress";
        } else {
            status = "Ended";
        }

        let statusSpan = event.querySelector(".status");
        statusSpan.textContent = status;
        statusSpan.className = "status " + status.toLowerCase().replace(" ", "-");

        // Add class to .event for additional styling if needed
        event.classList.add(status.toLowerCase().replace(" ", "-"));

        // Store the status in a data attribute for sorting
        event.dataset.status = status;
    });

    // Sort the events based on the status
    events.sort((a, b) => {
        const order = ["In Progress", "Upcoming", "Ended"];
        return order.indexOf(a.dataset.status) - order.indexOf(b.dataset.status);
    });

    // Reinsert sorted events into the DOM
    let eventsList = document.querySelector(".events-list");
    events.forEach(event => eventsList.appendChild(event));
});
