let comparisonCars = [];
let currentImageIndex = 0;
let currentImages = [];

function showDetails(title, description, specs) {
  document.getElementById('car-title').innerText = title;
  document.getElementById('car-description').innerText = description;
  currentImages = [`${title.toLowerCase().replace(/ /g, '')}_1.jpg`, `${title.toLowerCase().replace(/ /g, '')}_2.jpg`, `${title.toLowerCase().replace(/ /g, '')}_3.jpg`];
currentImageIndex = 0;
document.getElementById('slider-image').src = currentImages[0];
document.getElementById('car-specs').style.display = "none";
  document.getElementById('showDetails').innerText = "Show Details";
  document.getElementById('showDetails').style.display = "inline-block";

const specsList = document.getElementById('car-specs');
  specsList.innerHTML = `<li><strong>Engine:</strong> ${specs.engine}</li>
                          <li><strong>Mileage:</strong> ${specs.mileage}</li>
                          <li><strong>Fuel:</strong> ${specs.fuel}</li>
                          <li><strong>Rating:</strong> ${specs.rating} ⭐</li>`;
  document.getElementById('car-details').style.display = "flex";
}

function slideImage(step) {
  if (currentImages.length === 0) return;
  currentImageIndex = (currentImageIndex + step + currentImages.length) % currentImages.length;
  document.getElementById('slider-image').src = currentImages[currentImageIndex];
}

function closeDetails() {
  document.getElementById('car-details').style.display = "none";
}

function compareCar(event, name, image, specs) {
  event.stopPropagation();
  const existing = comparisonCars.find(c => c.name === name);
  if (!existing) {
    comparisonCars.push({ name, image, specs });
  }
  updateComparisonModal();
}

function updateComparisonModal() {
  const container = document.getElementById('comparison-content');
  if (comparisonCars.length === 0) {
    container.innerHTML = '<p>No cars selected.</p>';
    document.getElementById('comparison-modal').style.display = "none";
    return;
  }

  // Build the comparison table
  let table = '<div class="comparison-table">';
  table += '<div class="comparison-row">';
  comparisonCars.forEach(car => {
    table += `
      <div class="comparison-col">
        <img src="${car.image}" alt="${car.name}" class="compare-img" />
        <h3>${car.name}</h3>
        <button onclick="removeCar('${car.name}')">Remove</button>
      </div>
    `;
  });
  table += '</div>';

  const specs = ['engine', 'mileage', 'fuel', 'rating'];
  const labels = {
    engine: 'Engine',
    mileage: 'Mileage',
    fuel: 'Fuel Type',
    rating: 'Rating'
  };

  specs.forEach(spec => {
    table += '<div class="comparison-row">';
    comparisonCars.forEach(car => {
      table += `<div class="comparison-col"><strong>${labels[spec]}:</strong><br>${car.specs[spec]}</div>`;
    });
    table += '</div>';
  });

  table += '</div>';
  container.innerHTML = table;
  document.getElementById('comparison-modal').style.display = "flex";
}

function removeCar(name) {
  comparisonCars = comparisonCars.filter(c => c.name !== name);
  updateComparisonModal();
}

function closeComparison() {
  document.getElementById('comparison-modal').style.display = "none";
}

function clearComparison() {
  comparisonCars = [];
  updateComparisonModal();
}

function filterCars() {
  const input = document.getElementById('search').value;
  const filter = parseInt(input, 10);
  const cars = document.querySelectorAll('.car-card');

  cars.forEach(car => {
    const price = parseInt(car.getAttribute('data-price'), 10);
    if (!isNaN(filter) && price > filter) {
      car.style.display = "none";
    } else {
      car.style.display = "block";
    }
  });
}

// Carousel logic
function scrollCarousel(direction) {
  const carousel = document.querySelector('.carousel-track');
  const scrollAmount = 300;
  carousel.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
}

function toggleSpecs() {
  const specs = document.getElementById('car-specs');
  specs.style.display = specs.style.display === 'none' ? 'block' : 'none';
}

function buyCar(name) {
  alert(`You selected to buy ${name}. Redirecting to purchase page...`);
  // window.location.href = `/buy/${name.toLowerCase().replace(/\\s/g, '-')}`;
}

let selectedRating = 0;

function setRating(rating) {
  selectedRating = rating;
  const stars = document.querySelectorAll('.star-rating span');
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < rating);
  });
}

function submitReview() {
  const text = document.getElementById('review-text').value.trim();
  if (selectedRating === 0 || text === '') {
    alert("Please select a rating and write a review.");
    return;
  }

  const reviewList = document.getElementById('review-output');
  const review = document.createElement('p');
  review.innerHTML = `<strong>${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</strong><br>${text}`;
  reviewList.prepend(review); // Add to top
  document.getElementById('review-text').value = '';
  setRating(0);
}

function openComparisonModal() {
  if (comparisonCars.length === 0) {
    alert("Please add cars to compare.");
    return;
  }
  document.getElementById('comparison-modal').style.display = "flex";
  updateComparisonModal();
}

