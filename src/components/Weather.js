import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Weather = ({currentTemp, description}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.temp}>{currentTemp}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        marginVertical: 100,
    },
    temp: {
        fontSize: 80,
        fontFamily: 'monospace'
    },
    desc: {
        fontSize: 20,
        fontFamily: 'monospace'
    }
})