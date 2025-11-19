function openDialog() {
    let dialog = document.getElementById("dialog");
    dialog.style.display = "block";
    renderDialog();
}

function closeDialog() {
    let dialog = document.getElementById("dialog");
    dialog.style.display = "none";
}

function stopPropagation(event) {
    event.stopPropagation();
}

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
    
    // Event Listener für das Dialog-Content hinzufügen
    let dialogContent = document.querySelector('.dialog-content');
    dialogContent.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}