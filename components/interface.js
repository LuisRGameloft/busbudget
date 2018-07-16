import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';


class CMainComponentApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      busPrice: '',
    };

  }

  GetLocationAsync = async () => {

  };

  Checkpermissions = async () => {

  };

  componentDidMount() {

  }

  /*

  */
  render() {
    let { busPrice } = this.state;
    return (
      <View style={styles.container} >
        <Text style={styles.welcome}>Whiso !</Text>
        <TextField
            style={styles.welcome}
            label='Bus Price'
            value= {busPrice}
            onChangeText={ (busPrice) => this.setState({ busPrice }) }
        />
        <Text style={styles.welcome}>Current Budget</Text>
        <Text style={styles.welcome}>0.00</Text>
        <Text style={styles.welcome}>Next Budget</Text>
        <Text style={styles.welcome}>0.00</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      margin: 8,
      marginTop: 24,
      },
      welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
});

export default CMainComponentApp;
