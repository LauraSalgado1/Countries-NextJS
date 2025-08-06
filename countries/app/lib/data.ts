export async function fetchCountryData(query: string) {
  try {
    const data = await fetch(
      `https://restcountries.com/v3.1/name${query}?fields=name,currencies,coatOfArms,flags`
    );
    const [countryData] = await data.json();

    return {
      countryData,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch country data.");
  }
}
