let colorToUse = "black";
let opacitySetting = 0.5;

document.querySelector('#opacityRange').addEventListener('input',(e)=>{
    opacitySetting = e.target.value/100;
  })

function refreshGrid(){
    let numberOfSquares = prompt("Please enter the desired number of squares per side: ");
    while (isNaN(numberOfSquares) || numberOfSquares > 100 || numberOfSquares <= 0) {
        numberOfSquares = prompt("Invalid Input. Please enter the desired number of squares per side: ");
    }
    generateGrid(numberOfSquares);
}

function setColor(newColor){
    colorToUse = newColor;
}

function changeBackground(event){
    event.target.classList.add('hovered');
    let newOpacityValue = Number(event.target.style.opacity) + opacitySetting;
    event.target.style.opacity = newOpacityValue;
    event.target.style.backgroundColor = colorToUse;
}

function generateGrid(numberOfSquares){
    const sketchbook = document.querySelector(".sketchbook");
    sketchbook.innerHTML = '';
    let numberOfRows = numberOfSquares;

    while (numberOfRows > 0) {
        let numberOfColumns = numberOfSquares;
        const divRow = document.createElement("div");
        divRow.classList.add("sketch_box_row");
        sketchbook.appendChild(divRow);

        while(numberOfColumns > 0){
            const div = document.createElement("div");
            div.classList.add("sketch_box_element");
            div.addEventListener("mouseover", changeBackground);
            divRow.appendChild(div);
            numberOfColumns -= 1;
        }
        numberOfRows -= 1;
    }
}

generateGrid(16);