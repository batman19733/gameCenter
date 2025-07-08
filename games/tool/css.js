// Function to add syntax highlighting to CSS code
function highlightCSS(code) {
    return code
        .replace(/: *([^;]+);/g, ': <span class="css-value">$1</span>;')
        .replace(/([a-zA-Z-]+):/g, '<span class="css-property">$1</span>:')
        .replace(/(--[a-zA-Z0-9-]+)/g, '<span class="css-variable">$1</span>')
        .replace(/^([^{]+)\{/gm, '<span class="css-selector">$1</span>{')
        .replace(/\/\*[\s\S]*?\*\//g, '<span class="css-comment">$&</span>')
        .replace(/\b(\d+(?:\.\d+)?(?:px|em|rem|vh|vw|%)?)\b/g, '<span class="css-number">$1</span>')
        .replace(/#([a-fA-F0-9]{3,6})\b/g, '<span class="css-color">#$1</span>');
}

// Function to fetch and display the CSS content
async function fetchAndDisplayCSS() {
    try {
        const response = await fetch('../../global.css');
        if (!response.ok) {
            throw new Error('Failed to fetch CSS file');
        }
        const cssContent = await response.text();
        const codeElement = document.getElementById('cssCode');
        codeElement.innerHTML = highlightCSS(cssContent);
    } catch (error) {
        console.error('Error loading CSS:', error);
        document.getElementById('cssCode').textContent = 'Error loading CSS file';
    }
}

// Function to copy the code
function copyCode() {
    const codeElement = document.getElementById('cssCode');
    // Get text content only, without the HTML tags
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        
        // Change button text to show feedback
        copyBtn.textContent = 'Copied!';
        
        // Reset button text after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text to clipboard');
    });
}

// Load the CSS content when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayCSS);

let theme = localStorage.getItem('theme');if (theme === 'black') {document.body.classList.add('dark')}
