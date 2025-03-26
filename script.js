const emoteList = document.getElementById('emote-list');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');

// Define the letters that should be uppercase
const uppercaseLetters = new Set(['b', 'd', 'e', 'i', 'l', 'm', 's', 'v', 'w']);

// Create a mapping from regular letters to discord emote format
const letterToEmote = {};

for (let i = 97; i <= 122; i++) { // ASCII codes for 'a' to 'z'
    let letter = String.fromCharCode(i);
    let emoteLetter = letter; // Default to lowercase

    // Check if the current letter should be uppercase
    if (uppercaseLetters.has(letter)) {
        emoteLetter = letter.toUpperCase(); // Convert to uppercase
    }

    const emoteText = `:${emoteLetter}_:`;
    
    // Add to mapping
    letterToEmote[letter] = emoteText;

    // Create list item
    const listItem = document.createElement('li');
    listItem.textContent = emoteText;
    emoteList.appendChild(listItem);
}

// Convert input text to discord emote format
function convertToEmoteFormat(text) {
    // Convert to lowercase and remove non-alphabetic characters
    return text.toLowerCase()
        .split('')
        .map(char => {
            // If it's a letter a-z, convert to emote format
            if (/[a-z]/.test(char)) {
                return letterToEmote[char];
            } 
            // Keep spaces
            else if (char === ' ') {
                return ' ';
            }
            // Ignore other characters
            return '';
        })
        .filter(item => item !== '') // Remove empty strings
        .join(' '); // Add space between each emote
}

// Update output when input changes
inputText.addEventListener('input', () => {
    outputText.value = convertToEmoteFormat(inputText.value);
});

// Copy to clipboard functionality
copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    
    // Visual feedback
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
    }, 1500);
});