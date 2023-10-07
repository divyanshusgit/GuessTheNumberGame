let winSound = new Audio('win.mp3');
let lostSound = new Audio('gameOver.mp3');

let a = 0;
let b = 10;
let ran = (a + 1) + Math.floor((b - (a + 1)) * Math.random());

let input = document.getElementById('input');
input.addEventListener('keydown', keyDownFunc);
let allowedStr = '123456789';
let allowedArr = Array.from(allowedStr);
function keyDownFunc(a) {
    if (a.key != 'Backspace') {
        if ((input.value.length >= 1) || !(allowedArr.includes(a.key))) {
            a.preventDefault();
        }
    }
}

let message = document.getElementById('message');

let chanceContent = document.querySelector('.chance-content');

let counter = 0;

let check = document.getElementById('check');
function gameOver() {
    check.innerHTML = `Replay`;
    check.onclick = replayFunc;
    function replayFunc(elem) {
        location.reload();
    }
    input.setAttribute('disabled', 'true');
    input.style.cursor = 'not-allowed';
}
check.onclick = submitFunc;
function submitFunc() {
    if (input.value == '') {
        message.setAttribute('style', 'background-color: grey; text-shadow: 1px 1px darkred;');
        message.innerHTML = `It's blank &#128580`;
        message.style.visibility = 'visible';
    }
    else {
        counter++;
        document.getElementById(`color${6 - counter}`).style.backgroundColor = `rgb(0,183,255)`;
        chanceContent.innerText = `${5 - counter} chances left`;
        if (counter == 5 && parseInt(input.value) != ran) {
            lostSound.play();
            message.setAttribute('style', 'background-color: red; text-shadow: 1px 1px darkred;');
            message.innerHTML = `Game Over &#128551`;
            message.style.visibility = 'visible';
            gameOver();
        }

        else {
            if (parseInt(input.value) == ran) {
                winSound.play();
                message.setAttribute('style', 'background-color: lightgreen; text-shadow: 1px 1px green;');
                message.innerHTML = `You got it! &#129395;`;
                message.style.visibility = 'visible';
                gameOver();
            }
            else {
                message.setAttribute('style', 'background-color: orange; text-shadow: 1px 1px red;');
                if (parseInt(input.value) > ran) {
                    message.innerHTML = `it's smaller &#129300;`
                }
                else {
                    message.innerHTML = `it's greater &#129300;`
                }
                message.style.visibility = 'visible';
            }
        }
    }
}