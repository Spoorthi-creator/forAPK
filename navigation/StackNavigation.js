import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashScreen from '../screens/FlashScreen';
import Register from '../screens/Register';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import AllJournals from '../screens/AllJournals';
const Stack = createNativeStackNavigator();


function StackNavigation() {
    return (

        <Stack.Navigator>

            {/* <Stack.Screen
                name="Loading"
                component={Loading}
                options={{headerShown:false}}

                


            />   */}

            <Stack.Screen
                name="FlashScreen"
                component={FlashScreen}
                options={{ headerShown: false }}


            />

<Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: true }}


            />

<Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: true }}


            />

<Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}


            />

<Stack.Screen
                name="AllJournals"
                component={AllJournals}
                options={{ headerShown: true }}


            />


        </Stack.Navigator>



    );
}
export default StackNavigation;
