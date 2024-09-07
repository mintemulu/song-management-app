# Song Management App

## Description
The **Song Management App** is a full-stack application that allows users to manage songs by adding, editing, deleting, and playing audio files. The app features a React frontend with state management using Redux Toolkit and asynchronous side effects handled by Redux Saga. Mock Service Worker (MSW) is used to mock backend API requests during development, and Emotion is used for styling.

---

## Technologies Used

- **ReactJS**: For building the user interface.
- **Redux Toolkit**: For state management.
- **Redux-Saga**: For handling side effects and API calls.
- **Emotion and Styled System**: For styling the application.
- **Mock Service Worker (MSW)**: For mocking API requests and handling them in development.


## Features
- Display a list of songs with full details (title, artist, album).
- Add new songs to the list with proper form validation.
- Edit existing songs, including title, artist, and album information.
- Delete songs from the list.

## Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/mintemulu/song-management-app.git
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the application**:
   ```sh
   npm start
   ```

The application will be available at `http://localhost:3000`.