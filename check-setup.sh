#!/bin/bash

echo "🔍 Checking WhatsApp Clone Firebase Notification Setup..."

# Check if google-services.json exists
if [ -f "android/app/google-services.json" ]; then
    echo "✅ google-services.json found"
else
    echo "❌ google-services.json missing"
fi

# Check if Firebase dependencies are in package.json
if grep -q "@react-native-firebase/app" package.json; then
    echo "✅ Firebase app dependency found"
else
    echo "❌ Firebase app dependency missing"
fi

if grep -q "@react-native-firebase/messaging" package.json; then
    echo "✅ Firebase messaging dependency found"
else
    echo "❌ Firebase messaging dependency missing"
fi

# Check if necessary permissions are in AndroidManifest.xml
if grep -q "POST_NOTIFICATIONS" android/app/src/main/AndroidManifest.xml; then
    echo "✅ POST_NOTIFICATIONS permission found"
else
    echo "❌ POST_NOTIFICATIONS permission missing"
fi

if grep -q "MyFirebaseMessagingService" android/app/src/main/AndroidManifest.xml; then
    echo "✅ Firebase Messaging Service registered"
else
    echo "❌ Firebase Messaging Service not registered"
fi

# Check if Firebase service file exists
if [ -f "android/app/src/main/java/com/whatsappclone/MyFirebaseMessagingService.kt" ]; then
    echo "✅ Firebase Messaging Service implementation found"
else
    echo "❌ Firebase Messaging Service implementation missing"
fi

# Check if background handler is set up
if grep -q "setBackgroundMessageHandler" index.js; then
    echo "✅ Background message handler configured"
else
    echo "❌ Background message handler missing"
fi

# Check if google-services plugin is applied
if grep -q "google-services" android/app/build.gradle; then
    echo "✅ Google Services plugin applied"
else
    echo "❌ Google Services plugin missing"
fi

echo ""
echo "🚀 Setup verification complete!"
echo ""
echo "📋 Next steps:"
echo "1. Clean and rebuild: cd android && ./gradlew clean && cd .."
echo "2. Run the app: npx react-native run-android"
echo "3. Check logs: adb logcat | grep -E '(FCM|Firebase|WhatsApp)'"
echo "4. Test notifications from Firebase Console"
