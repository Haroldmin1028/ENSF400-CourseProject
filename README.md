# RecipEasy

This project was originally done as a project for ENSF 400, the software industry practices class at the Shulich School of Engineering at the University of Calgary. This project aims to build a website that people can use to generate dynamic recipes with the help of AI.

## Directory
- [recipeasy](./recipeasy/) is the folder for the Next.js project that is integrated with supabase for storage.
    - [src/app](./recipeasy/src/app/) contains the main TypeScript code for the pages.
    - [src/components](./recipeasy/src/components/) conatains TypeScript components that are referenced by the pages.
    - [src/lib](./recipeasy/src/lib/) contains API code for supabase and mealDB.
    [public](./recipeasy/public/) contains mainly images.
- [gemini_api.py](./gemini_api.py) is the module for communication with Gemini, i.e. generating recipes, suggesting ingredient substitutes, explaining recipe steps, etc.