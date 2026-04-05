const zoneA = document.getElementById("zoneA");
const zoneB = document.getElementById("zoneB");

// Seat Data (you can later connect this with backend)
const seatsData = {
    A: [
        { id: "A-01", status: "free" },
        { id: "A-02", status: "free" },
        { id: "A-03", status: "taken" },
        { id: "A-04", status: "free" },
        { id: "A-05", status: "free" },
        { id: "A-06", status: "free" },
        { id: "A-07", status: "taken" },
        { id: "A-08", status: "free" }
    ],
    B: [
        { id: "B-01", status: "free" },
        { id: "B-02", status: "taken" },
        { id: "B-03", status: "free" },
        { id: "B-04", status: "free" },
        { id: "B-05", status: "taken" },
        { id: "B-06", status: "free" }
    ]
};

// Create seat element
function createSeat(seat) {
    const div = document.createElement("div");
    div.classList.add("seat");

    if (seat.status === "free") div.classList.add("free-seat");
    if (seat.status === "taken") div.classList.add("taken-seat");
    if (seat.status === "meeting") div.classList.add("meeting-seat");

    div.innerHTML = `
        <div>○</div>
        <div>${seat.id}</div>
    `;

    // Click toggle (for demo)
    div.addEventListener("click", () => {
        if (seat.status === "free") {
            seat.status = "taken";
        } else {
            seat.status = "free";
        }
        renderSeats();
    });

    return div;
}

// Render function
function renderSeats() {
    zoneA.innerHTML = "";
    zoneB.innerHTML = "";

    seatsData.A.forEach(seat => {
        zoneA.appendChild(createSeat(seat));
    });

    seatsData.B.forEach(seat => {
        zoneB.appendChild(createSeat(seat));
    });
}

// Initial load
renderSeats();s
