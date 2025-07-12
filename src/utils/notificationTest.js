import messaging from '@react-native-firebase/messaging';

export const testNotifications = async () => {
  try {
    console.log('🔔 Testing Firebase Notifications...');
    
    // Check if device supports messaging
    const isSupported = messaging.isDeviceRegisteredForRemoteMessages;
    console.log('📱 Device registered for remote messages:', isSupported);
    
    // Get current FCM token
    const token = await messaging().getToken();
    console.log('🔑 FCM Token:', token);
    
    // Check permission status
    const authStatus = await messaging().requestPermission();
    console.log('🔐 Permission status:', authStatus);
    
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    console.log('✅ Notifications enabled:', enabled);
    
    return {
      isSupported,
      token,
      authStatus,
      enabled
    };
  } catch (error) {
    console.error('❌ Notification test failed:', error);
    return null;
  }
};
