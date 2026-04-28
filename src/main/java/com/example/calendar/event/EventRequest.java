package com.example.calendar.event;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public class EventRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Date is required")
    @FutureOrPresent(message = "Date must be today or later")
    private LocalDate date;

    @NotNull(message = "Time is required")
    private LocalTime time;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}