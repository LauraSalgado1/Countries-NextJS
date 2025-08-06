"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const possibleCountries = ["canada", "thailand", "spain"];

export default function CountryData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryIndex, setCountryIndex] = useState(1);

  const handleUpdateCountry = (index: number) => {
    setCountryIndex(index);
  };

  useEffect(() => {
    async function fetchData(query: string) {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${query}?fields=name,currencies,coatOfArms,flags`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setData(result[0]);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData(possibleCountries[countryIndex]);
  }, [countryIndex]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {possibleCountries.map((country: string, index: number) => (
        <button key={country} onClick={() => handleUpdateCountry(index)}>
          {country}
        </button>
      ))}

      <div>{data.name.common}</div>

      {/* {Object.keys(data.currencies).map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {data.currencies[key]}
        </div>
      ))} */}

      <Image
        src={data.coatOfArms.svg}
        width={200}
        height={200}
        alt={data.name.common}
      />
      <Image
        src={data.flags.svg}
        width={200}
        height={200}
        alt={data.name.common}
      />
    </div>
  );
}
