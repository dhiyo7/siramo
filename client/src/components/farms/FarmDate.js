import React, { Component } from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class FarmDate extends Component {
  render() {
    const { title, dates, times } = this.props.date
    // console.log(this.props.date.dates)
    // console.log('Jam nya', times)
    // console.log('Tanggal nya', dates)
    return (
      <View>
        <Text>{title}</Text>
        <View style={styles.MainCard}>
          <View style={styles.cards}>
            <Text style={styles.cardText}>
              <Ionicons name='md-calendar' size={25} /> {dates}
            </Text>
          </View>
          <View style={styles.cards}>
            <Text style={styles.cardText}>
              <Ionicons name='md-clock' size={25} /> {times}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    backgroundColor: '#128eb7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cards: {
    height: 35,
    padding: 4,
    margin: 8,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 25,
    color: '#ffffff'
  }
})

export default FarmDate