RESET V3 — Toya + Tone

WHAT'S NEW
- Separate Toya / Tone identity selection
- Couple code
- Shared "I Need..." requests
- Shared Us feed
- Favorites
- Card history
- Distinct Toya/Tone card styling
- Sound + vibration
- Notification preferences
- Firebase-ready realtime syncing
- GitHub Pages compatible front end

IMPORTANT SECURITY NOTE
This starter uses anonymous Firebase Authentication and simple Firestore rules for a private two-person prototype. The couple code acts as the shared room identifier, but the included starter rules allow any authenticated user who knows a pair code to access that pair's feed. For a stronger production version, use permanent user accounts and store authorized member UIDs on each pair document, then restrict rules to those UIDs.

FIREBASE SETUP
1. Go to https://console.firebase.google.com and create a project.
2. Add a Web app to the project.
3. Copy the Firebase config values into firebase-config.js.
4. Authentication > Sign-in method: enable Anonymous.
5. Firestore Database: create a database.
6. Firestore Rules: replace the rules with firestore.rules contents and publish.
7. Project Settings > Cloud Messaging:
   create/find your Web Push certificate / VAPID public key and paste it into firebase-config.js.
8. Upload all V3 files to the root of your existing GitHub Pages repo and commit.
9. Open the app on both phones.
10. Choose Toya on one phone, Tone on the other, and use the same couple code.

PUSH NOTIFICATIONS
The app includes browser notification permission and stores preferred reminder times.
True scheduled push notifications while the app is closed require a sender/backend, such as:
- Firebase Cloud Functions / Cloud Scheduler, or
- OneSignal

FCM web push also needs a Firebase messaging service worker and token registration. This V3 package is structured for Firebase sync but does not ship a server-side scheduler because your private Firebase project credentials/backend do not exist yet.

GITHUB PAGES
GitHub Pages is HTTPS, so it is suitable for Firebase web SDKs and web push once configured.
