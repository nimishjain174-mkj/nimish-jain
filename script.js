const floor = document.getElementById("floor");
let seats = [];
let seatCount = 0;
let deleteActive = false;
let selectedSeat = null;
function addSeat() {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    const x = 50 + (seatCount * 60);
    const y = 50;

    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 40);
    rect.setAttribute("height", 40);
    rect.setAttribute("class", "seat");

    rect.dataset.id = seatCount;
    rect.addEventListener("mousedown", startDrag);
    rect.addEventListener("click", deleteSeat);
    floor.appendChild(rect);
    seats.push({
        id: seatCount,
        x: x,
        y: y
    });

    seatCount++;
}
function deleteMode() {
    deleteActive = true;
    alert("Click on a seat to delete");
}

function deleteSeat(event) {
    if (!deleteActive) return;

    const seat = event.target;
    const id = seat.dataset.id;

    floor.removeChild(seat);

    seats = seats.filter(s => s.id != id);

    deleteActive = false;
}
function startDrag(event) {
    selectedSeat = event.target;

    document.addEventListener("mousemove", dragSeat);
    document.addEventListener("mouseup", stopDrag);
}
function dragSeat(event) {
    if (!selectedSeat) return;

    const rect = floor.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectedSeat.setAttribute("x", x);
    selectedSeat.setAttribute("y", y);

    const id = selectedSeat.dataset.id;
    const seat = seats.find(s => s.id == id);

    if (seat) {
        seat.x = x;
        seat.y = y;
    }
}
function stopDrag() {
    document.removeEventListener("mousemove", dragSeat);
    document.removeEventListener("mouseup", stopDrag);

    selectedSeat = null;
}
function saveLayout() {
    console.log("Layout Data:", seats);

    fetch("/saveLayout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(seats)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

    alert("Layout saved successfully");
}