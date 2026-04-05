const zoneA = document.getElementById("zoneA");
const zoneB = document.getElementById("zoneB");

// ✅ EMPTY START (IMPORTANT FIX)
let seats = {
    A: [],
    B: []
};

let deleteMode = false;

// CREATE SEAT
function createSeat(seat, zone) {
    const div = document.createElement("div");
    div.classList.add("seat", seat.status);

    div.innerHTML = `
        <div class="icon">${seat.status === "taken" ? "👤" : "○"}</div>
        <div>${seat.id}</div>
    `;

    div.addEventListener("click", () => {

        // DELETE MODE
        if (deleteMode) {
            seats[zone] = seats[zone].filter(s => s.id !== seat.id);
            render();
            deleteMode = false;
            return;
        }

        // TOGGLE STATUS
        seat.status = seat.status === "free" ? "taken" : "free";
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

    let count = seats[zone].length + 1;
    let id = `${zone}-${count.toString().padStart(2, "0")}`;

    seats[zone].push({
        id: id,
        status: "free"
    });

    render();
}

// DELETE MODE
function deleteSeatMode() {
    deleteMode = true;
    alert("Click on seat to delete");
}

// SAVE
function saveLayout() {
    console.log("Saved Data:", seats);
    alert("Layout Saved!");
}

// INITIAL LOAD (empty screen)
render();