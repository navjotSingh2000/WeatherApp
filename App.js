import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ImageBackground, ScrollView, RefreshControl } from 'react-native'
import GetLocation from 'react-native-get-location'
import Weather from './src/components/Weather';
import morning from './src/images/morning.jpeg'
import afternoon from './src/images/afternoon.jpeg'
import evening from './src/images/evening.jpeg'
import night from './src/images/night.jpeg'
import rainy_day from './src/images/rainy_day.jpeg'
import rainy_night from './src/images/rainy_night.jpeg'
import snow_day from './src/images/snow_day.jpeg'
import snow_night from './src/images/snow_night.jpeg'

const App = () => {

  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [weatherPicture, setWeatherPicture] = useState();
  const [refreshing, setRefreshing] = useState();

  useEffect(() => {
    getCurrentLocation()
  },[])
  
  const getCurrentLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        console.log(location);

        getWeatherData(location.latitude, location.longitude)
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  }

  const getWeatherData = async (lat, long) => {

    const api = "https://api.openweathermap.org/data/2.5/weather?lat=" 
    + lat +  "&lon=" + long + 
    "&appid=8a4a555e1d4b813fb5e7eba4e8cec34c&units=metric";

    console.log(api)

    await fetch(api)
    .then(res => res.json())
    .then(jsonData => { 
      console.log(jsonData)
      setWeatherData(jsonData)

      processData(jsonData)
      
    })
    .catch(error => console.error(error))
  }

  const processData = async(data) => {
    const mode = String(data.weather[0].main).toLowerCase
    const hoursOfDay = new Date().getHours()
    console.log("hoursOfDay")
    console.log(hoursOfDay)

    if(String(mode).includes("rain"))
    {
      if(hoursOfDay >= 7 && hoursOfDay <= 21)
      {
        setWeatherPicture(rainy_day)
      }
      else
      {
        setWeatherPicture(rainy_night)
      }
    }
    else if(String(mode).includes("snow"))
    {
      if(hoursOfDay >= 7 && hoursOfDay <= 21)
      {
        setWeatherPicture(snow_day)
      }
      else
      {
        setWeatherPicture(snow_night)
      }
    }
    else
    {
      if(hoursOfDay >= 7 && hoursOfDay <= 12)
      {
        setWeatherPicture(morning)
      }
      else if(hoursOfDay > 12 && hoursOfDay <= 17)
      {
        setWeatherPicture(afternoon)
      }
      else if(hoursOfDay > 17 && hoursOfDay <= 21){
        setWeatherPicture(evening)
      }
      else
      {
        setWeatherPicture(night)
      }
    }

    setLoading(true)
  }

  const slideToRefresh = () => {
    setRefreshing(true)
    getCurrentLocation()
    setTimeout(()=>setRefreshing(false), 2000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={slideToRefresh}
          />
        }
      >
        <ImageBackground source={weatherPicture} resizeMode="cover" style={styles.image}>
          {loading ? 
            <View>
              <Weather 
                currentTemp={weatherData.main.temp} 
                description={weatherData.weather[0].description} 
              />
            </View>
            :
            <View style={styles.loadingTxtContainer}>
              <Text style={styles.loadingTxt}>Fetching Location...</Text>
            </View>
          }
       </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  loadingTxtContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AF9595'
  },
  loadingTxt: {
    fontSize: 20,
    color: '#FFF'
  }
})