document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
    var isPlaying = true;

    toggleButton.addEventListener("click", function () {
        if (isPlaying) {
            // Pause logic
            pauseFunction();
            toggleButton.textContent = "Continue";
        } else {
            // Play logic
            playFunction();
            toggleButton.textContent = "Pause";
        }

        // Toggle the state
        isPlaying = !isPlaying;
    });

    function playFunction() {
        // Code to play media or perform any other action
        startIncrementing();
    }

    function pauseFunction() {
        // Code to pause media or perform any other action
        stopIncrementing();
    }
});