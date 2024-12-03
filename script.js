const apiKey = 'Y8sCvkCxYvVwmmGWknNvUgE3jaEuYvJ5';
const agentId = 'ag:7d92a333:20241202:course-tah-les-fous:0593db55';
const conversation = [
    { role: 'system', content: 'Vous êtes un assistant utile.' }
];

const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Ajoute le message de l'utilisateur à la conversation et à l'affichage
    const userMessageObj = { role: 'user', content: userMessage };
    conversation.push(userMessageObj);
    addMessageToChat('user', userMessage);

    userInput.value = '';
    userInput.focus();

    // Appelle l'API
    callAgentApi();
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

function addMessageToChat(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.textContent = content;

    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);

    // Scroll jusqu'en bas
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function callAgentApi() {
    const url = 'https://api.mistral.ai/v1/agents/completions';

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const body = {
        agent_id: agentId,
        messages: conversation
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.choices && data.choices.length > 0) {
            const assistantMessageObj = data.choices[0].message;
            conversation.push(assistantMessageObj);

            let assistantContent = assistantMessageObj.content;
            if (Array.isArray(assistantContent)) {
                assistantContent = assistantContent.map(chunk => {
                    if (chunk.type === 'text') {
                        return chunk.text;
                    } else if (chunk.type === 'image_url') {
                        return '[Image]';
                    } else {
                        return '';
                    }
                }).join('');
            }

            addMessageToChat('agent', assistantContent);
        } else {
            addMessageToChat('agent', "Désolé, une erreur est survenue.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChat('agent', "Désolé, une erreur est survenue.");
    });
}
