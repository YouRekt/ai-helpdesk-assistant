# AI Helpdesk Form Assistant

This application uses a generative AI (Google's Gemini LLM) to assist users in filling out a helpdesk form through a chat interface. The backend is built with Hono and Bun, and the frontend uses React (Vite) with TypeScript and Tailwind CSS (via shadcn/ui components). The entire application is containerized using Docker.

## Project Overview

The primary goal of this application is to provide a conversational AI that guides users through the process of completing a helpdesk support form. The AI asks questions sequentially to gather the necessary information, and the form on the user's screen updates in real-time as data is extracted from the conversation.

-   **AI-Powered Chat:** Users interact with a Gemini-based AI assistant.
-   **Automated Form Population:** Information provided by the user in the chat is extracted and used to fill the helpdesk form fields.
-   **Real-time Form View:** Users can see the form being updated as the conversation progresses.

## Project Structure

```bash
.
└── ai-helpdesk-assistant/
    ├── backend/        # Hono backend application
    │   ├── src/
    │   │   └── ...
    │   └── ...
    ├── frontend/       # React frontend application
    │   ├── src/
    │   │   └── ...
    │   └── ...
    ├── shared/
    │   └── schemas/    # Shared schemas between frontend and backend
    │       └── ...
    ├── Dockerfile
    ├── .dockerignore
    └── README.md
```

## Prerequisites

-   [Docker](https://www.docker.com/get-started) installed and running.
-   [Git](https://git-scm.com/downloads) installed.
-   A Google Gemini API Key.

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/YouRekt/ai-helpdesk-assistant.git
cd ai-helpdesk-assistant
```

### 2. Set up Environment Variables

The application requires a Google Gemini API key.

Create a `.env` file in the root of the project directory (`ai-helpdesk-assistant/.env`):

```env
GEMINI_API_KEY=<your_gemini_api_key>
```

Alternatively you can supply the key as a docker command argument.

### 3. Build and Run with Docker

The application is designed to be easily run as a Docker container.

#### Build the Docker Image:

Navigate to the root directory of the cloned project (where the `Dockerfile` is located). Execute the following command to build the Docker image:

```bash
docker build --pull -t ai-helpdesk-app
```

The `-t` flag lets us specify a name for the image, and `--pull` tells Docker to automatically download the latest version of the base image (`oven/bun`).

#### Run the Docker Container:

After the image is successfully built, you can run the docker container.

If you created the `.env` file with the Google Gemini API key run:

```bash
docker run -d -p 3000:3000 --env-file .env ai-helpdesk-app
```

If you haven't done that run:

```bash
docker run -d -p 3000:3000 -e GEMINI_API_KEY=<your_gemini_api_key> .env ai-helpdesk-app
```

It will be run in detached mode (`-d`) and map the container's port 3000 to your local machine's port 3000 (`-p 3000:3000`).

### 4. Accessing the Application

Once the Docker container is running, open your preferred web browser and navigate to:

[http://localhost:3000](http://localhost:3000)

## How to Use the Application

The application provides a user-friendly interface for interacting with the AI assistant and filling out the helpdesk form.

1.  **Initial View:**

    -   You will be greeted by an information card explaining the application and an AI assistant chat window.
    -   An empty helpdesk form will also be visible.
    -   The AI assistant will send an initial greeting message.

2.  **Interacting with the AI:**

    -   Type your messages into the input field at the bottom of the chat window.
    -   Press the "Send" button or hit the `Enter` key to send your message.
    -   The AI will ask you questions one by one to collect the necessary information for the form. The fields are:
        -   First Name (string, max 20 characters)
        -   Last Name (string, max 20 characters)
        -   Email (string, valid email format)
        -   Reason for Contact (string, max 100 characters after potential summarization)
        -   Urgency (integer, range 1-10)

3.  **Automatic Form Population:**

    -   As you provide information in the chat, the system will automatically attempt to extract the relevant data after each AI response (or user message).
    -   The extracted information will populate the corresponding fields in the helpdesk form displayed on the screen. You can see these updates in real-time.

4.  **Completing and Submitting:**
    -   Once the AI assistant has gathered all the required information, it will notify you that the form is ready.
    -   Review the information populated in the form fields.
    -   If all details are correct, click the `Submit` button on the helpdesk form.
    -   For this demonstration, submitting the form will display a toast notification with the captured form data.

## Development Environment (Manual Setup - Optional)

If you prefer to run the frontend and backend services separately without Docker (e.g., for development purposes), follow these steps.

**Prerequisites:**

-   [Bun](https://bun.sh/) installed globally.

### Backend Setup

The backend is a Hono application.

1.  Navigate to the backend directory:

```bash
cd backend
```

2.  Create a local environment file named `.env` in the `backend` directory (`backend/.env`):

```env
GEMINI_API_KEY=<your_gemini_api_key>
```

3. Install dependencies:

```bash
bun install
```

4.  Run the backend development server:

```bash
bun dev
```

The backend server will start, typically on `http://localhost:3000`.

### Frontend Setup

The frontend is a React application built with Vite.

1.  Navigate to the frontend directory:

```bash
cd frontend
```

2.  Install dependencies:

```bash
bun install
```

3.  Run the frontend development server:

```bash
bun dev
```

The Vite development server will start, usually on a different port (e.g., `http://localhost:5173`). The console output will indicate the exact address.
API requests from the frontend to `/api/...` will be automatically proxied to the backend server running on `http://localhost:3000`, as configured in `frontend/vite.config.ts`.

### Shared Code

The `shared/` directory contains Zod schemas that are used for data validation and type consistency across both the frontend and backend applications. This ensures that data structures for chat messages, history, and form values are coherent throughout the system.

## Technology Stack

-   **AI Model:** Google Gemini 2.0 Flash.
-   **Backend Framework:** Hono with Bun runtime.
-   **Frontend Framework:** React (with Vite and TypeScript).
-   **UI Components:** shadcn/ui, Tailwind CSS.
-   **Frontend State Management:** Zustand.
-   **Form Handling (Frontend):** React Hook Form with Zod for validation.
-   **Runtime & Build Tool:** Bun.
-   **Containerization:** Docker.

---
