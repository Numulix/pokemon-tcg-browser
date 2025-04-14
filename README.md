# Pokémon TCG Card Browser & Set Explorer

A web application built with React and TypeScript to browse and search for Pokémon Trading Card Game cards and explore different card sets, using data from the TCGdex API.

## Current Features

* **Card Browser Page (`/`):**
    * Search for Pokémon cards by name (supports partial matching).
    * Displays a grid of matching cards including their image, name, and set name.
    * Handles loading and error states during search.
    * Uses TanStack Query for efficient data fetching and caching.
* **Sets List Page (`/sets`):**
    * Displays a list of all official Pokémon TCG sets.
    * Shows each set's logo, name, release date, and card counts.
    * Each set links to its dedicated detail page.
    * Uses TanStack Query for efficient data fetching and caching.
* **Single Set Page (`/set/:setId`):**
    * Displays detailed information for a specific set, identified by its ID in the URL.
    * Shows the set's logo, name, release date, and detailed card counts (official, total, holo, reverse if available).
    * Displays a grid of all cards belonging to that set, including their image, name, and card number (`localId`).
    * Includes a link to navigate back to the main sets list.
    * Uses TanStack Query for efficient data fetching and caching.
* **Routing:**
    * Uses React Router v7 (`createBrowserRouter`) for client-side navigation between pages.
    * Includes a shared layout component for consistent header/navigation and footer.

## Tech Stack

* **Frontend:** React, TypeScript
* **Routing:** React Router v7
* **Data Fetching/State Management:** TanStack Query (React Query) v4/v5
* **Styling:** Tailwind CSS
* **API:** TCGdex REST API (v2)
* **Build Tool:** Create Vite App

## Getting Started (Example)

1.  Clone the repository.
2.  Install dependencies: `npm install` or `yarn install`
3.  Run the development server: `npm start` or `yarn start`

## TODO / Future Features

* **Card Image Expansion:** Allow users to click on a card image (in search results or set view) to see a larger version (e.g., in a modal or lightbox).
* **Reusable Card Component:** Refactor the card display logic into a reusable `<Card />` component to be used across different pages.
* **Infinite Scrolling:** Implement infinite scrolling for:
    * Card search results on the Card Browser page.
    * The list of cards on the Single Set page.
* **Layout Customization:** Add controls (e.g., buttons) to allow users to change the number of columns in the card/set grids.
* **Filtering:**
    * Add filters to the Card Browser (e.g., by Pokémon type, rarity, energy type, set).
    * Add filters/sorting to the Sets List (e.g., by release date, series).
* **Favorite Cards:** Implement functionality for users to mark/unmark cards as favorites. This might involve:
    * A visual indicator on cards.
    * A dedicated "Favorites" page or section.
    * State management (potentially using `localStorage` initially, or a backend).
* **User Authentication:** Add user accounts (login/signup) to persist favorites and potentially other user-specific data across sessions/devices. This would likely require a backend service.

