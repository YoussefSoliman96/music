# VibeUs

## Table of content:

- Project Description
- Stack and Frameworks
- Features
- Dependencies
- Instructions

## Project Description:

### Course:

CS50's Web Programming with Python and JavaScript (CS50W)

### Theme:

This project allows users to either create a room or join other user's room where they all can listen to music together and control what's happening according to their liking using customized settings

### Overview:

VibeUs is a control room app for spotify where only the Host has access to room settings and can decide whether guests can pause, play or skip songs.
Host can also decide how many votes are required to skip a song.

## Stack and Frameworks:

This project was developed using:

- Frontend: HTML, CSS and Javascript
- Backend: Python
- Frameworks: Django, REST, Material UI

## Features:

- Authentication
- Authorization
- REST API
- Spotify API

## Code Style:

- Prettier
- Camel Case

## Dependencies:

- "@babel/core": "^7.23.2",
- "@babel/preset-env": "^7.23.2",
- "@babel/preset-react": "^7.22.15",
- "babel-loader": "^9.1.3",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "webpack": "^5.89.0",
- "webpack-cli": "^5.1.4"

## Instructions:

- install python3
- install pip3
- pip3 install django
- pip3 install django djangorestframework
- django-admin startproject api
- django-admin startapp api
- Go to installed apps folder > settings > installed apps >
  'api.apps.ApiConfig',
  'rest_framework',
- add to project urls file:
  path('api/', include('api.urls')),
- make app urls file and add [homepage] to it:
  path('', views.RoomView.as_view()),
- python3 manage.py makemigrations
- python3 manage.py migrate
- python3 manage.py runserver
- make serializer.py file inside api
- setup serializer
- edit app urls file and add [.as_view()] to the homepage path:
  path('', views.RoomView.as_view()),

- django-admin startproject frontend
- make these folders inside frontend:
  - src
    - src/components
  - static
    -static/css
    -static/frontend
    -static/images
  - templates

**Inside the frontend folder [React Integration Using Webpack & Babel]**

- install npm
- install these packages using npm:

  - npm init -y
  - npm i webpack webpack-cli --save-dev
  - npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
  - npm i react react-dom --save-dev
  - old material ui
    - npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
    - npm install @mui/icons-material --legacy-peer-deps
  - material ui V5
    - npm install @mui/material @emotion/react @emotion/styled
    - npm install @mui/icons-material
  - npm install @babel/plugin-proposal-class-properties
  - npm install react-router-dom

- make the configuration scripts, make these files inside frontend folder:

  - babel.config.json --> script: https://github.com/YoussefSoliman96/vibeus/blob/main/frontend/babel.config.json

  - webpack.config.js --> script: https://github.com/YoussefSoliman96/vibeus/blob/main/frontend/webpack.config.js

  - add these 2 scripts to package.json --> script: https://github.com/YoussefSoliman96/vibeus/blob/main/frontend/package.json
    - "dev": "webpack --mode development --watch",
    - "build": "webpack --mode production"

- make index.js file inside src folder
  - src/index.js
- make index.html inside frontend/templates folder and add HTML boilerplate into it
  - templates/index.html
- add "load static" and add script tags to index.html
- render index.html inside views.py in frontend folder
- make urls.py file inside frontend folder
- add to project urls file:
  path('', include('frontend.urls')),
- Go to installed apps folder > settings > installed apps >
  'frontend.apps.FrontendConfig',

**Make the first React component**

- make App.js file inside frontend/src/components
- make export default class extends Component
- src/index.js import App from "./components/App";
- npm run dev
