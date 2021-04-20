import React from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Button } from '../components/Button';

import fonts from '../styles/fonts';

import colors from '../styles/colors';

export function Comfirmation() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.emoji}>
          😄
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das
          suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button
            title='Começar'
          />
        </View>

      </View>

    </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  emoji: {
    fontSize: 58
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
    color: colors.heading
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20
  },
})