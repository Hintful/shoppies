# Shoppies
A simple application that uses [OMDB API](http://www.omdbapi.com) to allow users to search through movie database, nominate their top choices, and submit their nominations.  

### Live Demo
Live demo of the application is available on my website at [https://kurtchoi.dev/shoppies](https://kurtchoi.dev/shoppies).

## Setup

Use `npm install` command from root folder to install dependencies.

### Adding API Key  
You can get your OMDB API Key from the [website](http://www.omdbapi.com/apikey.aspx).  
There are two ways to add API key to the project.

* **Adding API Key Locally**  
Create a file named `.env` in the root folder with the following line: `REACT_APP_OMDB_API_KEY=your_api_key`.
This will allow the environment variable to be loaded when building.

* **Using GitHub Secrets/Action**  
There will be a pre-made GitHub action named **Auto Deploy** in `.github/workflows` folder.
To utilize this, you can simply fork this project and add a repository secret named `REACT_APP_OMDB_API_KEY` and put your OMDB API key for its value.

## Usage

Simply use `npm start` command to start up the server.  
The project will be live locally at `http://localhost:3000`.
