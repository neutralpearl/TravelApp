# Viagem — A Travel App 

##Viagem is a single-page application *built for demonstration / portfolio purposes*.

The app integrates data parsed from the responses of four APIs to generate a trip summary card and PDF containing itinerary information input by the user.

### This project showcases the following front-end dev skills:
 - Use of **Express** as a back-end framework 
 - Use of **Fetch API** for web requests
 - Use of **Webpack** module bundler as a build tool, in concert with the following plugins:
   - **Babel**, to translate ES6 JavaScript into vanilla JS compatible with any browser
   - **Loaders**, to translate **Sass** stylesheets into vanilla CSS
   - **Minimizers**, to reduce file sizes of built assets for browser optimization
   - **Webpack Dev Server**, to view live updates during development
   - **dotenv**, to keep private information (like API keys) hidden from client view in production
 - Unit testing with **Jest**

## Contents

- [Project Requirements](#project-requirements)
- [Additional Features](#additional-features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Development Mode](#development-mode)


## Project Requirements
[(Back to top)](#contents)

This project was completed for the [Udacity Front End Web Developer Nanodegree Program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011). 

Criteria are listed in this [rubric](https://review.udacity.com/#!/rubrics/3636/view).
Some of the key requirements are:
- Retrieval of data from at least 3 APIs
- Implementation of service-workers for pre-caching 
- A countdown to the departure date for each trip
- Fully responsive styling

## Additional Features
[(Back to top)](#contents)

Beyond the minimum requirements listed above, I have implemented:
- Option to change the app "theme" (background image & color scheme)
- A default image to display on the trip card for cases where no photo exists for that city in Pixabay
- Validation of the user's travel dates
- Automatic reformatting of the input destination city into proper noun styling
- Animations during load time after adding a new trip
- Option to remove a trip
- Ability to add and edit key information in an itinerary for each trip
- Ability to view itinerary data in a one-page PDF display alongside the 5-day weather forecast for the trip destination (*Note that ability to print this PDF has not yet been implemented*)


## Dependencies
[(Back to top)](#contents)

To run this app, you'll need the following installed globally on your machine:
- [Node.js](https://nodejs.org/en/)
- [NPM](https://nodejs.org/en/)

Additional dependencies (build tools & plugins, all listed in [package.json](./package.json)) will be installed locally within the directory containing the project files.

## Installation
[(Back to top)](#contents)

1. Clone this repo into the directory of your choice:

```git clone https://github.com/neutralpearl/TravelApp.git```

2. From that directory, use the following command to initiate installation of each of the project dependencies listed in the package.json folder:

```npm install```

3. Obtain API keys / webservices permissions from:
- [Geonames](http://www.geonames.org/export/geonames-search.html)
- [Weatherbit Current Weather](https://www.weatherbit.io/api/weather-current)
- [Weatherbit 16-Day Forecast](https://www.weatherbit.io/api/weather-forecast-16-day)
- [Pixabay](https://pixabay.com/api/docs/)
.

4. From the 'src' folder for the project, create a new file named ".env". (Do not modify this filename!) In this new file, copy-paste the following, replacing the asterisks with your own API keys. (*Note that your key for Geonames is your username*!)

```GEONAMES_KEY=**************************```
```WEATHERBIT_KEY=**************************```
```PIXABAY_KEY=**************************```

3. Run the Express server by inputting this command into one terminal:

```npm run start```

The server will then start running on *port 3000*.

4. Open a 2nd terminal and build the production version of the app using this command;

```npm run build-prod```

5. View the live app

In a browser window (ideally in incognito mode), **navigate to [http://localhost:3000](http://localhost:3000)**.


## Development Mode
[(Back to top)](#contents)

If you'd like to make adjustments to this project and see the impact of those changes in real time, first start the server with:

```npm run start```

...otherwise the app will not be able to fetch your stored API key from the server.

Then, enter this command in a 2nd terminal:

```npm run build-dev```

This will launch the app using Webpack Dev Server on *port 4000*. **Navigate to [http://localhost:4000](http://localhost:4000) to view the app.**

Note that the dev server automatically reloads the app when changes are made to JS or CSS files within the project, but you will have to manually refresh the page in your browser to see any changes made to the src/client/views/index.html file.