document.addEventListener("DOMContentLoaded", function () {
  const symbols = ["🍣", "🍺", "🥂", "🌯", "🍔", "🍿"];
  const totalCards = 12;
  let flippedCards = [];

  const gameContainer = document.getElementById("game-container");
  const cardSymbols = [...symbols, ...symbols];
  cardSymbols.sort(() => Math.random() - 0.2);

  for (let i = 0; i < totalCards; i++) {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", () => flipCard(card, i));

    const emoji = document.createElement("div");
    emoji.className = "emoji";
    card.appendChild(emoji);

    gameContainer.appendChild(card);
  }

  function flipCard(card, index) {
    if (!card.classList.contains("flipped") && flippedCards.length < 2) {
      card.classList.add("flipped");
      flippedCards.push({ card, index });

      const emoji = card.querySelector(".emoji");
      emoji.textContent = cardSymbols[index];

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = cardSymbols[card1.index];
    const symbol2 = cardSymbols[card2.index];

    if (symbol1 === symbol2) {
      card1.card.classList.add("matched");
      card2.card.classList.add("matched");

      checkGameCompletion();
    } else {
      setTimeout(() => {
        card1.card.classList.remove("flipped");
        card2.card.classList.remove("flipped");

        const emoji1 = card1.card.querySelector(".emoji");
        const emoji2 = card2.card.querySelector(".emoji");
        emoji1.textContent = "";
        emoji2.textContent = "";
      }, 500);
    }

    flippedCards = [];
  }

  function checkGameCompletion() {
    const matchedCards = document.querySelectorAll(".card.matched");
    if (matchedCards.length === totalCards) {
      alert("Žaidimas baigtas! Jūs laimėjote!");
    }
  }
});
