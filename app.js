document.addEventListener("DOMContentLoaded", () => {
  const resultContainer = document.querySelector("#result");
  const searchBox = document.getElementById("search-box");
  const searchBtn = document.getElementById("search-btn");

  const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  searchBtn.addEventListener("click", () => {
    const word = searchBox.value;
    if (word) {
      fetch(`${BASE_URL}${word}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          displayData(resultContainer, data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter a word to search");
      return;
    }
  });
});

const displayData = (resultContainer, data) => {
  resultContainer.innerText = "";

  if (data && data.length > 0) {
    const wordData = data[0];
    const definition = wordData.meanings[0].definitions[0].definition;
    const phonetic = wordData.phonetic
      ? wordData.phonetic
      : "No phonetics found!";
    let htmlContent = `
        <h2>Word : ${wordData.word}</h2>
        <p><strong>Phonetic : </strong>${phonetic}</p>
        <p><strong>Definition : </strong>${definition}</p>
        <ul>
      `;

    wordData.meanings.forEach((meaning) => {
      meaning.definitions.forEach((def) => {
        htmlContent += `<li>${def.definition}</li>`;
      });
    });

    htmlContent += `</ul>`;

    resultContainer.innerHTML = htmlContent;
  } else {
    resultContainer.innerText = "No results found!";
  }
};
