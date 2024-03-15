document.addEventListener("DOMContentLoaded", function() {
    // Get the donate button element
    var donateButton = document.getElementById("donateButton");

    // Add click event listener to the donate button
    donateButton.addEventListener("click", function() {
        // Redirect to the donate page
        window.location.href = "/donate.html";
    });
});


// Render the PayPal button
paypal.Buttons({
    // Set up the transaction
    createOrder: function(data, actions) {
      // Get the selected amount
      var selectedAmount = document.querySelector('input[name="custom-amount"]').value;
      
      if (!selectedAmount) {
        // If no custom amount selected, get the value of the clicked button
        selectedAmount = document.querySelector('.amount-button.selected').getAttribute('data-amount');
      }
      
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: selectedAmount || '0.00' // Set the total amount here, default to 0.00 if empty
          }
        }]
      });
    },
  
    // Finalize the transaction
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Handle a successful transaction
        alert('Transaction completed by ' + details.payer.name.given_name);
        // You can redirect the user to a thank you page or handle the success in any other way
      });
    },
  
    // Handle errors
    onError: function(err) {
      console.log(err);
      // Handle errors here
    }
  }).render('#paypal-button-container');
  
  // Add event listeners to amount buttons
  document.querySelectorAll('.amount-button').forEach(button => {
    button.addEventListener('click', function() {
      // Remove selected class from all buttons
      document.querySelectorAll('.amount-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      // Add selected class to the clicked button
      this.classList.add('selected');
      // Clear custom amount input field
      document.getElementById('custom-amount').value = '';
    });
  });
  
  // Add event listener to custom amount input field
  document.getElementById('custom-amount').addEventListener('input', function() {
    // Remove selected class from all buttons
    document.querySelectorAll('.amount-button').forEach(btn => {
      btn.classList.remove('selected');
    });
  });
  
