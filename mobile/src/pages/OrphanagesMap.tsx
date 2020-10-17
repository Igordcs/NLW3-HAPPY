import React, {useEffect, useState}  from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import mapIcon from '../images/logo.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

export default function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    });

    const navigation = useNavigation();

    function handleNavigationToCreateOrphanage(){
      return navigation.navigate('SelectMapPosition')
    }

    function handleNavigationToOrphanagesDetails(id: number){
        return navigation.navigate('OrphanageDetails', {id})
    }

    return(
        <View style={styles.container}>
      <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: -8.6166205,
        longitude: -37.1578784,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008
      }}
      >
        {orphanages.map(orphanage => {
          return(
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              calloutAnchor={{
               x: 2.7,
              y: 0.8,
              }}
              coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              }}
            >
            <Callout tooltip onPress={() => handleNavigationToOrphanagesDetails(orphanage.id)}>
              <View style={styles.callout}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
          <RectButton style={styles.createOrphanageButton} onPress={handleNavigationToCreateOrphanage}>
            <Feather name="plus" size={26} color="#fff"/>
          </RectButton>
      </View>
    </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    callout: {
      width: 160,
      height: 56,
      
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText:{
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14,
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
  
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      borderRadius: 20,
      backgroundColor: '#15c3d6',
  
      justifyContent: 'center',
      alignItems: 'center',
    },
});