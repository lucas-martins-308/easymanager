import { useEffect, useState } from "react";

export default function CountrySelect({ value, onChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/countries")
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} required>
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}
