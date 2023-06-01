// formatting.js

document.addEventListener('DOMContentLoaded', (event) => {
  var templateOff = `
  <h3>Poster Details:</h3>
  <label class="label" for="poster-variation">Poster variation:</label>
  <select id="poster-variation" class="select-poster">
    <option value="poster1">Poster 1</option>
    <option value="poster2">Poster 2</option>
    <option value="poster3">Poster 3</option>
    <option value="poster4">Poster 4</option>
    <option value="poster5">Poster 5</option>
    <option value="poster6">Poster 6</option>
    <option value="poster7">Poster 7</option>
    <option value="poster8">Poster 8</option>
    <option value="poster9">Poster 9</option>
    <option value="poster10">Poster 10</option>
    <option value="poster11">Poster 11</option>
    <option value="poster12">Poster 12</option>
    <option value="poster13">Poster 13</option>
    <option value="poster14">Poster 14</option>
  </select>
<label class="label" for="title">Poster location:</label>
<select id="poster-location" class="select-poster">
  <option value="78,78">A</option>
  <option value="259,60">B</option>
  <option value="485,97">C</option>
  <option value="680,50">D</option>
  <option value="876,112">E</option>
  <option value="1079,87">F</option>
  <option value="77,315">G</option>
  <option value="250,250">H</option>
  <option value="487,390">I</option>
  <option value="665,300">J</option>
  <option value="921,387">K</option>
  <option value="1120,267">L</option>
  <option value="67,510">M</option>
  <option value="198,567">N</option>
  <option value="300,454">O</option>
  <option value="523,489">P</option>
  <option value="730,467">Q</option>
  <option value="1030,447">R</option>
  <option value="1125,537">S</option>
</select>
<label class="label" for="title">Title:</label>
<input type="text" id="title" />
<label class="label" for="type">Type:</label>
<input type="text" id="type" />
<label class="label" for="description">Description:</label>
<input type="text" id="description" />
<label class="label" for="difficulty">Difficulty:</label>
<input type="text" id="difficulty" />
<label class="label" for="reward">Reward:</label>
<input type="text" id="reward" />
<br />
<div class="button-container">
<button id="show-button" onclick="showPoster()">Show</button>
<button onclick="resetPoster()">Reset</button>
</div>
<img src="Images/Posters/Posters.png" alt="Posters" class="posters">
<img src="Images/Posters/PosterLocations.png" alt="Posters" class="posters">`;

var templateOn = ` 
<h3>Poster Details:</h3>
        <label class="label" for="poster-variation">Poster variation:</label>
        <select id="poster-variation" class="select-poster">
          <option value="bounty1">Bounty 1</option>
        </select>
      </div>
      <label class="label" for="title">Poster location:</label>
      <select id="poster-location" class="select-poster">
        <option value="78,78">A</option>
        <option value="259,60">B</option>
        <option value="485,97">C</option>
        <option value="680,50">D</option>
        <option value="876,112">E</option>
        <option value="1079,87">F</option>
        <option value="77,315">G</option>
        <option value="250,250">H</option>
        <option value="487,390">I</option>
        <option value="665,300">J</option>
        <option value="921,387">K</option>
        <option value="1120,267">L</option>
        <option value="67,510">M</option>
        <option value="198,567">N</option>
        <option value="300,454">O</option>
        <option value="523,489">P</option>
        <option value="730,467">Q</option>
        <option value="1030,447">R</option>
        <option value="1125,537">S</option>
      </select>
      <label class="label" for="title">Title:</label>
      <input type="text" id="title" />
      <label class="label" for="bounty">Bounty:</label>
      <input type="text" id="bounty" />
      <label class="label" for="image">Image:</label>
      <input type="text" id="image" />
      <label class="label" for="description">Description:</label>
      <input type="text" id="description" />
      <label class="label" for="signature">Signature:</label>
      <input type="text" id="signature" />
      <label class="label" for="seal">Seal:</label>
      <input type="text" id="seal" />
      <br />
      <div class="button-container">
      <button id="show-button" onclick="showPoster()">Show</button>
      <button onclick="resetPoster()">Reset</button>
    </div>
      <img src="Images/Posters/Posters.png" alt="Posters" class="posters">
      <img src="Images/Posters/PosterLocations.png" alt="Posters" class="posters">`;

document.getElementById("toggle-switch").addEventListener('change', function(event) {
  if (event.target.checked) {
    // if the checkbox is checked
    document.getElementById("input-section").innerHTML = templateOn;
  } else {
    // if the checkbox is unchecked
    document.getElementById("input-section").innerHTML = templateOff;
  }
});
});

var currentPoster = null;

