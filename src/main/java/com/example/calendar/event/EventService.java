package com.example.calendar.event;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event createEvent(EventRequest request) {
        Event event = new Event(request.getTitle().trim(), request.getDate(), request.getTime());
        return eventRepository.save(event);
    }

    public List<Event> getEvents() {
        return eventRepository.findAllByOrderByDateAscTimeAsc();
    }
}