// Shows the tooltip when a hotspot is pressed
function showTooltip(id, event) {
    var tooltip = document.getElementById("tooltip" + id);
    tooltip.style.display = "block";
    tooltip.style.left = event.clientX + 'px';  // Position horizontally next to the hotspot
    tooltip.style.top = event.clientY + 'px';   // Position vertically next to the hotspot
    // Set a timeout to automatically close the tooltip after 5 seconds
    setTimeout(function () {
        closeTooltip(id); // This calls the closeTooltip function after 5 seconds
    }, 3000); // 5000 milliseconds = 5 seconds
}

// Closes a tooltip
function closeTooltip(id) {
    var tooltip = document.getElementById("tooltip" + id);
    tooltip.style.display = "none";
}

// Closes all tooltips
function closeAllTooltips() {
    var tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(function (tooltip) {
        tooltip.style.display = 'none';
    });
}

// If the document is clicked all of the tooltips are closed
document.addEventListener('click', function (event) {
    var isClickInsideTooltip = event.target.closest('.tooltip');
    var isClickInsideHotspot = event.target.closest('.hotspot');

    if (!isClickInsideTooltip && !isClickInsideHotspot) {
        closeAllTooltips();
    }
});

// Toggles coordinates when mouse moves
var isTrackingEnabled = false;
function toggleCursorCoordinates() {
    isTrackingEnabled = !isTrackingEnabled;
    var cursorPos = document.getElementById('cursorPosition');
    if (!isTrackingEnabled) {
        cursorPos.style.display = 'none';
    } else {
        cursorPos.style.display = 'block';
    }
}

// Toggle cursor on click event for toggle button
document.getElementById('toggleButton').addEventListener('click', function () {
    toggleCursorCoordinates();
});

// Toggle cursor on keydown I event
document.addEventListener('keydown', function (event) {
    toggleCursorCoordinates();
});

// If mouse moves show coordinates
// To be used for getting position of elements
document.getElementById('container').addEventListener('mousemove', function (e) {
    if (!isTrackingEnabled) return;

    var cursorPos = document.getElementById('cursorPosition');
    var containerRect = this.getBoundingClientRect();

    // Calculate position relative to the container
    var xPercent = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    var yPercent = ((e.clientY - containerRect.top) / containerRect.height) * 100;

    // Update the content of the position element
    cursorPos.textContent = 'Top: ' + yPercent.toFixed(2) + '%, Left: ' + xPercent.toFixed(2) + '%';

    // Position the element near the cursor
    cursorPos.style.left = (e.clientX + 10) + 'px';
    cursorPos.style.top = (e.clientY + 10) + 'px';
});

