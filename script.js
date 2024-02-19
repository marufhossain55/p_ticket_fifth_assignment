const maxSelection = 4;
let selectedButtons = 0;
let selectedButtonNames = [];

// Function to update seat counts
function updateSeatCounts() {
  const seatsLeft = document.getElementById('seat-left');
  const totalSelectedSeat = document.getElementById('total-selected-seat');
  seatsLeft.textContent = 40 - selectedButtons;
  totalSelectedSeat.textContent = selectedButtons;
}

// Function to handle button click event
function changeBackgroundById(buttonId) {
  const button = document.getElementById(buttonId);
  if (!button) return;

  const isSelected = button.classList.contains('bg-green-500');

  if (isSelected) {
    button.classList.remove('bg-green-500');
    selectedButtons--;

    const buttonNameIndex = selectedButtonNames.indexOf(button.textContent);
    if (buttonNameIndex !== -1) {
      selectedButtonNames.splice(buttonNameIndex, 1);
    }
  } else {
    if (selectedButtons < maxSelection) {
      button.classList.add('bg-green-500');
      selectedButtons++;

      selectedButtonNames.push(button.textContent);
    } else {
      alert('Maximum 4 seats are allowed.');
      // Enable the input field and button
      document.getElementById('copun-input').disabled = false;
      document.getElementById('cupon-btn').disabled = false;
      return;
    }
  }

  // Update seat counts
  updateSeatCounts();

  // Update selected button names list
  updateSelectedButtonNamesList();

  // Update total price and grand total
  const totalPrice = selectedButtons * 550;
  const grandTotal = totalPrice;
  document.getElementById('total-price').textContent = totalPrice;
  document.getElementById('grand-total').textContent = grandTotal;

  // Check if 4 buttons are selected, then enable the input field and button
  if (selectedButtons === maxSelection) {
    document.getElementById('copun-input').disabled = false;
    document.getElementById('cupon-btn').disabled = false;
  }
}

// Function to update the selected button names list
function updateSelectedButtonNamesList() {
  const selectedButtonsList = document.getElementById('selected-buttons-list');
  selectedButtonsList.innerHTML = '';

  // Create an unordered list
  const list = document.createElement('ul');
  list.style.paddingLeft = '10px';

  selectedButtonNames.forEach((buttonName, index) => {
    const listItem = document.createElement('li');
    listItem.style.marginBottom = '10px';

    const buttonParagraph = document.createElement('span');
    buttonParagraph.textContent = buttonName;
    buttonParagraph.style.marginRight = '110px';
    listItem.appendChild(buttonParagraph);

    const economySpan = document.createElement('span');
    economySpan.textContent = ' Economy ';
    economySpan.style.marginRight = '70px';
    listItem.appendChild(economySpan);

    const priceSpan = document.createElement('span');
    priceSpan.textContent = '550';
    listItem.appendChild(priceSpan);

    list.appendChild(listItem);
  });

  selectedButtonsList.appendChild(list);
}

// Function to handle coupon
function applyCoupon() {
  const couponInput = document.getElementById('copun-input');
  const couponBtn = document.getElementById('cupon-btn');
  const grandTotalSpan = document.getElementById('grand-total');

  const couponCode = couponInput.value.trim();

  if (couponCode === 'NEW15') {
    const totalPrice = selectedButtons * 550;
    const discountedPrice = totalPrice * 0.85;
    const grandTotal = discountedPrice;
    grandTotalSpan.textContent = grandTotal;
  } else if (couponCode === 'couple 20') {
    const totalPrice = selectedButtons * 550;
    const discountedPrice = totalPrice * 0.8;
    const grandTotal = discountedPrice;

    grandTotalSpan.textContent = grandTotal;
  }

  // Hide the coupon input and button
  couponInput.style.display = 'none';
  couponBtn.style.display = 'none';
}

// Add event listener to coupon button
document.getElementById('cupon-btn').addEventListener('click', applyCoupon);

// Add event listeners to each button by class
const buttons = document.querySelectorAll('.btn');
buttons.forEach((button) => {
  button.addEventListener('click', () => changeBackgroundById(button.id));
});

// Initialize seat counts
updateSeatCounts();
