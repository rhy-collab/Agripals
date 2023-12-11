var button = document.getElementById("interactive-button");
var message = document.getElementById("dynamic-message");

button.addEventListener("click", function() {
  message.innerHTML = "Button was clicked";
});
