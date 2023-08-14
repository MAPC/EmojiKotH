# Muni Emoji 😎🗺️

## What is Muni Emoji?

Muni Emoji is a creative coding project developed at MAPC for internal community engagement and discussion over a fun light-hearted topic of international emoji day! This project covers the 101 municpalities within the MAPC region, providing a fun way to engage with others in the area and learn more fun facts about the region!

### See more here:

Medium Article: https://medium.com/dataservicesblog/introducing-mapc-muni-emoji-map-%EF%B8%8F-26ba02cdfa92
Web App: https://mapc.github.io/EmojiKotH/
Airtable Base: https://airtable.com/app7invLG3BPCqc6o/shrOfU8zyqpWmiB2e/tbltaZ0zK1spJ8rxr

## Technologies

- react
- d3.js
- react-bootstrap
- emoji-picker-react
- Airtable
- Styled-Components
- ts-particles

### Project Setup

The project is a single-page static site composed on two main components: `Map` and `Modal`. The backend is handled by a Airtable Base within the MAPC organization, which stores all changes uploaded by the users and stores records of the emojis and explanations provided.

The `Map` component is used for the primary rendering that faces the user. This component handles rendering the map from the municipality .geojson data as well as rendering the representative emojis for each municipality throughout the region. This component uses the Airtable library to retrieve the data through their HTTP request API functions. This `Modal` is also responsible for handling the UI and different juice effects (particles and hover effects) that are present throughout the project.

The `Modal` component is used as a form to allow the user to submit their emoji suggestions along with a short description of their choice. This component also uses the Airtable API to submit new data which is then rendered and updated on the `Map` component. This `Modal` was built using react-bootstrap and emoji-picker-react libraries to streamline the development process.

## Release Notes:

v1.4 Refactor `map` and emoji rendering to greatly improve rendering and reduce rendering, and Airtable data retrieval costs.<br>
v1.3 Performance changes, lazy load emoji `modal`, limit redundant re-renders, fix default inputs for users <br>
v1.2 Emoji Scale Juice, Bug Fixes, Screen Shake Juice <br>
v1.1 Emoji Particles Juice, Styling Changes, Performance Updates, Refactoring <br>
v1.0 `Map` works and displays inputs! <br>
