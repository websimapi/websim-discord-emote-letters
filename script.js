const emoteList = document.getElementById('emote-list');

for (let i = 97; i <= 122; i++) { // ASCII codes for 'a' to 'z'
    const letter = String.fromCharCode(i);
    const emoteText = `:${letter}_:`;

    const listItem = document.createElement('li');
    listItem.textContent = emoteText;
    emoteList.appendChild(listItem);
}

