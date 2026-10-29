RAINY_CONDITIONS = {"Rain", "Drizzle", "Thunderstorm", "Snow"}

MIN_GOOD_TEMP = 15.0
MAX_GOOD_TEMP = 28.0
MAX_GOOD_WIND_SPEED = 5.5  # m/s, ~20 km/h


def evaluate_coffee_day(temp: float, condition: str, wind_speed: float) -> tuple[bool, list[str]]:
    reasons = []

    if condition in RAINY_CONDITIONS:
        reasons.append(f"Il y a du {condition.lower()}, pas idéal pour une terrasse.")

    if temp < MIN_GOOD_TEMP:
        reasons.append(f"Il fait {temp:.1f}°C, un peu frais pour s'installer dehors.")
    elif temp > MAX_GOOD_TEMP:
        reasons.append(f"Il fait {temp:.1f}°C, un peu trop chaud pour profiter confortablement.")

    if wind_speed > MAX_GOOD_WIND_SPEED:
        reasons.append(f"Il y a du vent ({wind_speed:.1f} m/s), ça risque d'être inconfortable.")

    good_day = len(reasons) == 0
    if good_day:
        reasons.append("Temps clément, parfait pour un café en terrasse !")

    return good_day, reasons
