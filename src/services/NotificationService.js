import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export class NotificationService {
  static async requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        return true;
      } else {
        console.log('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('requestUserPermission error:', error);
      return false;
    }
  }

  static async getFCMToken() {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        return fcmToken;
      } else {
        console.log('Failed to get FCM token');
        return null;
      }
    } catch (error) {
      console.error('getFCMToken error:', error);
      return null;
    }
  }

  static async onMessageReceived() {
    try {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        
        // Show alert for foreground messages
        if (remoteMessage.notification) {
          Alert.alert(
            remoteMessage.notification.title || 'New Message',
            remoteMessage.notification.body || 'You have a new message'
          );
        }
      });
      
      return unsubscribe;
    } catch (error) {
      console.error('onMessageReceived error:', error);
    }
  }

  static async onNotificationOpenedApp() {
    try {
      // Handle notification when app is opened from background
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:', remoteMessage);
      });

      // Handle notification when app is opened from quit state
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('Notification caused app to open from quit state:', remoteMessage);
          }
        });
    } catch (error) {
      console.error('onNotificationOpenedApp error:', error);
    }
  }
}