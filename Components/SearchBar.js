import { FormLabel, FormInput, Button } from 'react-native-elements'
import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import FetchSearchResults from './SearchFetch'
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import SERVER_URL from '../env'
import SearchScreen from '../Screens/SearchScreen'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      searchText: ''
    }
  }
  fetchSearchResults = () => {
    fetch(SERVER_URL + 'search/' + this.props.selectedTrend + this.props.selectedSearchTerm)
    .then(res => {
      let response = res.text();
      return response
    }) 
    .then(searchResults => {
      let searchResultsObject = JSON.parse(searchResults);
      this.props.dispatch({
        type: 'LOAD_SEARCH_RESULTS',
        searchResults: searchResultsObject.items
      });
      this.setState({
        submit: true
      })
      this.props.navigation.navigate('Search');
    })
  }

  render() {
      return (
        <View>
          <FormLabel>Google Search</FormLabel>
          <FormInput 
            onChangeText={(text) =>
              this.setState({text: text})}
          >{this.props.selectedTrend} {this.props.selectedSearchTerm}</FormInput>
          {/* <FormValidationMessage>Error message</FormValidationMessage> */}
          <Button 
            backgroundColor='#ff3355'
            style={styles.button}
            title='Search' 
            onPress={ () =>
              this.fetchSearchResults()
            }
          />
        </View>
      )
    }
}

export default connect(state => ({selectedTrend: state.selectedTrend, selectedSearchTerm: state.selectedSearchTerm}))(SearchForm);

styles = {
  button: {
    backgroundColor: '#ff3355'
  },
  container: {

  }
}