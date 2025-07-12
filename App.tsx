/**
 * WhatsApp Clone with Push Notifications
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {NotificationService} from './src/services/NotificationService';
import messaging from '@react-native-firebase/messaging';
import {testNotifications} from './src/utils/notificationTest';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<string>('Not initialized');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
  };

  useEffect(() => {
    async function setupNotifications() {
      try {
        setNotificationStatus('Setting up...');
        
        // Request permission for Android 13+
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Notification Permission',
              message: 'This app needs notification permission to show messages',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Notification permission denied');
            setNotificationStatus('Permission denied');
            return;
          }
        }

        // Request FCM permission
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (!enabled) {
          Alert.alert('Firebase messaging permission denied');
          setNotificationStatus('Firebase permission denied');
          return;
        }

        // Initialize notification service
        await NotificationService.requestUserPermission();
        const token = await NotificationService.getFCMToken();
        setFcmToken(token);
        
        // Set up message handlers
        NotificationService.onMessageReceived();
        NotificationService.onNotificationOpenedApp();

        console.log('Notifications setup completed, FCM Token:', token);
        setNotificationStatus('Ready ✅');
      } catch (error) {
        console.error('Error setting up notifications:', error);
        Alert.alert('Error', 'Failed to setup notifications');
        setNotificationStatus('Error ❌');
      }
    }

    setupNotifications();
  }, []);

  const handleTestNotifications = async () => {
    const result = await testNotifications();
    if (result) {
      Alert.alert('Test Results', `
Token: ${result.token ? 'Generated' : 'Failed'}
Enabled: ${result.enabled ? 'Yes' : 'No'}
Status: ${result.authStatus}
      `);
    }
  };

  const copyTokenToClipboard = () => {
    if (fcmToken) {
      // In a real app, you'd use Clipboard API
      Alert.alert('FCM Token', fcmToken);
    } else {
      Alert.alert('No Token', 'FCM token not available yet');
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Text style={styles.title}>WhatsApp Clone</Text>
          <Text style={styles.subtitle}>Push Notifications Enabled</Text>
          
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>Status: {notificationStatus}</Text>
            {fcmToken && (
              <Text style={styles.tokenText}>Token: Available</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleTestNotifications}>
            <Text style={styles.buttonText}>Test Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={copyTokenToClipboard}>
            <Text style={styles.buttonText}>Show FCM Token</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#25D366',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#128C7E',
  },
  statusContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#25D366',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
