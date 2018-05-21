import React, { Component } from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class FarmDate extends Component {
  render() {
    const { title, dates, times } = this.props.date
    return (
        <View style={styles.MainCard}>
          <Text style={{textAlign: 'center', fontSize: 16}}>{title}</Text>
          <View style={styles.cards}>
            <Text style={styles.cardText}>
              <Ionicons name='md-calendar' size={14} /> {dates}
            </Text>
          </View>
          <View style={styles.cards}>
            <Text style={styles.cardText}>
              <Ionicons name='md-clock' size={14} /> {times}
            </Text>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  MainCard: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#304FFE',
    borderWidth: 2,
    shadowColor: '#000',
    backgroundColor: '#EFEBE9',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 150,
    height: 120,
    elevation: 1,
    marginRight: 4,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cards: {
    padding: 4,
    margin: 8,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 14,
    color: 'black'
  }
})

export default FarmDate