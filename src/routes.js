import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Tela from './pages/Tela';
import Individual from './pages/Individual';
import Coletivo from './pages/Coletivo';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Tela" component={Tela} />
                <AppStack.Screen name="Individual" component={Individual} />
                <AppStack.Screen name="Coletivo" component={Coletivo} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}