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

  CalculateDays(currentDay, amountDaysOfMonth, currentDayOfWeek)
  {
       var AmountOfDays = 0;
	     AmountOfDays = 15 - currentDay;
	     if(AmountOfDays <= 0)
	     {
		       AmountOfDays = amountDaysOfMonth - currentDay;
	     }

	     var validDays = 0;
       for(var i = 0;  i <= AmountOfDays; ++i, ++currentDayOfWeek)
       {
          var DayofWeek = currentDayOfWeek % 7;
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
      var dayOfWeek = currentDate.getDay();
      console.log('[Current] Day == ' + currentDayOfMonth);
      console.log('[Current] total month == ' + amountDaysOfCurrentMonth);
      console.log('[Current] Day of Week == ' + dayOfWeek);

      var validDaysCurrent = this.CalculateDays(currentDayOfMonth, amountDaysOfCurrentMonth, dayOfWeek);
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
          console.log('[Next Month]  == ');
          var newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
          var amountDaysOfNextMonth = newDate.getDate();
          var nextCurrentDayOfWeek = newDate.getDay();
          console.log('[Next Month] total month ==  ' + amountDaysOfNextMonth);
          console.log('[Next Month] Day of Week ==  ' + nextCurrentDayOfWeek);
          validDaysNext = this.CalculateDays(1, amountDaysOfNextMonth, nextCurrentDayOfWeek) * 2;
          console.log('[Next Month] Calculated == ' + validDaysNext);
      }
      else
      {
          console.log('[Next Quarter]  ==  '); 
          var newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
          nextCurrentDayOfWeek = newDate.getDay();
          console.log('[Next Quarter] total Quarter ==  ' + amountDaysOfCurrentMonth);
          console.log('[Next Quarter] Day of Week ==  ' + nextCurrentDayOfWeek);
          validDaysNext = this.CalculateDays(15, amountDaysOfCurrentMonth, nextCurrentDayOfWeek) * 2;
          console.log('[Next Quarter] Calculated == ' + validDaysNext);

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
