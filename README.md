# music

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

  - babel.config.json --> script: https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/babel.config.json

  - webpack.config.js --> script: https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/webpack.config.js

  - add these 2 scripts to package.json --> script: https://github.com/techwithtim/Music-Controller-Web-App-Tutorial/blob/main/Tutorial%201%20-%204/frontend/package.json
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
