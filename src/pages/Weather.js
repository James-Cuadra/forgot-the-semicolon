import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardHeader, Card, Switch } from '@mui/material';
import MapPicker from 'react-google-map-picker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    width: 'fit-content',
    maxWidth: '75%',
    marginTop: '50px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  button: {
    '&:hover': {
      backgroundColor: '#005082'
    },
    marginBottom: '30px !important'
  },
  header: {
    marginBottom: '15px'
  },
  backButton: {
    marginTop: '20px',
    textDecoration: 'none',
    color: '#005082'
  }
});

const DefaultZoom = 10;
const DefaultLocation = { lat: 0, lng: 0 };

const Weather = () => {
  const classes = useStyles();
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(DefaultLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [isCelsius, setIsCelsius] = useState(true);

  const googleMapsApiKey = 'AIzaSyBO-mBpWOiMea0EH3j0FhecQW7J9FEknk4';

  const apiKey = '4VC9QTHSPFXW5L2F2VXUZJLWR';

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setLocation(defaultLocation);
    setZoom(DefaultZoom);
  }

  useEffect(() => {
    const fetchByGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }); // Set location object
            setDefaultLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }); // Set default location object
          },
          () => setDefaultLocation({ lat: 0, lng: 0 }) // Fallback
        );
      } else {
        setDefaultLocation({ lat: 0, lng: 0 }); // Fallback
      }
    };

    fetchByGeolocation();
  }, []);

  function temperatureConverter(valNum) {
    if (isCelsius) {
      valNum = parseFloat(valNum);
      const temp = (valNum - 32) / 1.8;
      return `${Math.round(temp * 10) / 10}°C`;
    } else {
      return `${valNum}°F`;
    }
  }

  const fetchWeatherByCoords = async (coords) => {
    setIsLoading(true);
    try {
      const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${coords.lat},${coords.lng}?&include=alerts?&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const alerts = []; // Initialize an array to store alerts

      // Logic to determine extreme conditions and push alerts
      if (data.days[0].temp > 95) {
        alerts.push({ description: 'Extreme Heat Warning' });
      }
      if (data.days[0].windspeed > 60) {
        alerts.push({ description: 'High Wind Warning' });
      }
      if (data.days[0].precip > 10) {
        alerts.push({ description: 'Heavy Rain Warning' });
      }
      if (data.days[0].snowdepth > 5) {
        alerts.push({ description: 'Heavy Snow Warning' });
      }
      if (data.days[0].visibility < 1) {
        alerts.push({ description: 'Low Visibility Warning' });
      }
      if (data.days[0].temp < 32) {
        alerts.push({ description: 'Freezing Temperatures Warning' });
      }

      // Update weatherData with alerts
      data.alerts = alerts;

      setWeatherData(data);
      setIsLoading(false);
    } catch (error) {
      setError('Error fetching weather data');
      setIsLoading(false);
    }
  };

  const parseDate = (datetime) => {
    const date = new Date(datetime);
    return date.toDateString();
  };

  return (
    <div className={classes.container}>
      <CardHeader title="Week 3: Weather App" className={classes.header} />
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: '500px', width: '500px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={googleMapsApiKey}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleResetLocation}>
        Reset Location
      </Button>

      <TextField
        label="Coordinates"
        value={`${location.lat}, ${location.lng}`} // Display the coordinates
        InputProps={{ readOnly: true }}
        sx={{ width: 300, mb: 2, mt: 2 }}
      />

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => fetchWeatherByCoords(location)} // Pass coords from state
      >
        Fetch Weather Data
      </Button>

      {weatherData && (
        <section>
          <FormControlLabel
            control={
              <Switch
                checked={!isCelsius}
                onChange={() => setIsCelsius(!isCelsius)}
              />
            }
            label="Farenheit?"
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Current Conditions
                </Typography>
                <Grid container alignItems="center" spacing={1}>
                  {weatherData.alerts && weatherData.alerts.length > 0 && (
                    <Grid item>
                      <Card
                        sx={{
                          p: 2,
                          mt: 2,
                          bgcolor: 'warning.dark',
                          color: 'white'
                        }}>
                        <Typography variant="h6" gutterBottom>
                          Weather Alerts:
                        </Typography>
                        {weatherData.alerts.map((alert) => (
                          <Typography key={alert.description}>
                            <img
                              width="20"
                              height="20"
                              src={`${process.env.PUBLIC_URL}/icons/warning.png`}
                              alt="Alert Icon"
                            />
                            {alert.description}
                          </Typography>
                        ))}
                      </Card>
                    </Grid>
                  )}
                  <Grid item>
                    <img
                      width="40"
                      height="40"
                      src={`${process.env.PUBLIC_URL}/icons/${weatherData.days[0].icon}.svg`}
                      alt="Weather Icon"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h4">
                      {temperatureConverter(weatherData.days[0].temp)}
                    </Typography>
                    <Typography>{weatherData.days[0].conditions}</Typography>
                    <Typography>{weatherData.description}</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={6} md={12}>
              <Typography variant="h6" gutterBottom>
                5-Day Forecast
              </Typography>
              {weatherData.days.slice(1, 5).map((day, index) => (
                <Card sx={{ p: 1, mb: 1 }}>
                  <Grid container alignItems="center" textAlign="center">
                    <Grid item xs={12}>
                      {parseDate(day.datetime)}
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        width="30"
                        height="30"
                        src={`${process.env.PUBLIC_URL}/icons/${day.icon}.svg`}
                        alt="Weather Icon"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {temperatureConverter(day.tempmax)} /{' '}
                      {temperatureConverter(day.tempmin)}
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>
          </Grid>
        </section>
      )}
      <Button component={Link} className={classes.backButton} raised to="/">
        {'Back to Homepage'}
      </Button>
    </div>
  );
};

export default Weather;
