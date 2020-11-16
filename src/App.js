import React, { useState, useEffect } from "react";
import { AddGuestForm } from "./components/AddGuestForm/AddGuestForm";
import { EditGuestForm } from "./components/EditGuestForm/EditGuestForm";
import { GuestList } from "./components/GuestList/GuestList";

export const App = () => {
  const initialFormState = {
    id: null,
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  };

  const [guests, setGuests] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(initialFormState);

  useEffect(() => {
    setGuests([
      {
        id: 1,
        name: "Derk Jensen",
        street: "123 Main St.",
        city: "Chicago",
        state: "IL",
        zip: "12345",
        phone: "555-555-1234",
      },
    ]);
    // alert("useEffect fired");
  }, []); // here the [] is empty dependancy so it will load only one time

  const addGuest = (guest) => {
    guest.id = guests.length + 1;
    setGuests([...guests, guest]);
  };

  const deleteGuest = (id) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const editGuest = (guest) => {
    setEditing(true);

    setCurrentGuest({
      id: guest.id,
      name: guest.name,
      street: guest.street,
      city: guest.city,
      state: guest.state,
      zip: guest.zip,
      phone: guest.phone,
    });
  };

  const updateGuest = (id, updatedGuest) => {
    setEditing(false);

    setGuests(guests.map((guest) => (guest.id === id ? updatedGuest : guest)));
  };

  /** OLD WAY without using Hooks 
 *  const guestData = [
    {
      id: 1,
      name: "Lamees ad",
      street: "123 Main St.",
      city: "Chicago",
      state: "IL",
      zip: "12345",
      phone: "555-555-1234",
    },
    {
      id: 2,
      name: "Ahmad",
      street: "123 Main St.",
      city: "Chicago",
      state: "IL",
      zip: "12345",
      phone: "555-555-1234",
    },
  ];*/

  return (
    <div className="container">
      <h1>Please Sign My Guesbook</h1>
      <div className="row">
        <div className="col">
          <div>
            {editing ? (
              <div>
                <h2>Edit Guest</h2>
                <EditGuestForm
                  editing={editing}
                  setEditing={setEditing}
                  currentGuest={currentGuest}
                  updateGuest={updateGuest}
                />
              </div>
            ) : (
              <div>
                <h2>Sign In</h2>
                <AddGuestForm addGuest={addGuest} />
              </div>
            )}
          </div>
        </div>
        <div className="col">
          <h2>Guests</h2>
          <GuestList
            deleteGuest={deleteGuest}
            editGuest={editGuest}
            guests={guests}
          />
        </div>
      </div>
    </div>
  );
};
