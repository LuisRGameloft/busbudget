import React, {
    Component 
}
from 'react';
import {
    StyleSheet, View, Text, AsyncStorage, 
}
from 'react-native';
import {
    PricingCard 
}
from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Kaede, Hoshi, Jiro, Isao, Madoka, Akira, Hideo, Kohana, Makiko, Sae, Fumi, 
}
from 'react-native-textinput-effects';
import {
    TextInputMask 
}
from 'react-native-masked-text'class CMainComponentApp extends Component 
{
    constructor(props) 
    {
        super (props);
        this.state = {
            busPrice : "", busCurrentPrice : 0.0, busNextPrice : 0.0, birthday : '', 
        };
    }
    CalculateDays(currentDay, amountDaysOfMonth, currentDayOfWeek) 
    {
        var AmountOfDays = 0;
        AmountOfDays = 15 - currentDay;
        if (AmountOfDays <= 0) {
            AmountOfDays = amountDaysOfMonth - currentDay + 1;
        }
        var validDays = 0;
        for (var i = 0; i <= AmountOfDays; ++i, ++currentDayOfWeek) {
            var DayofWeek = currentDayOfWeek % 7;
            if (DayofWeek > 0 && DayofWeek < 6) {
                ++validDays;
            }
        }
        return validDays;
    }
    async _storeData () 
    {
        try 
        {
            var valueBusPrice = this.state.busPrice;
            await AsyncStorage.setItem('value', this.state.busPrice);
            return valueBusPrice;
        }
        catch (error) {
            console.log('Error =' + error);
            console.log('Error saving data');
        }
    }
    CalculateBudget() 
    {
        // Save value
        this._storeData().then((result) => {
            console.log('Save Value ' + result);
        }).catch ((error) => {
            console.log('Error saving data');
        });
        var currentDate = new Date();
        var currentDayOfMonth = currentDate.getDate();
        var amountDaysOfCurrentMonth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 
        0)).getDate();
        var dayOfWeek = currentDate.getDay();
        console.log('[Current] Day == ' + currentDayOfMonth);
        console.log('[Current] total month == ' + amountDaysOfCurrentMonth);
        console.log('[Current] Day of Week == ' + dayOfWeek);
        var validDaysCurrent = this.CalculateDays(currentDayOfMonth, amountDaysOfCurrentMonth, dayOfWeek);
        console.log('[Current] Calculated == ' + validDaysCurrent);
        valueBusPrice = Number(this.state.busPrice.replace(/[^0-9\.-]+/g, ""));
        var CalculateDaysCurrent = (validDaysCurrent * 2);
        if (currentDate.getHours() > 10) {
            --CalculateDaysCurrent;
        }
        this.setState({
            busCurrentPrice : CalculateDaysCurrent * valueBusPrice
        });
        var validDaysNext = 0;
        if (currentDayOfMonth > 15) 
        {
            console.log('[Next Month]  == ');
            var newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
            var amountDaysOfNextMonth = newDate.getDate();
            var nextCurrentDayOfWeek = newDate.getDay();
            console.log('[Next Month] total month ==  ' + amountDaysOfNextMonth);
            console.log('[Next Month] Day of Week ==  ' + nextCurrentDayOfWeek);
            validDaysNext = this.CalculateDays(1, amountDaysOfNextMonth, nextCurrentDayOfWeek);
            console.log('[Next Month] Calculated == ' + validDaysNext);
        }
        else 
        {
            console.log('[Next Quarter]  ==  ');
            var newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 15);
            nextCurrentDayOfWeek = newDate.getDay();
            console.log('[Next Quarter] total Quarter ==  ' + amountDaysOfCurrentMonth);
            console.log('[Next Quarter] Day of Week ==  ' + nextCurrentDayOfWeek);
            validDaysNext = this.CalculateDays(15, amountDaysOfCurrentMonth, nextCurrentDayOfWeek);
            console.log('[Next Quarter] Calculated == ' + validDaysNext);
        }
        this.setState({
            busNextPrice : (validDaysNext * valueBusPrice * 2)
        });
    }
    onPressBusbudgetButton() {
        this.CalculateBudget();
    }
    async _retrieveData () 
    {
        try {
            const value = await AsyncStorage.getItem('value');
            return value;
        }
        catch (error) {
            console.log('No Value retrieved');
        }
    }
    componentDidMount() 
    {
        this._retrieveData().then((result) => 
        {
            console.log('Get Value ' + result);
            if (result != null) {
                this.setState({
                    busPrice : result
                });
                // automatic re-calculate
                this.CalculateBudget();
            }
        }).catch ((error) => {
            console.log('No Value Exeception');
        });
    }
    render() 
    {
        var formmattedPrice = this.state.busCurrentPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        var formmattedNextPrice = this.state.busNextPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') var myInfo = ['Siguiente Periodo'];
        myInfo.push('$ ' + formmattedNextPrice);
        return ( < View style = {
            styles.container
        }
         > < Text style = {
            styles.welcome
        }
         > Bus Budget </Text>
        <TextInputMask
                refInput={(ref) => this.myDateText = ref}
                customTextInput={Madoka}
				type={'money'}
				options={{
                    unit: '$ ',
                    separator: ".",
                    delimiter: ",",
                }}
                placeholder="Ingresa precio"
                style={styles.welcome}
                onChangeText={busPrice => this.setState({ busPrice })}
                value={this.state.busPrice}
                onFocus={() => this.setState({ busPrice: "" })}
         	/> < PricingCard color = '#4f9deb' title = 'Bus Budget' price = {
            '$ ' + formmattedPrice
        }
        info = {
            myInfo
        }
        button = { {
                title : 'Calculate' 
            }
        }
        onButtonPress = {
            this.onPressBusbudgetButton.bind(this)
        }
        />
        
      </View > );
    }
}
const styles = StyleSheet.create(
{
    container : {
        alignItems : 'stretch', justifyContent : 'center', 
    },
    welcome : {
        fontSize : 20, textAlign : 'center', margin : 10, 
    },
    instructions : {
        textAlign : 'center', color : '#333333', marginBottom : 5, 
    },
});
export default CMainComponentApp;
