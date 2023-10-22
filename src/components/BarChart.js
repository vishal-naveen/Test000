import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Alert
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';

class BarChartScreen extends React.Component {

  constructor(props) {
    super(props);
console.log("=-=-=",props.yValues)
    this.state = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: props.yValues,
          label: 'Bar dataSet',
          config: {
            color: processColor('#09172d'),
            barShadowColor: processColor('#09172d'),
            highlightAlpha: 90,
            highlightColor: processColor('#09172d'),
          }
        }],

        config: {
          barWidth: 0.7,
        }
      },
      xAxis: {
        valueFormatter: props.xValues,
        granularityEnabled: true,
        granularity : 1,
      }
    };
  }
setYData(){
//    Alert.alert("1")
}
  handleSelect(event) {
    // let entry = event.nativeEvent
    // if (entry == null) {
    //   this.setState({...this.state, selectedEntry: null})
    // } else {
    //   this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    // }

    // console.log(event.nativeEvent)
  }


  render() {
    return (
      <View style={{flex: 1}}>

        <View pointerEvents='none' style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            // legend={this.state.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: { min: 5, max: 5 }}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfd1b8'
  },
  chart: {
    flex: 1
  }
});

export default BarChartScreen;