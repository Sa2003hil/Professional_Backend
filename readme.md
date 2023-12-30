# YouTube Clone

## Overview

This is a YouTube clone project, aiming to replicate some of the core features of the popular video-sharing platform. Built with MERN Stack, this project provides a hands-on learning experience for developers interested in web development.

## Features

- **User Authentication:** Sign up, log in, and authenticate users to manage their profiles.
- **Video Upload:** Upload and share videos seamlessly.
- **Video Playback:** Watch videos with a user-friendly video player.
- **Comments and Likes:** Engage with the community by leaving comments and liking videos.
- **Responsive Design:** Ensure a consistent user experience across different devices.

## Tech Stack

- **Frontend:** [List your frontend technologies, e.g., React.js, Next.js]
- **Backend:** [List your backend technologies, e.g., Node.js, Express.js]
- **Database:** [Specify your database, e.g., MongoDB]
- **Authentication:** [Specify your authentication method, e.g., JWT]

## NOTES

HTTP Headers
- metadata --> key value sent along with the request and response

(caching , authentication , manage states)

### x-Prefix  -> 2012 (x - deprecated)
- Request Headers ---> from client
- Response Headers ---> from server
- Representation Headers ---> ecoding / compresion
- Payload Headers ---> data


#### Most Common Headers
- Accept : application/json
- User-Agent : browser / device
- Content-Type 
- Authorization : Bearer token (JWT)
- Cache-Control : It is used to set the time for which the response can be cached.
- Cookie


### HTTP Status Codes
- 1xx : Informational
- 2xx : Success
- 3xx : Redirection
- 4xx : Client Error
- 5xx : Server Error

Most common status codes
- 200 : OK
- 201 : Created
- 204 : No Content
- 304 : Not Modified
- 400 : Bad Request
- 401 : Unauthorized
- 403 : Forbidden
- 404 : Not Found
- 500 : Internal Server Error
- 502 : Bad Gateway
- 503 : Service Unavailable
- 504 : Gateway Timeout





## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/youtube-clone.git
    ```

2. **Install dependencies:**

    ```bash
    cd youtube-clone
    npm install
    ```

3. **Configure the environment variables:**

    - Create a `.env` file based on `.env.example` and fill in the required details.

4. **Run the application:**

    ```bash
    npm start
    ```

5. **Visit [http://localhost:3000](http://localhost:3000) in your browser.**

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this project.

## License

This project is licensed under the [MIT License](LICENSE).
