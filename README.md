# Git Server

## Description

This project provides a simple Express TypeScript API for interacting with the GitHub API. It allows you to retrieve user profiles, repositories, and create issues.

## Features

- Retrieve GitHub user profile information
- List user repositories
- Get details for a specific repository
- Create a new issue in a repository

## Technologies Used

- Node.js
- Express
- TypeScript
- Axios
- dotenv
- Swagger

## Prerequisites

- Node.js (>=16)
- npm or yarn
- A GitHub account
- A personal access token from GitHub with the `repo` scope (for creating issues)

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Configure environment variables:**

    - Create a `.env` file in the root directory.
    - Add the following variables:

      ```
      GITHUB_TOKEN=<your_github_token>
      GITHUB_USERNAME=<your_github_username> #Optional
      PORT=3001 #Optional
      BASE_URL=https://git-server-lo5u.onrender.com #Optional
      ```

      Replace `<your_github_token>` with your GitHub personal access token.
      Replace `<your_github_username>` with your GitHub username. If not defined the default is `AshwiniParaye1`.
      `PORT` and `BASE_URL` are optional and have default values if not provided.

4.  **Run the application:**

    ```bash
    npm run start # or yarn start
    ```

    The server will start at `http://localhost:3001` (or the port specified in your `.env` file).

## API Endpoints

### 1. Get Welcome Message

- **Endpoint:** `GET /`
- **Description:** Returns a welcome message.
- **Response:**

  ```json
  {
    "message": "Welcome to Express + TypeScript Server"
  }
  ```

### 2. Get GitHub User Profile and Repositories

- **Endpoint:** `GET /github`
- **Description:** Retrieves the GitHub user profile and a list of their repositories.
- **Response:**

  ```json
  {
    "profile": {
      "login": "AshwiniParaye1",
      "id": 123456,
      "avatar_url": "https://avatars.githubusercontent.com/u/...",
      "html_url": "https://github.com/AshwiniParaye1",
      "name": "Ashwini Paraye",
      "public_repos": 10,
      "followers": 5,
      "following": 2
    },
    "repositories": [
      {
        "id": 789012,
        "name": "my-repo",
        "full_name": "AshwiniParaye1/my-repo",
        "html_url": "https://github.com/AshwiniParaye1/my-repo",
        "description": "A sample repository",
        "stargazers_count": 3,
        "watchers_count": 2,
        "forks_count": 1,
        "language": "TypeScript",
        "created_at": "2023-01-01T00:00:00Z",
        "updated_at": "2023-01-05T00:00:00Z"
      }
    ]
  }
  ```

### 3. Get Repository Details

- **Endpoint:** `GET /github/:repoName`
- **Description:** Retrieves detailed information about a specific repository.
- **Parameters:**
  - `repoName`: The name of the repository.
- **Response:**

  ```json
  {
    "id": 789012,
    "name": "my-repo",
    "full_name": "AshwiniParaye1/my-repo",
    "html_url": "https://github.com/AshwiniParaye1/my-repo",
    "description": "A sample repository",
    "stargazers_count": 3,
    "watchers_count": 2,
    "forks_count": 1,
    "language": "TypeScript",
    "created_at": "2023-01-01T00:00:00Z",
    "updated_at": "2023-01-05T00:00:00Z"
  }
  ```

### 4. Create a New Issue

- **Endpoint:** `POST /github/:repoName/issues`
- **Description:** Creates a new issue in the specified repository. Requires a GitHub token with `repo` scope.
- **Parameters:**
  - `repoName`: The name of the repository.
- **Request Body:**

  ```json
  {
    "title": "My Issue Title",
    "body": "Issue description."
  }
  ```

- **Response:**

  ```json
  {
    "html_url": "https://github.com/AshwiniParaye1/my-repo/issues/1",
    "number": 1,
    "title": "My Issue Title",
    "state": "open",
    "body": "Issue description."
  }
  ```

## Swagger UI

The API documentation is available via Swagger UI at `/api-docs`.

## Deployment

Hosted on Render: [Live API](https://git-server-lo5u.onrender.com/)
