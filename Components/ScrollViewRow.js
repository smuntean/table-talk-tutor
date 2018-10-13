import React from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import ResultRow from './ResultRow'
import { connect } from 'react-redux';

let ScrollViewRow = (props) =>
  <View>
    <ScrollView 
      // contentContainerStyle={{flexGrow:1}} 
      horizontal={true}
      decelerationRate={0}
      snapToInterval={(Dimensions.get('window').width * 0.8) + 24}
      snapToAlignment={"center"}
      >
      {props.googleResults.map(result => 
        <ResultRow 
          {...props}
          key={result.link} 
          result={result} 
          style={styles.card}
          />
        )}
    </ScrollView>
  </View>


export default connect(state => ({googleResults: state.googleResults}))(ScrollViewRow);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row'
    
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 200
  }
});