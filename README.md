# RecipEasy

This project was originally done as a project for the course Software Engineering Industry Practices and Communication (ENSF 400) at the Schulich School of Engineering at the University of Calgary. This project aims to build a website that people can use to search for different recipes and ask questions specific to any recipes being viewed with the help of AI.

## Directory
- [recipeasy](./recipeasy/) is the folder for the Next.js project that is integrated with supabase for storage.
    - [src/app](./recipeasy/src/app/) contains the main TypeScript code for the pages.
    - [src/components](./recipeasy/src/components/) conatains TypeScript components that are referenced by the pages.
    - [src/lib](./recipeasy/src/lib/) contains API code for supabase and mealDB.
    [public](./recipeasy/public/) contains mainly images.
- [gemini_api.py](./gemini_api.py) is the module for communication with Gemini, i.e. generating recipes, suggesting ingredient substitutes, explaining recipe steps, etc.

## How to run this project
### Python API setup
1. Make sure you create a .env file in the same directory as this Python file. Within this .env file add the following line with your personal Gemini API key:
    ```GEMINI_API_KEY=[YOUR API KEY]```

2. Install all required Python libraries with the following command pasted into a terminal running in the same directory as the Python file:
    ```pip install fastapi pydantic python-dotenv google-genai uvicorn```

3. Run this Python file on your computer using the command ```uvicorn gemini_api:app --reload```. This will keep the Python API running in the background so that it can process any requests made to the Gemini LLM

### Frontend setup
1. Open another terminal, **ensuring that the terminal running the Python API stays open**, and navigate to ```ENSF400-CourseProject/recipeasy```

2. In this terminal, first run ```npm install```

3. Afterwards, run ```npm run dev``` which will run our frontend on the localhost.

4. Open your desired web browser and type in ```http://localhost:3000```

5. You will be prompted to log in or sign up. Create an account if you don't have one.

6. Once logging in, you can now search for recipes and edit your account.
