## Snippet Garden
__An API for managing code snippets with a clean interface, user authentication, and syntax highlighting__

**Note:** Currently, Snippet Garden supports syntax highlighting for the following programming languages:

- JavaScript
- Python
- Java
- Go
- Rust
- Swift
- TypeScript

Please ensure that your code snippets align with these supported languages for optimal highlighting.


### Getting Started
Follow these steps to get started with Snippet Garden:
1. **Clone the Repository:**
   
   ```bash 
   git clone https://github.com/ibrahimhasnat/snippet-garden.git
   ```
2. **Install Dependencies:**
    ```bash
    npm install
    ```
3. **Set Up Environment Variables:**
   1. Create a `.env` file.
   2. Add your **MongoDB URI** and **JWT Secret**.
   
      ```bash
      MONGO_URI=your_mongo_db_uri
      JWT_SECRET=your_jwt_secret      
      ```
4. **Run the Server:**
   ```bash
   npm start
   ```

### Usage
- **Register:** Create an account to start managing your code snippets.
- **Log In:** Log in with your credentials to access your personalized snippet space.
- **Add Snippets:** Create, edit, and delete code snippets as needed.
- **Filter by Language:** Retrieve snippets based on the programming language.

### API Endpoints
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in with existing credentials.
- **GET /api/snippets:** Get all snippets.
- **POST /api/snippets:** Create a new snippet.
- **PUT /api/snippets/:id:** Update an existing snippet.
- **DELETE /api/snippets/:id:** Delete a snippet.
- **GET /api/snippets/:language:** Get snippets filtered by programming language.

### Create a New Snippet
```json
POST /api/snippets
Content-Type: application/json
Authorization: YOUR_AUTH_TOKEN

{
  "title": "Example Snippet",
  "code": "console.log('Hello, Snippet Garden!');",
  "language": "javascript",
  "tags": ["example", "beginner"], // Optional field
  "category": "General" // Optional field
}
```

**Note:** For all snippets-related operations, please replace `YOUR_AUTH_TOKEN` with the valid authentication token obtained after logging in. The `Authorization` header is required to ensure secure access to snippet-related endpoints.