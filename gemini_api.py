from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import dotenv
from google import genai

'''
HOW TO USE THIS API FROM THE FRONTEND:
1. Make sure you create a .env file in the same location as this Python file. Within this .env file add your personal Gemini API key:
    GEMINI_API_KEY=[YOUR API KEY]

2. Make sure you have all Python libraries installed as imported above

3. Run this Python file on your computer using the command "uvicorn gemini_api:app --reload"

4. When you need to send a prompt to the AI, use an HTTP **POST** sent to "http://localhost:8000/gemini_api/generate_prompt"

5. When sending a POST, make sure to add an HTTP header with key 'Content-Type' and value 'application/json' as the API needs things packed in JSON format

6. Each prompt sent to this API needs the ENTIRE recipe as well as the actual question sent to it, all in one string. We cannot store recipe context in this API
so you need to attach the recipe details every time (following REST API best practices). The context limit of the AI model is more than big enough for this

7. For the actual body/content of the POST, format your prompt in JSON form with the key "prompt":
    Example/
        {
            "prompt": "[USER-INPUTTED PROMPT HERE]"
        }

  Where the "user-inputted prompt" is the recipe in question followed by the actual user-inputted question, all stored in one long string

8. The API will automatically reply to the frontend with the response from the AI packed in JSON format as follows:
    {
        "answer": "[AI REPLY]"
    }
  
  Which you can extract and display back onto the frontend.

'''

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

# Initialize the Gemini client (the environmment variable - API key - will automatically be detected) and AI model
client = genai.Client()
GEMINI_MODEL = "gemini-3-flash-preview"

# Define the Pydantic BaseModel to establish expectations for incoming JSON payload
class PromptRequest(BaseModel):
    prompt: str = "This is a default prompt, if you receive this, reply with \"Sorry, your request couldn't be processed. Can you try sending it again?\""

# Define a route like that the front end can use to request a prompt to be processed
@app.post('/gemini_api/generate_prompt') # When a POST request is sent to the route '/gemini_api/generate_prompt'
async def generate_prompt(request_data: PromptRequest): # Any incoming data should be validated against the prompt standards
    try:
        prompt = request_data.prompt
        response = client.models.generate_content(
            model = GEMINI_MODEL,
            contents = [prompt]
        )

        # Process the response and send it back to the frontend
        return {"answer": response.text}
    except Exception as e:
        return {"answer": "Sorry, your request couldn't be processed. Can you try sending it again?"}