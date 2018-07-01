$(document).ready(function () {

  var aquaTeenButtons = $('#athf-buttons');
  var aquaTeenChars = [ "MasterShake", "Frylock", "Meatwad", "Carl Brutananadilewski", "Ezekial",
  "Bible Fruit", "Ignignokt", "Err", "Emory", "Oglethorpe", "Dr. Weird", "Steve", "Walter Melon",
  "Frat Aliens", "Boost Mobile", "Drewbacca"
  ];

  // event listener on click to add classes and data attributes to buttons
  $(document).on("click",".gif-response", function () {
    animateGif = $(this).attr("data-animated");
    pausedGif = $(this).attr("src");

    console.log(animateGif);
    console.log(pausedGif);
    $(this).attr("src", animateGif);
    $(this).attr("data-animated", pausedGif);
  });

  // function searches for gif and submits AJAX request
  function searchATHF() {

    var searchForChar = $(this).attr('data-team-name');
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + searchForChar + "&api_key=apUXWdARP7RVFyug8N29crwKCh3LfCNo&limit=10";

    var giphyPromise = $.ajax({
         url: queryUrl,
         method: "GET"
    })

    giphyPromise.done(function (response) {

      // for loop that creates the new array of 10 buttons from ajax request and adds a fixed width from giphy api classes 
      for (var i = 0; i < response.data.length; i++) {

        gifContainer = $("<div>");

        var gifStop = response.data[i].images.fixed_width_still.url;
        var gifRating = response.data[i].rating;

        gifStarted = response.data[i].images.fixed_width.url;
        rating = "<p class='gif-rating'>" + 'Rated: ' + gifRating.toUpperCase() + "</p>";

        var gifTitle = response.data[i].title;
        var gifResponse = $("<img class='gif-response' data-animated='" + gifStarted + "'>").attr("src", gifStop);

        $('#results').append(gifContainer);
        gifContainer.append(gifResponse);
        gifContainer.append(rating);
        $('#results').prepend(gifContainer);
      }
    });
  }

  // function to show character gifs and append to results div
  function showChar() {

    $("#athf-buttons").empty();
    for (var a = 0; a < aquaTeenChars.length; a++) {
      var aquaButton = $(this).text();
      var mooninite = $('<button>');

      mooninite.addClass("aqua-teen-button");
      mooninite.addClass("btn btn-outline-secondary")
      mooninite.text(aquaTeenChars[a]);
      mooninite.attr("data-team-name", aquaTeenChars[a]);
      aquaTeenButtons.append(mooninite);
    }
  }

  showChar();

  // global event listener, prevents default submission
  $(document).on("click", ".aqua-teen-button", searchATHF);

  $("#add-character").on("click", function (event) {
    event.preventDefault();

    var athf = $("#character-input").val().trim();
    aquaTeenChars.push(athf);
    showChar();
  });
});
