const apiKey = "Y8sCvkCxYvVwmmGWknNvUgE3jaEuYvJ5";
const agentId = "7d92a333:20241202:course-tah-les-fous:0593db55";
const apiUrl = `https://api.example.com/agents/${agentId}/chat`;

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

const appendMessage = (message, isBot = false) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", isBot ? "bot-message" : "user-message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
};

const sendMessage = async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage);
    userInput.value = "";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (response.ok) {
            const data = await response.json();
            const botMessage = data.reply || "Sorry, I couldn't understand that.";
            appendMessage(botMessage, true);
        } else {
            appendMessage("Error: Unable to contact the agent.", true);
        }
    } catch (error) {
        appendMessage("Error: Network issue.", true);
    }
};

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
