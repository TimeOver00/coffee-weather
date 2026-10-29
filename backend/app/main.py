import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.config import settings
from app.coffee_score import evaluate_coffee_day

OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

app = FastAPI(title="Coffee Weather")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


class CoffeeWeatherResponse(BaseModel):
    city: str
    country: str
    temp: float
    feels_like: float
    condition: str
    description: str
    wind_speed: float
    is_day: bool
    good_day: bool
    reasons: list[str]


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/weather", response_model=CoffeeWeatherResponse)
async def get_weather(city: str) -> CoffeeWeatherResponse:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            OPENWEATHER_URL,
            params={
                "q": city,
                "appid": settings.openweather_api_key,
                "units": "metric",
                "lang": "fr",
            },
        )

    if response.status_code == 404:
        raise HTTPException(status_code=404, detail=f"Ville '{city}' introuvable.")
    if response.status_code != 200:
        raise HTTPException(status_code=502, detail="Erreur lors de l'appel à l'API météo.")

    data = response.json()
    condition = data["weather"][0]["main"]
    is_day = data["weather"][0]["icon"].endswith("d")
    good_day, reasons = evaluate_coffee_day(
        temp=data["main"]["temp"],
        condition=condition,
        wind_speed=data["wind"]["speed"],
    )

    return CoffeeWeatherResponse(
        city=data["name"],
        country=data["sys"]["country"],
        temp=data["main"]["temp"],
        feels_like=data["main"]["feels_like"],
        condition=condition,
        description=data["weather"][0]["description"],
        wind_speed=data["wind"]["speed"],
        is_day=is_day,
        good_day=good_day,
        reasons=reasons,
    )
