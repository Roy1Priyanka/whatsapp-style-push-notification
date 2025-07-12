# whatsapp-style-push-notification
🛠️ Setup & Installation
1️⃣ Clone the Project

bash
Copy
Edit
git clone https://github.com/your-username/whatsapp-push-notification.git
cd whatsapp-push-notification

2️⃣ Install Dependencies

bash
Copy
Edit
npm install
3️⃣ Firebase Configuration
Add google-services.json to android/app/

Set up Firebase project → Enable Cloud Messaging → Get Server Key

4️⃣ Android Native Setup (Java)
Create MyFirebaseMessagingService.java in:

swift
Copy
Edit
android/app/src/main/java/com/yourpackagename/
This Java class handles the incoming notifications and background events.

5️⃣ Run the App
Make sure emulator or Android phone is connected:

bash
Copy
Edit
npx react-native run-android
🔗 Backend (Notification Trigger API)
📁 Folder Structure
Located in separate folder fcm-server

Contains server.js

▶️ Start Backend
bash
Copy
Edit
cd fcm-server
node server.js
📤 Send Notification (Postman or Axios)
h
Copy
Edit
POST http://localhost:3000/send-notification

Body (JSON):
{
  "token": "<DEVICE_FCM_TOKEN>",
  "title": "Incoming Call",
  "body": "Priyanka is calling you!"
}
🧪 Screenshots
Main UI	FCM Token	Test Result

🏷️ Folder Structure Summary
css
Copy
Edit
📦 WhatsAppPushNotification
├── android/
│   └── app/src/main/java/.../MyFirebaseMessagingService.java
├── ios/
├── src/
│   ├── App.tsx
│   └── index.js
├── fcm-server/
│   └── server.js
✨ Bonus Features
🔗 Deep linking configured for /call-screen

🔢 Badge count handling (with react-native-push-notification)

💾 Token status stored in local state

📌 Requirements
Node.js >= 18

Android Studio / Emulator or Real Device

Firebase Project & Cloud Messaging enabled

Internet connection for Gradle downloads

🙌 Acknowledgements

Firebase Documentation

React Native & Metro

WhatsApp Notification UI Reference

