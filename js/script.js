const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    refreshButton = document.querySelector(".refresh-word"),
    checkWordButton = document.querySelector(".check-word"),
    timeText = document.querySelector(".time span b"),
    inputField = document.querySelector("input");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}
const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length.toString());
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert('Please, type any word to guess');
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not correct`);
    alert(`Congrats! ${userWord.toUpperCase()} is a correct word!`);
    initGame();
}

refreshButton.addEventListener('click', initGame);
checkWordButton.addEventListener('click', checkWord);