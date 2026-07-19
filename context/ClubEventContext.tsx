import React, { createContext, useContext, useState } from "react";

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  venue: string;
  category?: string;
  organizer?: string;
  bannerImage?: string | null;
  gallery?: string[];
  createdAt?: string;
}

interface ClubEventContextType {
  clubEvents: ClubEvent[];
  addClubEvent: (eventData: Omit<ClubEvent, "id"> & { id?: string }) => ClubEvent;
  updateClubEvent: (event: ClubEvent) => void;
  deleteClubEvent: (id: string) => void;
  getClubEvents: () => ClubEvent[];
}

const ClubEventContext = createContext<ClubEventContextType | undefined>(
  undefined
);

export const ClubEventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clubEvents, setClubEvents] = useState<ClubEvent[]>([]);

  const addClubEvent = (
    eventData: Omit<ClubEvent, "id"> & { id?: string }
  ): ClubEvent => {
    const newEvent: ClubEvent = {
      ...eventData,
      id:
        eventData.id ||
        `club-evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: eventData.createdAt || new Date().toISOString(),
    };

    setClubEvents((prev) => [newEvent, ...prev]);
    return newEvent;
  };

  const updateClubEvent = (updatedEvent: ClubEvent) => {
    setClubEvents((prev) =>
      prev.map((evt) => (evt.id === updatedEvent.id ? updatedEvent : evt))
    );
  };

  const deleteClubEvent = (id: string) => {
    setClubEvents((prev) => prev.filter((evt) => evt.id !== id));
  };

  const getClubEvents = () => clubEvents;

  return (
    <ClubEventContext.Provider
      value={{
        clubEvents,
        addClubEvent,
        updateClubEvent,
        deleteClubEvent,
        getClubEvents,
      }}
    >
      {children}
    </ClubEventContext.Provider>
  );
};

export const useClubEvents = (): ClubEventContextType => {
  const context = useContext(ClubEventContext);
  if (!context) {
    throw new Error("useClubEvents must be used within a ClubEventProvider");
  }
  return context;
};
