const eventForm = document.getElementById("event-form");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const eventList = document.getElementById("event-list");
const emptyState = document.getElementById("empty-state");
const formMessage = document.getElementById("form-message");
const refreshButton = document.getElementById("refresh-button");

const formatEventDateTime = (date, time) => {
    const eventDate = new Date(`${date}T${time}`);
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(eventDate);
};

const setMessage = (message, type = "") => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`.trim();
};

const renderEvents = (events) => {
    eventList.innerHTML = "";

    if (!events.length) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    events.forEach((event) => {
        const item = document.createElement("li");
        item.className = "event-item";
        const title = document.createElement("h3");
        title.textContent = event.title;

        const dateTime = document.createElement("p");
        dateTime.className = "event-meta";
        dateTime.textContent = formatEventDateTime(event.date, event.time);

        const id = document.createElement("p");
        id.className = "event-meta";
        id.textContent = `Event ID: ${event.id}`;

        item.append(title, dateTime, id);
        eventList.appendChild(item);
    });
};

const loadEvents = async () => {
    try {
        const response = await fetch("/api/events");
        if (!response.ok) {
            throw new Error("Could not fetch events.");
        }

        const events = await response.json();
        renderEvents(events);
    } catch (error) {
        setMessage(error.message, "error");
    }
};

const addEvent = async (payload) => {
    const response = await fetch("/api/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        let errorMessage = "Unable to save event.";
        try {
            const errorBody = await response.json();
            if (errorBody.errors && Array.isArray(errorBody.errors)) {
                errorMessage = errorBody.errors.join(", ");
            }
        } catch (error) {
            // Ignore JSON parsing errors and keep the default message.
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

eventForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
        title: titleInput.value,
        date: dateInput.value,
        time: timeInput.value
    };

    try {
        await addEvent(payload);
        eventForm.reset();
        setMessage("Event added successfully.", "success");
        await loadEvents();
    } catch (error) {
        setMessage(error.message, "error");
    }
});

refreshButton.addEventListener("click", loadEvents);

dateInput.min = new Date().toISOString().split("T")[0];
loadEvents();