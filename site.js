document.addEventListener('DOMContentLoaded', () => {
    const distanceInput = document.getElementById('distance');
    const time = document.getElementById('time');
    const submit = document.getElementById('splits');
    const hopefulPace = document.getElementById('pace');
    let timeSplits;
    
    // Calculate the pace per mile
    function calculatePace(distance, time) {
        const pace = time / distance;
        return pace;
    }
    // Convert time from a decimal into minutes and seconds
    function convertTime(time) {
        let converted = time * 60;
        let seconds = parseInt(converted % 60);
        if (seconds == 0) {
            seconds = "00";
        }
        if (seconds <= 9 && seconds >= 1) {
            seconds = "0" + seconds;
        }
        let minutes = parseInt(converted / 60);
        let minutesSeconds = minutes + ":" + seconds;
        return minutesSeconds;
    }
    // Create the splits
    function splits(distance, time) {
        let split;
        const pace = calculatePace(distance, time);
        for(i=1;i<=distanceInput.value;i+=1) {
            if (i == 1) {
                const convertedPace = convertTime(pace);
                split = i + " mile at " + convertedPace + "<br>";
            } else {
                let multiPace = pace * i;
                const convertedPace = convertTime(multiPace);
                split += i + " mile(s) at " + convertedPace + "<br>";
            }
        }
        let fractional = distanceInput.value - Math.floor(distanceInput.value);
        if (fractional > 0) {
            const convertedPace = convertTime(distanceInput.value);
            split += distanceInput.value + " mile(s) at " + convertedPace + "<br>";
        }
        return split;
    }

    //Show the goal time.
    function goalTimeCalc(distance, hopefulPace) {
        const goalTime = distance * hopefulPace;
        console.log(hopefulPace);
        const totalTime = "Your total time for " + distance + " miles is " + goalTime;
        return totalTime;
    }

    const focusHandler = event => {
    event.target.className = 'highlight';
    };
    const blurHandler = event => {
    event.target.className = '';
    };
    distanceInput.addEventListener('focus', focusHandler);

    distanceInput.addEventListener('blur', blurHandler);

    time.addEventListener('focus', focusHandler);

    time.addEventListener('blur', blurHandler);

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the print button
    var printBtn = document.getElementById("printBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    var xButton = document.getElementById('pacing');

    // When the user clicks on the button, open the modal
    btn.addEventListener('click', () => {
        modal.style.display = "block";
        console.log(hopefulPace.value);
        if(time.value) {
            timeSplits = splits(distanceInput.value, time.value);
            document.getElementById("pacing").innerHTML = timeSplits;
        }
        if (hopefulPace.value) {
            totalTime = goalTimeCalc(distanceInput.value, hopefulPace.value);
            document.getElementById("pacing").innerHTML = totalTime;
        }
    });

    // When the user clicks on the print button, print the splits
    printBtn.addEventListener('click', () => {
        print(timeSplits);
    });

    // When the user clicks on <span> (x), close the modal
    xButton.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});