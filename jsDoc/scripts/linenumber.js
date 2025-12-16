/*global document */
(() => {
    /**
     * Initializes line numbering for JSDoc source code display.
     * Sets up line numbers and highlights selected lines based on URL hash.
     */
    function initializeLineNumbers() {
        const source = getSourceElement();
        if (source) {
            processLineNumbers(source);
        }
    }

    /**
     * Gets the source code element to process for line numbers.
     * @returns {HTMLElement|null} The source element or null if not found
     */
    function getSourceElement() {
        const sources = document.getElementsByClassName('prettyprint source linenums');
        return sources && sources[0] ? sources[0] : null;
    }

    /**
     * Processes line numbers for the source code element.
     * Assigns IDs and highlights selected lines.
     * @param {HTMLElement} source - The source code element
     */
    function processLineNumbers(source) {
        const anchorHash = document.location.hash.substring(1);
        const lines = source.getElementsByTagName('li');
        assignLineIds(lines, anchorHash);
    }

    /**
     * Assigns line IDs and applies selection highlighting.
     * @param {HTMLCollection} lines - Collection of line elements
     * @param {string} anchorHash - The hash from URL for highlighting
     */
    function assignLineIds(lines, anchorHash) {
        for (let i = 0; i < lines.length; i++) {
            const lineNumber = i + 1;
            const lineId = `line${lineNumber}`;
            lines[i].id = lineId;
            if (lineId === anchorHash) {
                lines[i].className += ' selected';
            }
        }
    }

    initializeLineNumbers();
})();
