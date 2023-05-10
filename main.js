// main.js

function sortMiniatures(sortBy) {
  const sortedMiniatures = miniatures.slice().sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      const aTag = a.tags.find(tag => tag.toLowerCase().startsWith(sortBy.toLowerCase()));
      const aValue = aTag ? aTag.split(':')[1].trim().toLowerCase() : '';

      const bTag = b.tags.find(tag => tag.toLowerCase().startsWith(sortBy.toLowerCase()));
      const bValue = bTag ? bTag.split(':')[1].trim().toLowerCase() : '';

      return aValue.localeCompare(bValue);
    }
    });

    displayImages(sortedMiniatures);
  }

  function displayMiniatureStats(miniatures) {
    const totalDifferentMiniatures = miniatures.length;
    const totalQuantity = miniatures.reduce((sum, miniature) => {
      // Extract the numeric value from the quantity string
      const quantityMatch = miniature.quantity.match(/\d+/);
      const quantity = quantityMatch ? parseInt(quantityMatch[0]) : 0;
      return sum + quantity;
    }, 0);

    const statsDiv = document.getElementById('miniature-stats');
    statsDiv.innerHTML = `Different Miniatures: ${totalDifferentMiniatures} | Total Quantity: ${totalQuantity}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('reset');
    const searchButton = document.getElementById('search');
  
    resetButton.addEventListener('click', () => {
      resetSearchQuery();
    });
  
    searchButton.addEventListener('click', () => {
      searchMiniatures();
    });

    const sortButton = document.getElementById('sort-button');
    sortButton.addEventListener('click', () => {
    const sortBy = document.getElementById('sort-after').value;
    sortMiniatures(sortBy);
    });

      // Add an event listener to the input elements
    const inputElements = document.querySelectorAll('input[type="text"], input[type="search"], select');
    inputElements.forEach(input => {
      input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          searchMiniatures();
        }
      });
    });
  
    displayImages(miniatures);
    displayMiniatureStats(miniatures);
    sortMiniatures('name');
  });
  
  function resetSearchQuery() {
    document.getElementById('name').value = '';
    document.getElementById('race').value = '';
    document.getElementById('subrace').value = '';
    document.getElementById('creatureType').value = '';
    document.getElementById('size').value = '';
    document.getElementById('class').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('weapon').value = '';
    document.getElementById('armor').value = '';
    document.getElementById('features').value = '';
    document.getElementById('sort-after').value = 'name';
  
    displayImages(miniatures); // Reset the images displayed
    displayMiniatureStats(miniatures);
    sortMiniatures('name');
  }
  
  function displayImages(miniatures) {
    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear the grid before displaying new images
    
    if (miniatures.length === 0) {
      const noResultsDiv = document.getElementById('none');
      noResultsDiv.style.display = 'block';
      return;
    } else {
      const noResultsDiv = document.getElementById('none');
      noResultsDiv.style.display = 'none';
    }
    
    for (const miniature of miniatures) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
  
      const img = document.createElement('img');
      img.src = miniature.src;
      gridItem.appendChild(img);
  
      const name = document.createElement('h4');
      name.textContent = miniature.name;
      gridItem.appendChild(name);
  
      const quantity = document.createElement('p');
      quantity.textContent = miniature.quantity;
      gridItem.appendChild(quantity);

      const location = document.createElement('p');
      location.textContent = miniature.location;
      location.style.fontSize = 'small';
      gridItem.appendChild(location);
  
      const tagText = document.createElement('p');
      const tags = miniature.tags.map(tag => `${tag}<br/>`).join('');
      tagText.innerHTML = tags;
      tagText.style.fontSize = 'small';
      gridItem.appendChild(tagText);
  
      grid.appendChild(gridItem);
    }
  }

  function searchMiniatures() {
    const nameInput = document.getElementById('name').value.toLowerCase();
    const sizeInput = document.getElementById('size').value.toLowerCase();
    const tagInputs = {
      race: document.getElementById('race').value.toLowerCase(),
      subrace: document.getElementById('subrace').value.toLowerCase(),
      creature: document.getElementById('creatureType').value.toLowerCase(),
      gender: document.getElementById('gender').value.toLowerCase(),
      class: document.getElementById('class').value.toLowerCase(),
      weapon: document.getElementById('weapon').value.toLowerCase(),
      armor: document.getElementById('armor').value.toLowerCase(),
      features: document.getElementById('features').value.toLowerCase()
    };
  
    // Check if all input fields are empty
    if (Object.values(tagInputs).every(val => val === '') && nameInput === '' && sizeInput === '') {
      return;
    }
  
    const filteredMiniatures = miniatures.filter(miniature => {
      const nameMatch = nameInput === '' || miniature.name.toLowerCase().includes(nameInput);
      const sizeMatch = sizeInput === '' || miniature.tags.some(tag => {
        return tag.toLowerCase().startsWith('size:') && tag.split(':')[1].trim().toLowerCase() === sizeInput;
      });
  
      const tagMatches = Object.keys(tagInputs).every(tagKey => {
        if (tagInputs[tagKey] === '') return true;
  
        const tag = miniature.tags.find(t => t.toLowerCase().startsWith(tagKey.toLowerCase()));
  
        if (tagKey === 'features' && tag) {
          const features = tag.split(':')[1].trim().toLowerCase().split(','); // Split multiple features
          return features.some(feature => feature.trim().includes(tagInputs[tagKey]));
        }
  
        return tag && tag.split(':')[1].trim().toLowerCase() === tagInputs[tagKey];
      });
  
      return nameMatch && sizeMatch && tagMatches;
    });
  
    displayImages(filteredMiniatures);
    displayMiniatureStats(miniatures);
  }
  