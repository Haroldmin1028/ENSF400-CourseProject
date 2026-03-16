from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pydantic
import os
import dotenv
from google import genai

# Load environment variables (Gemini API key) from the .env file (each person neeeds to create their own and add their own Gemini API key)
dotenv.load_dotenv()    

# Initialize FastAPI
# FastAPI is used here so that our API can be communicated with (from the front end) like a web server
# Allows us to create specific "routes" (like localhost/api/generate) that can be accessed with HTTP requests which has
# specific code related to it that will execute specific functionality (like processing a Gemini prompt)
app = FastAPI()

# Configure CORS (cross origin resource sharing) so that only our NextJS frontend can access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Assuming that we're using port 3000 in NextJS
    allow_credentials=True,
    allow_methods=["*"], # Allow all HTTP methods
    allow_headers=["*"]
)

# Initialize the Gemini client (the environmment variable - API key - will automatically be detected)
client = genai.Client()

# TODO: Use an async func to keep this script looping waiting for Gemini API requests from the front end
# TODO: Use pydantic to handle incoming HTTP requests and extract prompt
    # Maybe use a route like "gemini_api/generate_prompt" that the front end can use to request a prompt to be processed
# TODO: Based on incoming prompt, write HTTP post logic to send back to the frontend
