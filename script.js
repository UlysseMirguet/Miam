document.getElementById("chat-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;
  
    // Display user message
    addMessage("user", userInput);
    document.getElementById("user-input").value = "";
  
    try {
      // Send message to the API
      const response = await fetch("https://api.example.com/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer Y8sCvkCxYvVwmmGWknNvUgE3jaEuYvJ5"
        },
        body: JSON.stringify({
          agent_id: "ag:7d92a333:20241202:course-tah-les-fous:0593db55",
          message: userInput
        })
      });
  
      const data = await response.json();
  
      if (data && data.reply) {
        addMessage("bot", data.reply);
      } else {
        addMessage("bot", "Sorry, I didn't understand that.");
      }
    } catch (error) {
      console.error("Error communicating with the agent:", error);
      addMessage("bot", "There was an error communicating with the agent.");
    }
  });
  
  function addMessage(sender, message) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  