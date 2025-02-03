let popup = document.getElementById("popup")

function openPopup(){
    popup.classList.add("open-popup")
    document.addEventListener("click", handleClickOutside);
}

function closePopup(){
    popup.classList.remove("open-popup")

}


const budgetSlider = document.getElementById("budget");

const budgetValue = document.getElementById("budgetValue");

budgetSlider.addEventListener("input", function() {
  budgetValue.textContent = budgetSlider.value;
});



// CHATBOX
function sendMessage() {
    var userInput = $("#user-input").val();
    displayMessage("user", userInput);
    $("#user-input").val(""); // Clear the input field

    // Send user message to Dialogflow
    $.ajax({
      type: "POST",
      url: "https://api.dialogflow.com/v1/query?v=20150910",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN"
      },
      data: JSON.stringify({
        query: userInput,
        lang: "en",
        sessionId: "somerandomsessionid" // You can use any unique ID here
      }),
      success: function(response) {
        var botResponse = response.result.fulfillment.speech;
        displayMessage("bot", botResponse);
      },
      error: function(xhr, status, error) {
        console.error("Error:", error);
      }
    });
  }

  function displayMessage(sender, message) {
    var chatMessages = $("#chat-messages");
    var messageElement = $("<div>").text("[" + sender + "] " + message);
    chatMessages.append(messageElement);
  }