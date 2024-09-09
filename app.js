document.getElementById("search-btn").addEventListener("click", function () {
  const word = document.getElementById("word-input").value;
  const dictionaryContainer = document.querySelector(".container");
  const loader = document.querySelector(".loader");

  if (!word) {
    alert("Please enter a word");
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      dictionaryContainer.classList.add("disappear");
      loader.classList.remove("disappear");
      setTimeout(() => {
        dictionaryContainer.classList.remove("disappear");
        loader.classList.add("disappear");
        displayResult(data);
      }, 1500);
    })
    .catch((error) => {
      document.getElementById("result").innerHTML =
        "<p>Word not found. Please try again.</p>";
      console.error("Error fetching data:", error);
    });
});

function displayResult(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  const wordData = data[0];
  const word = `<h2>${wordData.word}</h2>`;
  const phonetics = wordData.phonetics[0]
    ? `<p><strong>Pronunciation:</strong> ${wordData.phonetics[0].text}</p>`
    : "";
  const meanings = wordData.meanings
    .map((meaning) => {
      const definitions = meaning.definitions
        .map((def) => `<li>${def.definition}</li>`)
        .join("");
      return `<p><strong>${meaning.partOfSpeech}</strong></p><ul>${definitions}</ul>`;
    })
    .join("");

  resultDiv.innerHTML = word + phonetics + meanings;
}
