## Adding Data to Firebase Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/) and open your project.
2. Navigate to **Firestore Database** and create collections:
   - `recycling_centers`
   - `leaderboard`
3. Insert sample documents as follows:
   - **Recycling Centers:** `{ name, latitude, longitude, address, contact }`
   - **Leaderboard:** `{ name, points }`
4. Download the Firebase Admin SDK key and place it in `backend/firebase-key.json`.
5. Update Firestore rules for temporary access:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
