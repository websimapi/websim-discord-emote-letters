const emoteList = document.getElementById('emote-list');

// Define the letters that should be uppercase
const uppercaseLetters = new Set(['b', 'd', 'e', 'i', 'l', 'm', 's', 'v', 'w']);

for (let i = 97; i <= 122; i++) { // ASCII codes for 'a' to 'z'
    let letter = String.fromCharCode(i);
    let emoteLetter = letter; // Default to lowercase

    // Check if the current letter should be uppercase
    if (uppercaseLetters.has(letter)) {
        emoteLetter = letter.toUpperCase(); // Convert to uppercase
    }

    const emoteText = `:${emoteLetter}_:`;

    const listItem = document.createElement('li');
    listItem.textContent = emoteText;
    emoteList.appendChild(listItem);
}