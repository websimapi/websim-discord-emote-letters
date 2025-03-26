const emoteList = document.getElementById('emote-list');
const textInput = document.getElementById('text-input');
const outputArea = document.getElementById('output-area');
const copyButton = document.getElementById('copy-button');
const copyFeedback = document.getElementById('copy-feedback');

// --- Emote Generation Logic ---

// Define the letters that should be uppercase
const uppercaseLetters = new Set(['b', 'd', 'e', 'i', 'l', 'm', 's', 'v', 'w']);
const emoteMap = new Map();

// Populate the emote map and the display list
for (let i = 97; i <= 122; i++) { // ASCII codes for 'a' to 'z'
    const letterLower = String.fromCharCode(i);
    const letterForEmote = uppercaseLetters.has(letterLower)
        ? letterLower.toUpperCase()
        : letterLower;

    const emoteText = `:${letterForEmote}_:`;
    emoteMap.set(letterLower, emoteText); // Map lowercase input to correct emote

    // Add to the display list (optional, kept from previous step)
    const listItem = document.createElement('li');
    listItem.textContent = emoteText;
    emoteList.appendChild(listItem);
}
// Add space handling (replace space with multiple space characters or a specific emote if desired)
// For now, we'll just use a regular space in the output.
emoteMap.set(' ', ' ');


// --- Input Conversion Logic ---

textInput.addEventListener('input', () => {
    const inputText = textInput.value.toLowerCase(); // Convert input to lowercase for mapping
    let outputText = '';

    for (const char of inputText) {
        if (emoteMap.has(char)) {
            outputText += emoteMap.get(char);
        } else {
            // Optionally handle characters not in the map (e.g., punctuation)
            // outputText += char; // Keep original character
            // Or ignore them:
            // continue;
        }
    }
    outputArea.value = outputText;
});

// --- Copy to Clipboard Logic ---

copyButton.addEventListener('click', async () => {
    if (!outputArea.value) return; // Don't copy if empty

    try {
        await navigator.clipboard.writeText(outputArea.value);
        // Provide visual feedback
        copyFeedback.textContent = 'Copied!';
        copyFeedback.classList.add('show');
        copyButton.disabled = true; // Briefly disable button

        setTimeout(() => {
            copyFeedback.classList.remove('show');
            copyButton.disabled = false; // Re-enable button
             // Optional: Clear feedback text after fade out
             setTimeout(() => { copyFeedback.textContent = ''; }, 500);
        }, 1500); // Feedback visible for 1.5 seconds

    } catch (err) {
        console.error('Failed to copy text: ', err);
        copyFeedback.textContent = 'Failed to copy!';
        copyFeedback.classList.add('show');
         setTimeout(() => {
            copyFeedback.classList.remove('show');
             // Optional: Clear feedback text after fade out
             setTimeout(() => { copyFeedback.textContent = ''; }, 500);
        }, 2000);
    }
});