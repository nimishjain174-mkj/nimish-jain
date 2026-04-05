script.js:
const zoneA = document.getElementById("zoneA");
const zoneB = document.getElementById("zoneB");

// store seats with POSITION
let seats = {
    A: [],
    B: []
};

let deleteMode = false;

// CREATE SEAT
function createSeat(seat, zone) {
    const div = document.createElement("div");

    // FIXED class mapping
    div.classList.add("seat", seat.status + "-seat");

    div.innerHTML = `
        <div>${seat.id}</div>
    `;

    div.addEventListener("click", () => {

        // DELETE MODE
        if (deleteMode) {
            seats[zone] = seats[zone].filter(s => s.id !== seat.id);
            render();
            return;
        }

        // STATUS CYCLE: free → taken → meeting → free
        if(seat.status === "free"){
            seat.status = "taken";
        }else if(seat.status === "taken"){
            seat.status = "meeting";
        }else{
            seat.status = "free";
        }

        render();
    });

    return div;
}

// RENDER
function render() {
    zoneA.innerHTML = "";
    zoneB.innerHTML = "";

    seats.A.forEach(seat => zoneA.appendChild(createSeat(seat, "A")));
    seats.B.forEach(seat => zoneB.appendChild(createSeat(seat, "B")));
}

// ADD SEAT
function addSeat() {
    let zone = prompt("Enter Zone (A or B):");

    if (!zone) return;

    zone = zone.toUpperCase();

    if (!seats[zone]) {
        alert("Invalid Zone!");
        return;
    }

    let index = seats[zone].length;

    let id = `${zone}-${(index+1).toString().padStart(2, "0")}`;

    seats[zone].push({
        id: id,
        status: "free",
        pos: index   // ⭐ IMPORTANT (grid position)
    });

    render();
}

// DELETE MODE
function deleteSeatMode() {
    deleteMode = true;
    alert("Click seats to delete");
}

// SAVE → MATRIX + BACKEND
function saveLayout() {

    let rows = 5;
    let cols = 6;

    let matrix = Array.from({length: rows}, () => Array(cols).fill(0));

    // combine zones
    let allSeats = [...seats.A, ...seats.B];

    allSeats.forEach((seat, i) => {

        let row = Math.floor(i / cols);
        let col = i % cols;

        if(row < rows && col < cols){

            if(seat.status === "free"){
                matrix[row][col] = 1;
            }else if(seat.status === "taken"){
                matrix[row][col] = 2;
            }else{
                matrix[row][col] = 3;
            }

        }

    });

    console.log("Matrix:", matrix);

    // SEND TO BACKEND
    fetch("http://localhost:3000/api/layout/update",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({layout: matrix})
    })
    .then(res => res.text())
    .then(data => console.log("Saved:", data));

    alert("Layout Saved Successfully ✅");
}

// INITIAL
render();