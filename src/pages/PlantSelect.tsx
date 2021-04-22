import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { EnviromentButton } from '../components/EnviromentButton';

import { PlantCardPrimary } from '../components/PlantCardPrimary';

import { Header } from '../components/Header';

import { Load } from '../components/Load';

import api from '../services/api';

import fonts from '../styles/fonts';

import colors from '../styles/colors';

interface EnviromentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number,
    repeat_every: string;
  }
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMorePage, setLoadingMorePage] = useState(false);
  const [loadedAllPage, setLoadedAllPage] = useState(false);


  function handleEnviromentSelected(enviroment: string){
    setEnviromentSelected(enviroment);   
    
    if(enviroment == 'all')
      return setFilteredPlants(plants);

      const filtered = plants.filter(plant => 
        plant.environments.includes(enviroment),
        );

        setFilteredPlants(filtered);
  };

  async function fetchPlants() {
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}_limit=8`);
    if(!data)
      return setLoading(true);

    if(page > 1){
      setPlants( oldValue => [...oldValue, ...data])
      setFilteredPlants( oldValue => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMorePage(false);
  }

  function handleFetchMore(distance: number) {
    if(distance < 1)
      return;
  
      setLoadingMorePage(true);
      setPage(oldValue => oldValue + 1);
      fetchPlants();
  } 


  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api
      .get('plants_environments?_sort=title&_order=asc');
      setEnviroments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
    }

    fetchEnviroment();
  }, []);


  useEffect(() => {
      fetchPlants();
  }, []);


  if(loading)
    return <Load />
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
            </Text>
        <Text style={styles.subTitle}>
          você quer colocar a sua planta?
            </Text>
      </View>

      <View>
        <FlatList
          data= {enviroments}
          renderItem={({ item }) => (
              <EnviromentButton
              title={item.title}
              active={ item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
        />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />

      </View>

      <View style={styles.plants}>
        <FlatList
            data={ filteredPlants }
            renderItem={({ item }) => (
            <PlantCardPrimary
            data={ item } />
            )}
            showsVerticalScrollIndicator={false}  
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd}) => 
            handleFetchMore(distanceFromEnd)
            }
            ListFooterComponent={
              loadingMorePage 
              ? <ActivityIndicator color={colors.green} />
              : <> </>
            }
          />

      </View>

    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
})