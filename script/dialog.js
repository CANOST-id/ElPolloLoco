/** Opens the instruction dialog by setting its display to block and rendering its content.
*/

function openDialog() {
    let dialog = document.getElementById("dialog");
    dialog.style.display = "block";
    renderDialog();
}

/** Closes the instruction dialog by setting its display to none.
*/
function closeDialog() {
    let dialog = document.getElementById("dialog");
    dialog.style.display = "none";
}

/** Stops the propagation of the click event to prevent closing the dialog when clicking inside it.
* @param {Event} event - The click event
*/
function stopPropagation(event) {
    event.stopPropagation();
}

/** Renders the content of the instruction dialog, including controls and instructions.
*/
function renderDialog() {
    let dialog = document.getElementById("dialog");
    dialog.innerHTML = `
        <section class="dialog-content">
            <button class="close-button" onclick="closeDialog()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
            <h2>HOW TO PLAY</h2> 
            
            <p>Use the arrow keys to move your character and press 'D' to throw bottles at enemies. Collect items, avoid the enemies and the EndBoss!</p>
            <h3>Good luck!</h3>

            <section class="movement-instructions">
                <ul> 
                    <li>
                        <span>
                            SPACE | <span>&#8593;</span>
                        </span> 
                        <span>JUMP</span>
                    </li>
                    <li>
                        <span>
                            RIGHT ARROW | <span>&#8594;</span>
                        </span>
                        <span>MOVE RIGHT</span>
                    </li>
                    <li>
                        <span>
                            LEFT ARROW | <span>&#8592;</span>
                        </span>
                        <span>MOVE LEFT</span>
                    </li>
                    <li>
                        <span>D</span>
                        <span>THROW BOTTLE</span>
                    </li>
                </ul>
            </section>
        </section>
    `;
}

let dialogContent = document.querySelector('.dialog-content');
dialogContent.addEventListener('click', function (event) {
    event.stopPropagation();
});