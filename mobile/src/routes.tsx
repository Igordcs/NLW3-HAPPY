import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/createOrphanages/OrphanageDetails';
import OrphanagesData from './pages/createOrphanages/OrphanageData';
import SelectMapPosition from './pages/createOrphanages/SelectMapPosition';
import Header from './components/Header';

const {Navigator, Screen} = createStackNavigator();

export default function Routes() {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: "#f2f3f5"}}}>
                <Screen 
                    name="OrphanagesMap" 
                    component={OrphanagesMap}
                />

                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato"/>
                    }}
                />

                <Screen 
                    name="OrphanageData" 
                    component={OrphanagesData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Criação do orfanato" showCancel/>
                    }}
                />

                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione uma posição"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}