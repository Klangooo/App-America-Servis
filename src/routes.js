import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Tela from './pages/Tela';
import Coletivo from './pages/Coletivo';
import Holerite from './pages/Holerite';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Tela" component={Tela} />
                <AppStack.Screen name="Coletivo" component={Coletivo} />
                <AppStack.Screen name="Holerite" component={Holerite} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}