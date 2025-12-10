document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const simulateButton = document.getElementById("simulate-upload");
    const resetButton = document.getElementById("reset-progress");

    let progress = 0;
    let intervalId = null; // To hold the ID of the running interval

    // Function to update the bar and text display
    function updateProgressDisplay() {
        progressBar.style.width = progress + "%";
        progressText.textContent = progress + "%";
    }

    // ----------------------------------------------------
    // ENHANCEMENT: Simulate Real-World Progress (File Upload)
    // ----------------------------------------------------
    function startSimulation() {
        if (intervalId) return; // Prevent multiple intervals from starting

        // Reset progress if starting from 100%
        if (progress === 100) {
            progress = 0;
            updateProgressDisplay();
        }

        // Simulate progress increment every 200ms
        intervalId = setInterval(() => {
            // Increase progress by a small, random amount for a more "real" feel
            const increment = Math.min(100 - progress, Math.floor(Math.random() * 5) + 1); 
            progress += increment;
            
            updateProgressDisplay();

            if (progress >= 100) {
                clearInterval(intervalId); // Stop the simulation
                intervalId = null;
                alert("Upload Complete!");
            }
        }, 200);
    }

    // ENHANCEMENT: Reset Functionality 
    function resetProgress() {
        clearInterval(intervalId); // Stop any running simulation
        intervalId = null;
        progress = 0;
        updateProgressDisplay();
    }

    // Attach event listeners to the buttons
    simulateButton.addEventListener("click", startSimulation);
    resetButton.addEventListener("click", resetProgress);

    // Initial display setup
    updateProgressDisplay();
});