function print() {
  var variation = document.getElementById("poster-variation").value;
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  // Extract x and y values
  var coordinates = document.getElementById("poster-location").value;
  var [x, y] = coordinates.split(',').map(value => parseInt(value.trim()));

  var formattedString = "";

  if (document.getElementById("toggle-switch").checked) {
    //Bounty
    var bounty = document.getElementById("bounty").value;
    var image = document.getElementById("image").value;
    var signature = document.getElementById("signature").value;
    var seal = document.getElementById("seal").value;
    formattedString = `
      {
        title: '${title}',
        bounty: '${bounty}',
        spaceing: '------------------------',
        image: '${image}',
        description: '${description}',
        signature: '${signature}',
        seal: '${seal}',
        posterType: 'bounty1',
        x: ${x},
        y: ${y}
      },
    `;
  } else {
    //Quest
    var type = document.getElementById("type").value;
    var difficulty = document.getElementById("difficulty").value;
    var reward = document.getElementById("reward").value;
    formattedString = `
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
  }

  var displayBoard2 = document.querySelector(".display-board2");
  displayBoard2.innerHTML = "";

  var paragraph = document.createElement("p");
  paragraph.innerText = formattedString;
  displayBoard2.appendChild(paragraph);
}

function addQuest(quest) {
  if (currentPoster) {
    currentPoster.remove();
  }

  var poster = document.createElement("div");
  poster.classList.add("poster");
  poster.classList.add(quest.posterType);

  var content = document.createElement("div");

    if (quest.title) {
    var title = document.createElement("h2");
    title.innerText = quest.title;
    title.classList.add("quest-title"); // Add class here
    content.appendChild(title);
    }
  
    if (quest.bounty) {
      var bounty = document.createElement("p");
      bounty.innerText = quest.bounty;
      bounty.classList.add("quest-bounty"); // Add class here
      content.appendChild(bounty);
    }
  
    if (document.getElementById("toggle-switch").checked) {
      var spaceing = document.createElement("p");
      spaceing.innerText = '------------------------';
      spaceing.classList.add("quest-spaceing"); // Add class here
      content.appendChild(spaceing);
    }
  
    if (quest.image) {
      var image = document.createElement("img");
      image.src = quest.image;
      image.classList.add("quest-image");
      content.appendChild(image);
    }

    if (document.getElementById("toggle-switch").checked) {
      var spaceing = document.createElement("p");
      spaceing.innerText = '------------------------';
      spaceing.classList.add("quest-spaceing"); // Add class here
      content.appendChild(spaceing);
    }
  
    if (quest.spaceing) {
      var spaceing = document.createElement("p");
      spaceing.innerText = quest.spaceing;
      spaceing.classList.add("quest-spaceing"); // Add class here
      content.appendChild(spaceing);
    }
  
    if (quest.type) {
      var type = document.createElement("p");
      type.innerText = quest.type;
      type.classList.add("quest-type"); // Add class here
      content.appendChild(type);
    }
  
    if (quest.description) {
    var description = document.createElement("p");
    description.innerText = quest.description;
    description.classList.add("quest-description"); // Add class here
    content.appendChild(description);
    }
  
    if (quest.signature || quest.seal) {
      var signSealContainer = document.createElement("div");
      signSealContainer.classList.add("quest-signseal-container"); // Add class here
    
      if (quest.signature) {
        var signature = document.createElement("p");
        signature.innerText = `Posted by:\n${quest.signature}`;
        signature.classList.add("quest-signature");
        signSealContainer.appendChild(signature);
      }
    
      if (quest.seal) {
        var seal = document.createElement("img");
        seal.src = quest.seal;
        seal.classList.add("quest-seal");
        signSealContainer.appendChild(seal);
      }
    
      content.appendChild(signSealContainer);
    }  
  
    if (quest.difficulty) {
    var difficulty = document.createElement("p");
    difficulty.innerText = `Difficulty: ${quest.difficulty}`;
    difficulty.classList.add("quest-difficulty"); // Add class here
    content.appendChild(difficulty);
    }
  
    if (quest.reward) {
    var reward = document.createElement("p");
    reward.innerText = `Reward: ${quest.reward}`;
    reward.classList.add("quest-reward"); // Add class here
    content.appendChild(reward);
    } 
  
    poster.appendChild(content);

  var board = document.querySelector(".display-board");

  // Wait for the next frame to allow the poster to be rendered with correct dimensions
  requestAnimationFrame(function() {
    var boardRect = board.getBoundingClientRect();
    var posterRect = poster.getBoundingClientRect();
    
    // Calculate the center position of the display board
    var boardCenterX = boardRect.width / 2;
    var boardCenterY = boardRect.height / 2;
  
    // Calculate the center position of the poster
    var posterCenterX = posterRect.width / 2 - 20;
    var posterCenterY = posterRect.height / 2 - 50;
  
    // Calculate the desired position for the poster
    var x = boardCenterX - posterCenterX;
    var y = boardCenterY - posterCenterY;
  
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
  var description = document.getElementById("description").value;
  
  var quest = {};

  if (document.getElementById("toggle-switch").checked) {
    // Bounty
    var bounty = document.getElementById("bounty").value;
    var image = document.getElementById("image").value;
    var signature = document.getElementById("signature").value;
    var seal = document.getElementById("seal").value;

    quest = {
      title: title,
      bounty: bounty,
      image: image,
      description: description,
      signature: signature,
      seal: seal,
      posterType: variation
    };
  } else {
    // Quest
    var type = document.getElementById("type").value;
    var difficulty = document.getElementById("difficulty").value;
    var reward = document.getElementById("reward").value;

    quest = {
      title: title,
      type: type,
      description: description,
      difficulty: difficulty,
      reward: reward,
      posterType: variation
    };
  }

  print();
  addQuest(quest);
}

function resetPoster() {
  var questBoard = document.querySelector(".display-board");
  var questBoard2 = document.querySelector(".display-board2");
  questBoard.innerHTML = "";
  questBoard2.innerHTML = "";
  currentPoster = null;

  if (document.getElementById("toggle-switch").checked) {
    // Bounty
    document.getElementById("poster-variation").value = "bounty1";
    document.getElementById("poster-location").value = "78,78";
    document.getElementById("title").value = "";
    document.getElementById("bounty").value = "";
    document.getElementById("image").value = "";
    document.getElementById("description").value = "";
    document.getElementById("signature").value = "";
    document.getElementById("seal").value = "";
  } else {
    // Quest
    document.getElementById("poster-variation").value = "poster1";
    document.getElementById("poster-location").value = "78,78";
    document.getElementById("title").value = "";
    document.getElementById("type").value = "";
    document.getElementById("description").value = "";
    document.getElementById("difficulty").value = "";
    document.getElementById("reward").value = "";
  }
}