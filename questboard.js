// questboard.js
document.addEventListener('DOMContentLoaded', (event) => {
  quests.forEach(addQuest);
});

function addQuest(quest) {
  var poster = document.createElement("div");
  poster.classList.add("poster");
  poster.classList.add(quest.posterType);

  var content = document.createElement("div");  // create a new div to hold the content

  var title = document.createElement("h2");
  title.innerText = quest.title;
  content.appendChild(title);

  var description = document.createElement("p");
  description.innerText = quest.description;
  content.appendChild(description);

  var difficulty = document.createElement("p");
  difficulty.innerText = `Difficulty: ${quest.difficulty}`;
  content.appendChild(difficulty);

  var reward = document.createElement("p");
  reward.innerText = `Reward: ${quest.reward}`;
  content.appendChild(reward);

  poster.appendChild(content);  // append the content div to the poster

  // Set a random position for the poster
  var board = document.querySelector(".quest-board");
  var boardRect = board.getBoundingClientRect();

  // Wait for the next frame to allow the poster to be rendered with correct dimensions
  requestAnimationFrame(function() {
    var boardRect = board.getBoundingClientRect();
    var x = 60 + Math.random() * (boardRect.width - poster.offsetWidth - 360);
    var y = 50 + Math.random() * (boardRect.height - poster.offsetHeight -360);
    poster.style.left = `${x}px`;
    poster.style.top = `${y}px`;

    // Add the poster to the board
    board.appendChild(poster);
  });

    //########### Zoom the poster when clicked ###########
    // Add an event listener to handle the click event
    poster.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent this click from bubbling up to the overlay
  
        // Get the overlay
        var overlay = document.querySelector('.overlay');
  
        // Check if the poster is already zoomed
        if (poster.style.transform) {
          // If it is, unzoom it, reset z-index, move it back to its original position, and hide the overlay
          poster.style.transform = '';
          poster.style.zIndex = '';
          poster.style.top = poster.dataset.top;
          poster.style.left = poster.dataset.left;
          overlay.style.display = 'none';
        } else {
          // If it's not, zoom it, set a high z-index, move it to the center, and show the overlay
          poster.style.transform = 'scale(2.0)';
          poster.style.zIndex = '100';
  
          // Save the original position
          poster.dataset.top = poster.style.top;
          poster.dataset.left = poster.style.left;
  
          // Move the poster to the center
          poster.style.top = '50%';
          poster.style.left = '50%';
          poster.style.transform = 'translate(-50%, -50%) scale(2.5)';
  
          overlay.style.display = 'block';
        }
      });
  
      // Add an event listener to the overlay to handle clicks
      var overlay = document.querySelector('.overlay');
      overlay.addEventListener('click', function() {
        // Find the zoomed poster and unzoom it
        var zoomedPoster = document.querySelector('.poster[style*="scale(2.5)"]');
        if (zoomedPoster) {
          zoomedPoster.style.transform = '';
          zoomedPoster.style.zIndex = '';
          zoomedPoster.style.top = zoomedPoster.dataset.top;
          zoomedPoster.style.left = zoomedPoster.dataset.left;
        }
  
        // Hide the overlay
        overlay.style.display = 'none';
      });
}