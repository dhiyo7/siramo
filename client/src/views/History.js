import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Graph from '../components/farm/Graph'
import FarmStore from '../store/FarmStore'
const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => <Graph sensorData={FarmStore.farmData.historyHumidity} color="yellow"/>
const SecondRoute = () => <Graph sensorData={FarmStore.farmData.historyTemperature} color="blue"/>
const ThirdRoute = () => <Graph sensorData={FarmStore.farmData.historyWaterLevel} color="red"/>
const FourthRoute = () => <Graph  sensorData={FarmStore.farmData.historyWaterRatio} color="green"/>

@inject('FarmStore')
@observer class History extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      index: 0,
      routes: [
        { key: 'first', title: 'HUMIDITY', icon: 'leaf'  },
        { key: 'second', title: 'TEMPERATURE', icon: 'thermometer' },
        { key: 'third', title: 'WATER RATIO', icon: 'water' },
        { key: 'fourth', title: 'WATER LEVEL', icon: 'line-graph' },
      ],
    };
  }

  componentDidMount() {
    FarmStore.getHistory()
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar  {...props}/>;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
  })
  

  render() {
    return (
      <TabViewAnimated
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

export default History