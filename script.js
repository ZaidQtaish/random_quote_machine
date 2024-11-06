$(document).ready(function () {
  const textElement = $("#text");
  const authorElement = $("#author");
  const newQuoteButton = $("#new-quote");
  const allButtons = $(".btn");
  const bodyElement = $("body");
  const tweet = $("#tweet-quote");

  const colors = [
    "#293241",
    "#2E3A4D",
    "#30475E",
    "#FF6B6B",
    "#EE4540",
    "#F46036",
    "#D7263D",
    "#9E2A2B",
    "#2B2D42",
    "#3E5C76",
    "#01A4A4",
    "#009B77",
    "#F4A261",
    "#E76F51",
    "#AB83A1",
    "#6D4C41",
    "#D9BF77",
    "#6A0572",
    "#2E294E",
    "#412234",
    "#8D5B4C",
    "#A7B094",
    "#BFD7B5",
    "#D3B8AE",
    "#8A817C"
  ];

  let currentColorIndex = 0;

  function changeColor() {
    const currentColor = colors[currentColorIndex];

    currentColorIndex = Math.floor(Math.random() * colors.length);

    allButtons.css("background-color", currentColor);
    bodyElement.css("background-color", currentColor);
    textElement.css("color", currentColor);
    authorElement.css("color", currentColor);
  }
  function getRandomQuote() {
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/", // Proxy the request through CORS Anywhere
      method: "GET",
      data: {
        method: "getQuote",
        format: "json",
        lang: "en"
      }
    }).done(function (response) {
      const quote = response.quoteText;
      const author = response.quoteAuthor || "Unknown Author";
      textElement.html(
        `<i class="fa fa-quote-left fa"></i> ${quote} <i class="fa fa-quote-right fa"></i>`
      );
      authorElement.text(`- ${author || "Unknown Author"}`);
      changeColor();

      const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
      const tweetLink = `https://twitter.com/intent/tweet?text=${tweetText}`;
      tweet.attr("href", tweetLink);
    });
  }

  newQuoteButton.click(function () {
    getRandomQuote();
  });

  getRandomQuote();
  changeColor();
});
