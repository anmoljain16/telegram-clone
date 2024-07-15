# Telegram Clone - React Assignment

## Project Overview
This project is a clone of the Telegram messaging application, developed as part of an assignment to demonstrate UI/UX skills and React expertise. The application supports both desktop and mobile views and includes functionalities such as night mode and search.

## Live Demo
You can view the live demo of the project [here](https://telegram.anmoljain.tech/).

## Features

- **Chat List and Chat Window:** Display list of chats and their messages.
- **Dark Mode:** Toggle between light and dark themes.
- **Responsive Design:** Adaptable for both desktop and mobile views.
- **Search Functionality:** Search through chats.
- **Custom Scrollbar:** Styled for better user experience.

## Technologies Used

- **ReactJS:** Core library for building the UI.
- **MUI (Material-UI):** Used for several UI components like buttons, icons, and text fields.
- **Axios:** For making API requests.
- **TailwindCSS:** For styling the components.

## Components Overview

### 1. ChatList

Displays the list of chats fetched from the API endpoint.

- **MUI Components Used:** None directly, but TailwindCSS is heavily used for styling.
- **Functionality:** Select a chat to view its messages in the ChatWindow.

### 2. ChatWindow

Displays messages for the selected chat.

- **MUI Components Used:**
    - `TextField`: For inputting new messages.
    - `IconButton`: For the send message button.
    - `SendIcon`: Icon used for the send button.
- **Functionality:** Fetches messages from the API, displays them, allows sending new messages, and scrolls to the latest message.

### 3. Drawer

Sidebar component that can be toggled open and closed.

- **MUI Components Used:** None.
- **Functionality:** Contains options to toggle dark mode and other future functionalities.

## Custom Scrollbar

The scrollbar has been customized for better UX, especially for the dark mode.

- **Styling:** TailwindCSS classes have been used to style the scrollbar.

## Dark Mode

Implemented dark mode to enhance user experience in low-light environments.

- **Styling:** Conditional TailwindCSS classes based on the dark mode state.
- **Functionality:** Toggles between light and dark themes using a state hook.

## Search Functionality

Implemented search functionality to filter through chats.

- **MUI Components Used:** `TextField` for the search input.
- **Functionality:** Filters chat list based on the input query.

## API Integration

- **Chat List API:** `https://devapi.beyondchats.com/api/get_all_chats?page=1`
- **Messages API:** `https://devapi.beyondchats.com/api/get_chat_messages?chat_id={chatId}`

Axios is used to make GET requests to these endpoints, and the responses are used to populate the ChatList and ChatWindow components.


## How to Run the Project Locally

### Clone the Repository
```bash
git clone https://github.com/anmoljain16/telegram-clone.git

cd telegram-clone
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The project will be available at `http://localhost:3000/`.




