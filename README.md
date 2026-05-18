# Namma-Raste Health Android App

## Open in Android Studio

1. Unzip `NammaRasteHealth_ExamApp_AndroidStudio.zip`.
2. Open Android Studio.
3. Choose **Open** and select the unzipped `NammaRasteHealth_ExamApp` folder.
4. Let Android Studio sync Gradle.
5. Run the `app` configuration on an emulator or Android phone.

## Notes

- The app is a native Android WebView wrapper around the colorful Namma-Raste Health prototype.
- The Map page uses live OpenStreetMap tiles, so internet is needed for the real-time map view.
- The offline segment map, dashboards, reports, contractor pages, analytics, and GenAI simulation remain available inside the app UI.
Namma Rasthe Health 🚑🌿

A smart healthcare and emergency assistance application designed to improve public health support, emergency response, and road safety services for citizens. The application helps users quickly access nearby hospitals, emergency contacts, ambulance services, and health-related assistance through a simple and user-friendly interface.

📌 Project Overview

Namma Rasthe Health is a healthcare support platform focused on providing faster medical assistance and improving emergency communication. The application integrates healthcare services with smart technology to help users during emergencies and daily health-related activities.

The main goal of this project is to create a reliable and accessible healthcare ecosystem that connects users with hospitals, ambulances, emergency services, and health monitoring features.

✨ Features
🚑 Emergency Ambulance Request
🏥 Nearby Hospital Finder
📍 Real-Time Location Tracking
👨‍⚕️ Health Assistance Support
📞 Emergency Contact Calling
🔔 Instant Alert Notifications
🗺️ Google Maps Integration
📊 User Health Monitoring
🔐 Secure User Authentication
📱 Simple and User-Friendly Interface
🛠️ Technologies Used
Frontend
Android Studio
XML
Java / Kotlin
Backend
Firebase Authentication
Firebase Realtime Database / Firestore
APIs & Tools
Google Maps API
Location Services
Firebase Cloud Messaging (FCM)
🏗️ System Architecture
User Mobile App
       │
       ▼
Frontend (Android Application)
       │
       ▼
Firebase Backend Services
 ├── Authentication
 ├── Database
 ├── Notifications
 └── Cloud Storage
       │
       ▼
Emergency Services / Hospitals
 Workflow
User logs into the application.
Application fetches real-time location.
User can search nearby hospitals or request ambulance service.
Emergency alerts are sent instantly.
Hospitals and emergency contacts receive notifications.
Real-time updates are provided to the user.
 Screenshots

Add your project screenshots here.

/screenshots/home.png
/screenshots/emergency.png
/screenshots/maps.png
⚙️ Installation Guide
Clone the Repository
git clone https://github.com/abhibgabhi-svg/NammaRasteHealth.git
Open Project
Open Android Studio
Select "Open Existing Project"
Choose the cloned repository folder
Setup Firebase
Create a Firebase Project
Add google-services.json
Enable:
Authentication
Firestore Database
Cloud Messaging
Run the Application
Click Run ▶ in Android Studio
 Project Structure
NammaRasteHealth/
│
├── app/
├── assets/
├── firebase/
├── activities/
├── adapters/
├── models/
├── services/
└── README.md
🔐 Security Features
Firebase Authentication
Secure User Login
Encrypted Database Access
Real-Time Emergency Alert System
🚀 Future Enhancements
AI-based health prediction system
Voice-enabled emergency support
Smart wearable device integration
Multi-language support
Doctor appointment booking
Live ambulance tracking
 Author

Abhi BG

GitHub: abhibgabhi-svg GitHub Profile
Repository: NammaRasteHealth Repository
 License

This project is licensed under the MIT License.

 Contribution

Contributions are welcome.

Fork the repository
Create a new branch
Commit changes
Push the branch
Create a Pull Request
