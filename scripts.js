// Global Settings
let opacitySetting = 0.5;
let currentGridSize = window.innerWidth > 768 ? 70 : 30;
let mouseDown = false;
let eraserEnabled = false;
let pixelScale = 12;
let cursorSize = 1;

// Cached DOM Elements
const sketchbook = document.querySelector(".sketchbook");
const opacityRangeInput = document.querySelector('#opacityRange');
const cursorSizeInput = document.querySelector('#cursorSize');
const colorPicker = document.getElementById("colorChoice");

// Event Listeners
opacityRangeInput.addEventListener('input', (e) => setOpacity(e.target.value));
cursorSizeInput.addEventListener('input', (e) => setCursorSize(e.target.value));
colorPicker.addEventListener('change', handleColorChange);

// PC Mouse Events
sketchbook.addEventListener('mousedown', (e) => handleMouseDown(e));
sketchbook.addEventListener('mousemove', draw);
document.body.addEventListener('mouseup', () => handleMouseUp());

// Mobile Touch Events
sketchbook.addEventListener('touchstart', (e) => handleTouchStart(e));
sketchbook.addEventListener('touchmove', draw);
document.body.addEventListener('touchend', () => handleMouseUp());

// Prevent Drag Behavior
document.addEventListener('dragstart', (e) => e.preventDefault());

// Utility Functions
function setOpacity(value) {
    opacitySetting = value / 100;
}

function setCursorSize(value) {
    cursorSize = value / 10;
}

function handleMouseDown(event) {
    mouseDown = true;
    draw(event);
}

function handleMouseUp() {
    mouseDown = false;
}

function handleTouchStart(event) {
    event.preventDefault();
    mouseDown = true;
    draw(event);
}

function handleColorChange() {
    if (eraserEnabled) toggleEraser();
}

function toggleEraser() {
    eraserEnabled = !eraserEnabled;
    document.querySelector('.eraser.button').classList.toggle("selected_eraser");
    sketchbook.style.cursor = eraserEnabled 
        ? "url('Images/eraserCursor.png') 0 20, auto" 
        : 'crosshair';
}

function refreshGrid() {
    let gridSize = prompt("Please enter the desired number of squares per side (1-100):");
    while (isNaN(gridSize) || gridSize > 100 || gridSize <= 0) {
        if (gridSize == null) return;
        gridSize = prompt("Invalid input. Please enter a number between 1 and 100:");
    }
    generateGrid(Number(gridSize));
}

function clearGrid() {
    generateGrid(currentGridSize);
}

function draw(event) {
    if (!mouseDown) return;

    // Normalize Event Coordinates
    const { clientX, clientY } = event.touches 
        ? event.touches[0] 
        : event;

    // Calculate Radius
    const radius = (cursorSize * pixelScale) / 2;

    // Check Elements Within Radius
    document.querySelectorAll('.sketch_box_element').forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(Math.pow(centerX - clientX, 2) + Math.pow(centerY - clientY, 2));
        if (distance <= radius) applyBrush(element);
    });
}

function applyBrush(element) {
    if (eraserEnabled) {
        element.classList.remove('hovered');
        element.style.opacity = "";
        element.style.backgroundColor = "";
    } else {
        const color = colorPicker.value;
        element.classList.add('hovered');
        const newOpacity = Number(element.style.opacity || 0) + opacitySetting;
        element.style.opacity = newOpacity;
        element.style.backgroundColor = color;
    }
}

function generateGrid(gridSize) {
    sketchbook.innerHTML = '';
    currentGridSize = gridSize;

    document.querySelector('#scaleReference').textContent = `Scale: ${gridSize} x ${gridSize}`;
    for (let row = 0; row < gridSize; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("sketch_box_row");

        for (let col = 0; col < gridSize; col++) {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("sketch_box_element");
            rowDiv.appendChild(cellDiv);
        }

        sketchbook.appendChild(rowDiv);
    }
}

// Initialize
sketchbook.style.cursor = 'crosshair';
generateGrid(currentGridSize);
