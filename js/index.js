function startGame() {

    $(document).ready(function () {
        var currentWord = "";
        var remainingLetters;
        var guessesRemaining = 13;
        var previousGuesses = [];
        var wins = 0;
        var found = false;
        var words = ["hockey", "checking", "Toronto", "GordieHowe", "WayneGretksy", "Stick", "goal", "jersey", "intermission", "highlights", "topched"];

        function start() {
            var random = Math.floor(Math.random() * words.length);
            currentWord = words[random];
            remainingLetters = currentWord.length;
            guessesRemaining = 13;
            //console.log("value: " + currentWord);
            previousGuesses = [];
            $("#wordDiv").empty();
            $("#outcome").empty();
            $("#previousGuesses").empty();
            $("#guessesLeftDiv").text(guessesRemaining);

            for (var i = 0; i < currentWord.length; i++) {
                $("#wordDiv").append(`<div class="letterDashes ${currentWord.charAt(i)}" id="${currentWord.charAt(i)}"> - </div>`);
            }
        }

        start();

        $(document).keyup(function (event) {
            //console.log("guessesRemaining: " + guessesRemaining);
            //console.log("previousGuesses: " + previousGuesses);
            checkInput(event.key);
        })

        function checkInput(pressedKey) {
            found = 0;
            for (var i = 0; i < previousGuesses.length; i++) {
                //console.log("previousGuess: " + previousGuesses[i] + ". PressedKey:" + pressedKey)
                if (pressedKey === previousGuesses[i]) {
                    //console.log("youve already guessed that letter!");
                    return;
                }
            }
            for (var i = 0; i < currentWord.length; i++) {
                var duplicate = 0;
                if (pressedKey === currentWord.charAt(i)) {
                    $("." + pressedKey).each(function (index, item) {
                        $(item).text(pressedKey);
                        //console.log(item);
                    })
                    //console.log('this letter is in the currentWord');
                    remainingLetters--;
                    //console.log("letters left: " + remainingLetters);
                    found++;
                    if(found < 2){
                        updatePreviousGuesses(pressedKey);
                    }
                    if (remainingLetters === 0) {
                        gameOver(remainingLetters);
                    }
                }
            }
            if (found === 0) {
                updatePreviousGuesses(pressedKey);
                guessesRemaining--;
                $("#guessesLeftDiv").text(guessesRemaining);
                if (guessesRemaining < 1) {
                    outOfGuesses();
                }
            }
            //console.log("pressedKey: " + pressedKey);
            found = 0;
        }

        function updatePreviousGuesses(pressedKey) {
            previousGuesses.push(pressedKey);
            $("#previousGuesses").empty();
            for (var i = 0; i < previousGuesses.length; i++) {
                $("#previousGuesses").append(`<div class="letterDashes">${previousGuesses[i]}</div>`);
            }
        }

        function outOfGuesses() {
            $("#outcome").text("You lost, better luck next time!");
            setTimeout(() => {
                start();
            }, 3000);
        }

        function gameOver() {
            //console.log("User has guessed all the letters.  " + remainingLetters)
            wins++;
            $("#wins").text(wins);
            $("#outcome").text("You won!");
            setTimeout(() => {
                start();
            }, 3000);
        }
    })
}