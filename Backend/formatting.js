// formatting.js
var currentPoster = null;

function print() {
  var variation = document.getElementById("poster-variation").value;
  var title = document.getElementById("title").value;
  var type = document.getElementById("type").value;
  var description = document.getElementById("description").value;
  var difficulty = document.getElementById("difficulty").value;
  var reward = document.getElementById("reward").value;
  // Extract x and y values
  var coordinates = document.getElementById("poster-location").value;
  var [x, y] = coordinates.split(',').map(value => parseInt(value.trim()));

  // Create formatted string
  var formattedString = `
    {
      title: '${title}',
      type: '${type}',
      description: '${description}',
      difficulty: '${difficulty}',
      reward: '${reward}',
      posterType: '${variation}',
      x: ${x},
      y: ${y}
    },
  `;

  // Get the display board 2 element
  var displayBoard2 = document.querySelector(".display-board2");

  // Clear the old content
  displayBoard2.innerHTML = "";

  // Create a new paragraph element to hold the formatted string
  var paragraph = document.createElement("p");
  paragraph.innerText = formattedString;

  // Append the paragraph to the display board 2
  displayBoard2.appendChild(paragraph);
};

function addQuest(quest) {
  if (currentPoster) {
    currentPoster.remove();
  }

  var poster = document.createElement("div");
  poster.classList.add("poster");
  poster.classList.add(quest.posterType);

  var content = document.createElement("div");

  var title = document.createElement("h2");
  title.innerText = quest.title;
  title.classList.add("quest-title");
  content.appendChild(title);

  var type = document.createElement("p");
  type.innerText = quest.type;
  type.classList.add("quest-type");
  content.appendChild(type);

  var description = document.createElement("p");
  description.innerText = quest.description;
  description.classList.add("quest-description");
  content.appendChild(description);

  var difficulty = document.createElement("p");
  difficulty.innerText = `Difficulty: ${quest.difficulty}`;
  difficulty.classList.add("quest-difficulty");
  content.appendChild(difficulty);

  var reward = document.createElement("p");
  reward.innerText = `Reward: ${quest.reward}`;
  reward.classList.add("quest-reward");
  content.appendChild(reward);

  poster.appendChild(content);

  var board = document.querySelector(".display-board");

  // Wait for the next frame to allow the poster to be rendered with correct dimensions
  requestAnimationFrame(function() {
    var boardRect = board.getBoundingClientRect();
    
    // Calculate the center position of the display board
    var x = (boardRect.width - poster.offsetWidth) / 2 - 10;
    var y = (boardRect.height - poster.offsetHeight) / 2 + 55;
    
    poster.style.left = `${x}px`;
    poster.style.top = `${y}px`;

    // Add the poster to the board
    board.appendChild(poster);
});


  currentPoster = poster;

  poster.addEventListener('click', function(event) {
    event.stopPropagation();

    var overlay = document.querySelector('.overlay');

    if (poster.style.transform) {
      poster.style.transform = '';
      poster.style.zIndex = '';
      overlay.style.display = 'none';
    } else {
      poster.style.transform = 'scale(1.5)';
      poster.style.zIndex = '100';
      overlay.style.display = 'block';
    }
});


  var overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', function() {
    var zoomedPoster = document.querySelector('.poster[style*="scale(1.5)"]');
    if (zoomedPoster) {
      zoomedPoster.style.transform = '';
      zoomedPoster.style.zIndex = '';
      zoomedPoster.style.top = zoomedPoster.dataset.top;
      zoomedPoster.style.left = zoomedPoster.dataset.left;
    }

    overlay.style.display = 'none';
  });
}

function showPoster() {
  var variation = document.getElementById("poster-variation").value;
  var title = document.getElementById("title").value;
  var type = document.getElementById("type").value;
  var description = document.getElementById("description").value;
  var difficulty = document.getElementById("difficulty").value;
  var reward = document.getElementById("reward").value;

  var quest = {
    posterType: variation,
    title: title,
    type: type,
    description: description,
    difficulty: difficulty,
    reward: reward
    };
    print();
    addQuest(quest);
    }
    
    function resetPoster() {
      var questBoard = document.querySelector(".display-board");
      var questBoard2 = document.querySelector(".display-board2");
      questBoard.innerHTML = "";
      questBoard2.innerHTML = "";
      currentPoster = null;
    
      // Reset input fields and poster variation selector
      document.getElementById("poster-variation").value = "poster1";
      document.getElementById("poster-location").value = "78,78";
      document.getElementById("title").value = "";
      document.getElementById("type").value = "";
      document.getElementById("description").value = "";
      document.getElementById("difficulty").value = "";
      document.getElementById("reward").value = "";
    }

    
    function copyToClipboard() {
  // Get the element with the text you want to copy
  var textToCopy = document.querySelector(".display-board2 p");

  // Create a new textarea element and give it the value of the text you want to copy
  var textarea = document.createElement("textarea");
  textarea.value = textToCopy.innerText;

  // Add the textarea to the DOM
  document.body.appendChild(textarea);

  // Select the text
  textarea.select();

  // Execute the "copy" command
  document.execCommand("copy");

  // Remove the textarea from the DOM
  document.body.removeChild(textarea);
}
