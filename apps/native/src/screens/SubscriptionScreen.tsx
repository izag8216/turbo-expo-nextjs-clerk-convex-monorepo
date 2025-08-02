import React from 'react';
import { View, StyleSheet } from 'react-native';
import SubscriptionManager from '../components/SubscriptionManager';

export default function SubscriptionScreen() {
  return (
    <View style={styles.container}>
      <SubscriptionManager />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
