let opacitySetting = 0.5;
let currentGridSize = window.innerWidth > 768 ? 70 : 30;
var mouseDown = false;
let eraser = false;
let sketchbook = document.querySelector(".sketchbook");
let lastElement = null;
let pixelScale = 12;
let cursorSize = 10;

document.querySelector('#opacityRange').addEventListener('input', (e) => {
    opacitySetting = e.target.value / 100;
})

document.querySelector('#cursorSize').addEventListener('input', (e) => {
    cursorSize = e.target.value / 10;
})
//PC MOUSE EVENTS
sketchbook.onmousedown = (event) => {
    mouseDown = true;
    draw(event);
}
sketchbook.addEventListener('mousemove', draw);
document.body.onmouseup = () => (mouseDown = false)
document.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

// MOBILE EVENTS
sketchbook.ontouchstart = (event) => {
    event.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    mouseDown = true;
    draw(event);
};

sketchbook.addEventListener('touchmove', draw);
document.body.ontouchend = () => (mouseDown = false)


function refreshGrid() {
    let numberOfSquares = prompt("Please enter the desired number of squares per side: ");
    while (isNaN(numberOfSquares) || numberOfSquares > 100 || numberOfSquares <= 0) {
        if (numberOfSquares == null){
            return;
        }
        numberOfSquares = prompt("Invalid Input. Please enter the desired number of squares per side: ");
    }
    generateGrid(numberOfSquares);
}
document.getElementById("colorChoice").addEventListener('change', (e) => {
    if(eraser){
        enableEraser();
    }
        
});


function enableEraser(){
    eraser = eraser ? false : true;
    document.querySelector('.eraser.button').classList.toggle("selected_eraser");

    if(eraser){
        document.querySelector(".sketchbook").style.cursor = "url('Images/eraserCursor.png') 0 20, auto";
    } else {
        document.querySelector(".sketchbook").style.cursor = 'crosshair';
    }

}

function clearGrid() {
    generateGrid(currentGridSize);
}

function draw(event) {
    if (!mouseDown) return;

    // Normalize touch and mouse events
    let clientX, clientY;
    if (event.touches) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    const radius = (cursorSize * pixelScale)/2; // Radius in pixels
    const elements = document.querySelectorAll('.sketch_box_element');

    elements.forEach((element) => {
        const rect = element.getBoundingClientRect(); // Get element's position and size
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from the touch/mouse point to the element's center
        const distance = Math.sqrt(
            Math.pow(centerX - clientX, 2) + Math.pow(centerY - clientY, 2)
        );

        if (distance <= radius) {
            // Apply color or eraser logic
            if (!eraser) {
                const colorToUse = document.getElementById("colorChoice").value;
                element.classList.add('hovered');
                let newOpacityValue = Number(element.style.opacity) + opacitySetting;
                element.style.opacity = newOpacityValue;
                element.style.backgroundColor = colorToUse;
            } else {
                element.classList.remove('hovered');
                element.style.opacity = "";
                element.style.backgroundColor = "";
            }
        }
    });
}

function generateGrid(numberOfSquares) {
    const sketchbook = document.querySelector(".sketchbook");
    lastElement = null;
    document.querySelector('#scaleReference').innerHTML = "Scale: " + numberOfSquares + " x " + numberOfSquares;
    sketchbook.innerHTML = '';
    let numberOfRows = numberOfSquares;
    currentGridSize = numberOfSquares;

    while (numberOfRows > 0) {
        let numberOfColumns = numberOfSquares;
        const divRow = document.createElement("div");
        divRow.classList.add("sketch_box_row");
        sketchbook.appendChild(divRow);

        while (numberOfColumns > 0) {
            const div = document.createElement("div");
            div.classList.add("sketch_box_element");
            //div.addEventListener("mouseover", changeBackground);
            //div.addEventListener("touchstart", changeBackground);
            divRow.appendChild(div);
            numberOfColumns -= 1;
        }
        numberOfRows -= 1;
    }
}

sketchbook.style.cursor = 'crosshair';
generateGrid(currentGridSize);