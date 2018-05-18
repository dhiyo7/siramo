import React, { Component } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableHighlight } from 'react-native'

class Farm extends Component {
    constructor() {
        super()
        this.state = {
            farms : ['1','2','3','4'],
            watered : [true,true,true,true]
        }
    }

    change(i){
        let array = this.state.watered
        array[i] = !array[i]
        this.setState({
            ...this.state,
            watered:array,
        })
    }

    add() {
      this.props.navigation.navigate('AddFarm',{
      })
    }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>this.add()}
          >
          <Text
            style={styles.text}
          >ADD FARM</Text>
        </TouchableHighlight>
        <View style={styles.board}>
          {
                  this.state.farms.map((farm,i)=>{
                      if(this.state.watered[i]=== true){
                          return (
                              <TouchableHighlight
                              key={i}
                              style={styles.disable}
                              onPress={()=>this.change(i)}
                              >
                              <Text
                              style={styles.text}
                              >{farm}</Text>
                              </TouchableHighlight>
                          )
                      }else {
                          return (
                              <TouchableHighlight
                              key={i}
                              style={styles.column}
                              onPress={()=>this.change(i)}
                              >
                              <Text
                              style={styles.text}
                              >{farm}</Text>
                              </TouchableHighlight>
                          )
                      }
                  })
              }
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    board:{
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 360
    },
    boardHeader:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    column:{
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        width:170,
        height:180
    },
    button:{
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        width:60,
        height:40
    },
    disable:{
      justifyContent: 'center',
      backgroundColor:'brown',
      margin:5,
      width:170,
      height:180
    },
    text:{
        textAlign: 'center'
    }
})


export default Farm