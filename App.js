import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, ImageBackground } from 'react-native';
import axios from 'axios';

const API_KEY = '5da480a01d3d90963a68adbf1a6f5cc2';
const backgroundImage = require('./img.jpg'); 

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!location) return;



    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Location not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Weather Checker</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor="#ccc"
        />
        <Button title="Get Weather" onPress={fetchWeather} color="#1e90ff" />


        {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.locationText}>
              {weatherData.name}, {weatherData.sys.country}
            </Text>
            <Text style={styles.tempText}>
              {Math.round(weatherData.main.temp)}°C
            </Text>
            <Text style={styles.descriptionText}>
              {weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  overlay: 
  {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay to make text easier to read
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input:
  {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  tempText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#fff',
  },
});

export default App;
