# Chat Application Backend

This repository contains the backend code for a chat application. Follow the instructions below to set up the project on your local machine.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/)

### Installation

1. **Clone the Repo**

    ```bash
    git clone https://github.com/yourusername/chat-app-backend.git
    ```

2. **Navigate to the Backend Directory**

    ```bash
    cd chat-app-backend/backend
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Create a .env File**

    In the `backend` directory, create a `.env` file and add the following environment variables:

    ```plaintext
    DATABASE_URL=your_mongodb_connection_string
    PORT=your_port_number
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    TOKEN_EXPIRE=token_expiry_duration
    ```

    Replace the placeholder values with your actual configuration details.

### Running the Server

Start the development server with:

```bash
npm run dev
