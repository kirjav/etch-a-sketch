let opacitySetting = 0.5;
let currentGridSize = 16;
var mouseDown = false;
let eraser = false;
let sketchbook = document.querySelector(".sketchbook");

document.querySelector('#opacityRange').addEventListener('input', (e) => {
    opacitySetting = e.target.value / 100;
})
//MOUSE EVENTS
sketchbook.onmousedown = () => (mouseDown = true)
sketchbook.onmouseup = () => (mouseDown = false)
// MOBILE EVENTS
sketchbook.ontouchstart = (event) => {
    event.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    mouseDown = true;
};
sketchbook.ontouchend = () => (mouseDown = false)

document.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

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

function changeBackground(event) {
    if(mouseDown){
        if(!eraser){
            colorToUse = document.getElementById("colorChoice").value;
            event.target.classList.add('hovered');
            let newOpacityValue = Number(event.target.style.opacity) + opacitySetting;
            event.target.style.opacity = newOpacityValue;
            event.target.style.backgroundColor = colorToUse;
        } else {
            event.target.classList.remove('hovered');
            let newOpacityValue = "";
            event.target.style.opacity = newOpacityValue;
            event.target.style.backgroundColor = "";
        }
    }
}

function generateGrid(numberOfSquares) {
    const sketchbook = document.querySelector(".sketchbook");
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
            div.addEventListener("pointerover", changeBackground);
            //div.addEventListener("touchstart", changeBackground);
            divRow.appendChild(div);
            numberOfColumns -= 1;
        }
        numberOfRows -= 1;
    }
}
sketchbook.style.cursor = 'crosshair';
generateGrid(70);