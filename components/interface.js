import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
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
      console.log('[Current] Day == ' + currentDayOfMonth);
      console.log('[Current] total month == ' + amountDaysOfCurrentMonth);

      var validDaysCurrent = this.CalculateDays(currentDayOfMonth, amountDaysOfCurrentMonth);
      console.log('[Current] Calculated == ' + validDaysCurrent);

      valueBusPrice = Number(this.state.busPrice);

      var CalculateDaysCurrent = (validDaysCurrent * 2);
      if(currentDate.getHours() > 10)
      {
         --CalculateDaysCurrent;
      }
      this.setState({busCurrentPrice : CalculateDaysCurrent * valueBusPrice});

      var validDaysNext = 0;
      if(currentDayOfMonth > 15)
      {
         var amountDaysOfNextMonth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0)).getDate();
         console.log('[Next] total month ==  ' + amountDaysOfNextMonth);
         validDaysNext = this.CalculateDays(1, amountDaysOfNextMonth) * 2;
         console.log('[Next] Calculated == ' + validDaysNext);
      }
      else
      {
         validDaysNext = this.CalculateDays(15, amountDaysOfCurrentMonth) * 2;
      }
      this.setState({busNextPrice : (validDaysNext * valueBusPrice)});
  }

  onPressBusbudgetButton()
  {
      this.CalculateBudget();
  }

  componentDidMount() {
      //this.CalculateBudget();
  }

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
        <Text style={styles.welcome}>$ {this.state.busCurrentPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
        <Text style={styles.welcome}>Next Budget</Text>
        <Text style={styles.welcome}>$ {this.state.busNextPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
        <Button
          onPress={this.onPressBusbudgetButton.bind(this)}
          title="Calculate Bus"
          color="#841584"
          accessibilityLabel="Calculate Bus budget"
        />
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
