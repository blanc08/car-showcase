import { CarProps } from "@/types";

export async function fetchCars() {
    const headers = {
        "X-RapidAPI-Key": "51c1b8d776msh53b23e460d2fd3bp12fb66jsn3986af511a86",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    };

    const response = await fetch(
        "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera",
        {
            method: "GET",
            headers: headers,
        }
    );

    const result = await response.json();

    return result;
}

export function generateCarImageUrl(car: CarProps, angle?: string) {
    const url = new URL("https://cdn.imagin.studio/getimage");

    const { make, year, model } = car;
    url.searchParams.append("customer", "hrjavascript-mastery"); // can be expired
    url.searchParams.append("make", make);
    url.searchParams.append("modeFamily", model.split(" ")[0]);
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("modelYear", `${year}`);
    url.searchParams.append("angle", `${angle || ""}`);

    return `${url}`;
}

export function calculateCarRent(city_mpg: number, year: number): string {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}
