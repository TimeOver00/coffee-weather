# Coffee Weather ☕

A small full-stack app that checks the weather for a city and tells you whether it's a good day to grab a coffee on a terrace.

Built as a learning project to practice **FastAPI** (Python) on the backend and **React** on the frontend.

## Features

- Look up the current weather for any city (powered by the OpenWeatherMap API)
- A simple scoring rule (temperature, wind, rain/snow/storm) decides if it's a good day for an outdoor coffee
- Results and reasons are shown in French, with conditions translated regardless of what the weather API returns
- The UI reacts to the weather: animated sun/moon, drifting clouds, falling rain or snow, lightning flashes, and a day/night aware background

## Tech stack

- **Backend**: FastAPI, httpx (async HTTP client), Pydantic
- **Frontend**: React, TypeScript, Vite, Framer Motion

## Project structure

```
coffee-weather/
├── backend/   # FastAPI app
└── frontend/  # React + Vite app
```

## Getting started

### Backend

```bash
cd backend
python -m venv .venv
./.venv/Scripts/activate   # Windows
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and add your [OpenWeatherMap API key](https://openweathermap.org/api):

```
OPENWEATHER_API_KEY=your_api_key_here
```

Run the server:

```bash
./.venv/Scripts/python.exe -m uvicorn app.main:app --port 8000
```

The API is now available at `http://localhost:8000` (docs at `/docs`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app is now available at `http://localhost:5173`.

## API

### `GET /weather?city={city}`

Returns the current weather for a city plus a coffee verdict.

```json
{
  "city": "Montréal",
  "country": "CA",
  "temp": 18.1,
  "feels_like": 17.4,
  "condition": "Clear",
  "description": "ciel dégagé",
  "wind_speed": 6.7,
  "is_day": true,
  "good_day": false,
  "reasons": ["Il y a du vent (6.7 m/s), ça risque d'être inconfortable."]
}
```
