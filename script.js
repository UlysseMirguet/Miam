const apiUrl = "https://api.mistral.com/agents/ag:7d92a333:20241202:course-tah-les-fous:0593db55/messages"; // API de l'agent
const apiKey = "VOTRE_CLE_API"; // Remplacez par votre clé API

// Références aux éléments HTML
const chatForm = document.getElementById("chat-form");
const userMessageInput = document.getElementById("user-message");
const messagesDiv = document.getElementById("messages");

// Fonction pour afficher un message
function addMessage(author, text, className = "") {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `${author}: ${text}`;
    messageDiv.className = className;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll automatique
}

// Gérer l'envoi du message
chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;

    // Ajouter le message de l'utilisateur
    addMessage("Vous", userMessage, "user");

    // Réinitialiser le champ de saisie
    userMessageInput.value = "";

    // Envoyer le message à l'agent Mistral
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ message: userMessage }),
        });

        if (response.ok) {
            const data = await response.json();
            addMessage("Agent Mistral", data.reply || "Réponse indisponible", "bot");
        } else {
            addMessage("Erreur", "Impossible de contacter l'agent.", "error");
        }
    } catch (error) {
        console.error("Erreur :", error);
        addMessage("Erreur", "Une erreur s'est produite.", "error");
    }
});
