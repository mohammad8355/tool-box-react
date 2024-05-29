import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  rowGap: ".5em",
  alignItems: "center",
  padding: ".5em",
};
const cardStyle = {
  minWidth: "18rem",
  borderRadius: ".5em",
  backgroundColor: "#FFEDF8",
  color: "#CE6CB6",
  padding: ".5em",
  display: "flex",
  textWrap: "wrap",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
};
const formGroupStyle = {
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
const btnStyle = {
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: 500,
  fontFamily: "inherit",
  backgroundColor: "#FFEDF8",
  cursor: "pointer",
  margin: ".5em",
};
const labelStyle = {
  fontSize: "1.5em",
  color: "#242424",
  fontWeight: "bold",
};
const inputStyle = {
  width: "100%",
  padding: ".5em",
  border: "none",
  outline: "none",
  borderRadius: ".5em",
  backgroundColor: "#FFEDF8",
  fontSize: "1.5em",
  color: "#CE6CB6",
};
const errorStyle = {
  padding: ".5em",
  color: "red",
  textWrap: "break-word",
  backgroundColor: "#FFEDF8",
  borderRadius: ".5em",
};
function WeatherStatus() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <h1>Weather Status</h1>
      <div style={containerStyle}>
        <Form
          setIsLoading={setIsLoading}
          setData={setWeatherData}
          setError={setError}
        />
        {!error && !isLoading && <WeatherCard data={weatherData} />}
        {error ? (
          <div style={errorStyle}>{error}</div>
        ) : isLoading ? (
          <Loader />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
function WeatherCard({ data }) {
  let weatherData = data ? data.daily : null;
  return (
    <div style={cardStyle}>
      {weatherData ? (
        <>
          <p>timezone {data.timezone}</p>
          <h3>
            Max Temp {weatherData.temperature_2m_max[0]} c | Min Temp{" "}
            {weatherData.temperature_2m_min[0]}
          </h3>
          <p>
            <strong>sunrise</strong> {weatherData.sunrise[0]} |{" "}
            <strong>sunset</strong> {weatherData.sunset[0]}
          </p>
          <h3>
            WindSpeed {weatherData.wind_speed_10m_max[0]} km/h | windGust{" "}
            {weatherData.wind_gusts_10m_max[0]}
          </h3>
          <p>{/* <strong>{data.description}</strong> */}</p>
        </>
      ) : (
        "there is no data to show up"
      )}
    </div>
  );
}
function Loader() {
  return (
    <div>
      <h1>is Loading ... </h1>
    </div>
  );
}
function Form({ setData, setError, setIsLoading }) {
  const now = new Date().getDate().toString();
  const [city, setCity] = useState("london");
  const [Day, setDay] = useState(now);
  const key = "UKY2Y84DYTV6BDJ7HCD4UX3US";
  function handleSubmit(e) {
    e.preventDefault();
    if (city.length > 0 && Day.length > 0) {
      setIsLoading(true);
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
      fetch(url)
        .then((res) => res.json())
        .catch((err) => {
          console.error(err.message);
        })
        .then((data) => {
          const result = data.results[0];
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max,wind_gusts_10m_max&&start_date=${Day}&end_date=${Day}`;
          fetch(weatherUrl)
            .then((respon) => respon.json())
            .catch((error) => {
              setError(
                "some thing went wrong to connect with api please keep in touch with owner"
              );
              console.error(error);
            })
            .then((weatherData) => {
              setData(weatherData);
            })
            .catch((erro) => {
              setError(
                "some thing went wrong to connect with api please keep in touch with owner"
              );
              setIsLoading(false);
              console.error(erro);
            });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>City</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="city name like london"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Day</label>
        <input
          style={inputStyle}
          type="date"
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={btnStyle}>
        Search
      </button>
    </form>
  );
}
export default WeatherStatus;
