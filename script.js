const apiKey = "Y8sCvkCxYvVwmmGWknNvUgE3jaEuYvJ5";
const agentId = "ag:7d92a333:20241202:course-tah-les-fous:0593db55";

document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  // Display user message
  displayMessage(userInput, "user-message");

  // Clear input field
  document.getElementById("user-input").value = "";

  // Call the Mistral API
  try {
    const response = await fetch("https://api.mistral.ai/v1/agents/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: agentId,
        messages: [{ role: "user", content: userInput }],
        max_tokens: 150,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const agentMessage = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
      displayMessage(agentMessage, "agent-message");
    } else {
      displayMessage("There was an error. Please try again later.", "agent-message");
    }
  } catch (error) {
    displayMessage("Failed to connect to the agent. Please try again later.", "agent-message");
  }
});

function displayMessage(content, className) {
  const messageContainer = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.textContent = content;
  messageDiv.className = `message ${className}`;
  messageContainer.appendChild(messageDiv);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
