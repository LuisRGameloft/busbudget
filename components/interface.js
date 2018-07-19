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
  }

  CalculateBudget()
  {
      var currentDate = new Date();
      var currentDayOfMonth = currentDate.getDate();
      var amountDaysOfCurrentMonth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate();
      var validDaysCurrent = this.CalculateDays(currentDayOfMonth, amountDaysOfCurrentMonth);
      this.setState({busCurrentPrice : validDaysCurrent});

      var validDaysNext = 0;
      if(currentDayOfMonth > 15)
      {
         var amountDaysOfNextMonth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)).getDate();
         validDaysNext = this.CalculateDays(1, amountDaysOfNextMonth);
      }
      else
      {
         validDaysNext = this.CalculateDays(15, amountDaysOfCurrentMonth);
      }
      this.setState({busNextPrice : validDaysNext});
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
        <Text style={styles.welcome}>{String(this.state.busNextPrice)}</Text>
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
