// Import the API_KEY and ENDPOINT from a config file
import { API_KEY, ENDPOINT } from "./config.js";

// GET function that fetches data from the API endpoint and renders it on the page
export function get() {
  fetch(ENDPOINT, {
    method: "get",
    headers: {
      apikey: API_KEY, // Set the API key in the headers
    },
  })
    .then((e) => e.json()) // Parse the response as JSON
    .then((data) => {
      const t = document.querySelector("template").content; // Get the content of the template tag
      document.querySelector("main").innerHTML = ""; // Clear the main element's HTML
      data.forEach((wine) => {
        // Loop through the data
        const copy = t.cloneNode(true); // Clone the template
        copy.querySelector("h2").textContent = wine.name; // Set the wine name
        copy.querySelector("button.delete").addEventListener("click", () => {
          deleteWine(wine.id); // Add event listener to delete the wine
        });
        copy.querySelector("button.update").addEventListener("click", () => {
          patch(wine.id); // Add event listener to update the wine
        });
        document.querySelector("main").appendChild(copy); // Append the wine to the main element
      });
    });
}

// POST function that creates a new wine and sends it to the API endpoint
export function post() {
  const newWine = {
    name: "Peter's Wine",
    grapes: ["pinor lightblue"],
    year: 1986,
    type: "white",
    origin: {
      country: "Denmark",
      region: "Nordsjælland",
    },
    isGood: true,
  };

  fetch(ENDPOINT, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY, // Set the API key in the headers
    },
    body: JSON.stringify(newWine), // Set the request body as the new wine object in JSON format
  })
    .then((e) => e.json()) // Parse the response as JSON
    .then((e) => get()); // Fetch the updated data from the API and render it on the page
}

// DELETE function that deletes a wine from the API endpoint by ID
export function deleteWine(id) {
  fetch(ENDPOINT + "?id=eq." + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY, // Set the API key in the headers
    },
  })
    .then((e) => e.json()) // Parse the response as JSON
    .then((e) => get()); // Fetch the updated data from the API and render it on the page
}

// PATCH function that updates a wine from the API endpoint by ID
export function patch(id) {
  const updates = {
    name: "Ullas Wine",
    isGood: true,
  };

  fetch(ENDPOINT + "?id=eq." + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
      apikey: API_KEY, // Set the API key in the headers
    },
    body: JSON.stringify(updates), // Set the request body as the updated wine object in JSON format
  }).then((e) => e.json()); // Parse the response as JSON
}
