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
      busPrice: "",
      busCurrentPrice: 0.0,
      busNextPrice: 0.0,
    };

  }

  CalculateDays(currentDay, amountDaysOfMonth)
  {
      // Current Date
	     //var currentDate = new Date();
	     //var currentDayOfMonth = currentDate.getDate();

	     // Get Current Days of Month
	     //var amountDaysOfCurrentMonth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate();

	     var AmountOfDays = 0;
	     AmountOfDays = 15 - currentDay;
	     if(AmountOfDays < 0)
	     {
		       AmountOfDays = amountDaysOfMonth - currentDay;
	     }

	     var validDays = 0;
       for(var i = 0;  i <= AmountOfDays; ++i, ++currentDay)
       {
          var DayofWeek = currentDay % 7;
          if(DayofWeek > 0 && DayofWeek < 6)
          {
              ++validDays;
          }
	     }

       return validDays;

       /*var CurrentPrice = (validDays * 2)
       if(currentDate.getHours() > 10)
       {
          --CurrentPrice;
       }

	      return CurrentPrice *= 15;*/
  }

  CalculateBudget()
  {
      var currentDate = new Date();
      var currentDayOfMonth = currentDate.getDate();
      var amountDaysOfCurrentMonth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate();
      var validDays = this.CalculateDays(currentDayOfMonth, amountDaysOfCurrentMonth);
      this.setState({busCurrentPrice : validDays});
  }

  GetLocationAsync = async () => {

  };

  Checkpermissions = async () => {

  };

  componentDidMount() {
      this.CalculateBudget();
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
        <Text style={styles.welcome}>{String(this.state.busCurrentPrice)}</Text>
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
