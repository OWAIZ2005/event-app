import React, { createContext, useContext, useState } from "react";

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer?: string;
  venue?: string;
  participants?: string;
  payment?: string;
  description?: string;
}

interface EventStateContextType {
  eventsMarkedForReminder: EventItem[];
  registeredEvents: EventItem[];
  addReminder: (event: EventItem) => void;
  toggleReminder: (event: EventItem) => void;
  registerEvent: (event: EventItem) => void;
  isReminder: (id: string) => boolean;
  isRegistered: (id: string) => boolean;
  removeReminder: (id: string) => void;
}

const EventStateContext = createContext<EventStateContextType | undefined>(
  undefined
);

export const EventStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [eventsMarkedForReminder, setEventsMarkedForReminder] = useState<
    EventItem[]
  >([]);
  const [registeredEvents, setRegisteredEvents] = useState<EventItem[]>([]);

  const isReminder = (id: string): boolean => {
    return eventsMarkedForReminder.some(
      (e) => e.id === id || e.title === id
    );
  };

  const isRegistered = (id: string): boolean => {
    return registeredEvents.some(
      (e) => e.id === id || e.title === id
    );
  };

  const addReminder = (event: EventItem) => {
    const eventId = event.id || event.title;
    // If already in reminders or already registered, do nothing
    if (isReminder(eventId) || isRegistered(eventId)) {
      return;
    }
    setEventsMarkedForReminder((prev) => [...prev, event]);
  };

  const toggleReminder = (event: EventItem) => {
    const eventId = event.id || event.title;
    // Cannot toggle reminder if already registered
    if (isRegistered(eventId)) {
      return;
    }
    if (isReminder(eventId)) {
      setEventsMarkedForReminder((prev) =>
        prev.filter((e) => e.id !== eventId && e.title !== event.title)
      );
    } else {
      setEventsMarkedForReminder((prev) => [...prev, event]);
    }
  };

  const registerEvent = (event: EventItem) => {
    const eventId = event.id || event.title;
    // If already registered, do nothing
    if (isRegistered(eventId)) {
      return;
    }

    // Move to registered events
    setRegisteredEvents((prev) => [...prev, event]);

    // Automatically remove from reminder list if it was previously added to reminders
    setEventsMarkedForReminder((prev) =>
      prev.filter((e) => e.id !== eventId && e.title !== event.title)
    );
  };

  const removeReminder = (id: string) => {
    setEventsMarkedForReminder((prev) =>
      prev.filter((e) => e.id !== id && e.title !== id)
    );
  };

  return (
    <EventStateContext.Provider
      value={{
        eventsMarkedForReminder,
        registeredEvents,
        addReminder,
        toggleReminder,
        registerEvent,
        isReminder,
        isRegistered,
        removeReminder,
      }}
    >
      {children}
    </EventStateContext.Provider>
  );
};

export const useEventState = (): EventStateContextType => {
  const context = useContext(EventStateContext);
  if (!context) {
    throw new Error("useEventState must be used within an EventStateProvider");
  }
  return context;
};
