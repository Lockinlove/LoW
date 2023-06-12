window.onload = function() {
    var svgDoc = document.getElementById('map').getSVGDocument();
    var svgElement = svgDoc.documentElement;

    cities.forEach(city => {
        var circle = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', city.x);
        circle.setAttributeNS(null, 'cy', city.y);
        circle.setAttributeNS(null, 'r', 10);  // radius of the dot
        circle.setAttributeNS(null, 'class', 'dot');
        circle.setAttributeNS(null, 'data-name', city.name);
        circle.setAttributeNS(null, 'data-title', city.title);
        circle.setAttributeNS(null, 'data-description', city.description);
        if (city.image) {
            circle.setAttributeNS(null, 'data-image', city.image);
        }
        circle.setAttributeNS(null, 'fill', city.color);  // Set the dot color
        circle.setAttributeNS(null, 'stroke', 'black');  // Set the dot border color
        circle.setAttributeNS(null, 'stroke-width', '2');  // Set the dot border size
        circle.style.filter = 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.7))';  // Add the shadow effect
        svgElement.appendChild(circle);
    });
    
    // Set default content for the info box
    var infoBox = document.getElementById('info-box');
    infoBox.innerHTML = '<h2>Welcome to the interactive map!</h2> <p>Click on a dot to get more information about a place.</p> <a href="index.html" class="button">Home</a>';

    var dots = svgDoc.getElementsByClassName('dot');
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent this event from bubbling up to the SVG element
            var cityInfo = '<h2>' + this.getAttribute('data-title') + '</h2>';
            cityInfo += '<p>' + this.getAttribute('data-description') + '</p>';
            var imageURL = this.getAttribute('data-image');
            if (imageURL) {
                cityInfo += '<img src="' + imageURL + '" alt="Image of ' + this.getAttribute('data-name') + '" style="max-width: 250px;">';
            }
            infoBox.innerHTML = cityInfo;
        });
    }

    // Add a click event listener to the SVG. If the SVG is clicked and the target was not a dot, reset the info box to the default message
    svgElement.addEventListener('click', function() {
        infoBox.innerHTML = '<h2>Welcome to the interactive map!</h2> <p>Click on a dot to get more information about a place.</p> <a href="index.html" class="button">Home</a>';
    });

    // Initialize svg-pan-zoom
    var panZoomInstance = svgPanZoom(svgElement);

    // Add event listeners to zoom controls
    document.getElementById('zoom-in').addEventListener('click', function() {
        panZoomInstance.zoomIn();
    });
    document.getElementById('zoom-out').addEventListener('click', function() {
        panZoomInstance.zoomOut();
    });
    document.getElementById('reset').addEventListener('click', function() {
        panZoomInstance.resetZoom();
        panZoomInstance.resetPan();
    });
};
