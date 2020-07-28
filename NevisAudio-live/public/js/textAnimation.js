let words = ["SEEN", "HEARD", "NOTICED"];

let changeWord = document.querySelector(".landing__bannerText--changeWord");

// for (let i = 0; i < words.length; i++) {
//     setTimeout(`changeWord.textContent = words[${i}]`, (i * 1000));
// }

for (let i = 0; i < words.length; i++) {
  setTimeout(textChange, i * 1600, words[i]);
}

// changeWord.textContent = words[i]

function textChange(word) {
  changeWord.style.opacity = 0;
  setTimeout(() => {
    changeWord.textContent = word;
    changeWord.setAttribute("data-content", word);
  }, 400);
  setTimeout(() => {
    changeWord.style.opacity = 1;
    console.log("1");
  }, 800);
}
