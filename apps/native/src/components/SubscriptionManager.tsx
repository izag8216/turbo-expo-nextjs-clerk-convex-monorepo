import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { initializeRevenueCat, getOfferings, purchasePackage } from '@indiestack/subscription';
import { useCurrentUser } from '@convex-dev/auth/react';

export default function SubscriptionManager() {
  const user = useCurrentUser();
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      initializeRevenueCat(user._id);
      loadOfferings();
    }
  }, [user]);

  const loadOfferings = async () => {
    try {
      const availableOfferings = await getOfferings();
      setOfferings(availableOfferings);
    } catch (error) {
      console.error('Error loading offerings:', error);
    }
  };

  const handlePurchase = async (packageToPurchase: any) => {
    setLoading(true);
    try {
      await purchasePackage(packageToPurchase);
      Alert.alert('Success', 'Subscription activated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete purchase');
      console.error('Purchase error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Please sign in to view subscriptions</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      
      {offerings.map((offering: any) => (
        <View key={offering.identifier} style={styles.offeringContainer}>
          <Text style={styles.offeringTitle}>{offering.serverDescription}</Text>
          
          {offering.availablePackages.map((pkg: any) => (
            <TouchableOpacity
              key={pkg.identifier}
              style={styles.packageButton}
              onPress={() => handlePurchase(pkg)}
              disabled={loading}
            >
              <Text style={styles.packageTitle}>{pkg.product.title}</Text>
              <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
              <Text style={styles.packageDescription}>{pkg.product.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  offeringContainer: {
    marginBottom: 20,
  },
  offeringTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  packageButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  packageDescription: {
    fontSize: 14,
    color: '#666',
  },
});
