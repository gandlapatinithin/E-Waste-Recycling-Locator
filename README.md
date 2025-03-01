# E-Waste Recycling Locator

This project helps users find nearby e-waste recycling centers based on their location. It integrates Google Maps, Firestore, and a leaderboard system to encourage participation. The application is deployed on **Google Cloud Platform (GCP)** using **Compute Engine** for backend hosting and Firebase Hosting for frontend deployment.

## Features
- **Google Maps Integration**: Displays nearby e-waste recycling centers.
- **Firestore Database**: Stores center details and leaderboard scores.
- **Leaderboard**: Tracks user contributions.
- **Flask Backend**: Provides an API for retrieving recycling center data.
- **Google Cloud Deployment**: Hosted using Compute Engine, Firestore, and Firebase Hosting.

---

## Deployment on Google Cloud

### 1. **Google Cloud Setup**
#### Enable Required Services
Ensure the following services are enabled:
- Compute Engine
- Firestore Database
- Cloud Storage
- Identity and Access Management (IAM)

#### Install Google Cloud SDK
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

#### Authenticate and Set Project
```bash
gcloud auth login
gcloud config set project [PROJECT_ID]
```

---

### 2. **Backend Deployment (Flask API on Compute Engine)**
#### Create a Virtual Machine (VM)
```bash
gcloud compute instances create e-waste-backend \
    --machine-type=e2-micro \
    --image-family=debian-11 \
    --image-project=debian-cloud \
    --zone=us-central1-a
```

#### SSH into the VM
```bash
gcloud compute ssh e-waste-backend --zone=us-central1-a
```

#### Install Dependencies
```bash
sudo apt update && sudo apt install -y python3-pip virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Start the Flask Application
```bash
python3 app.py
```

#### Configure Firewall Rules
```bash
gcloud compute firewall-rules create allow-http \
    --allow=tcp:5000 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=http-server
```

---

### 3. **Frontend Deployment (React.js on Firebase Hosting)**
#### Build React App
```bash
cd frontend
npm install
npm run build
```
#### Deploy to Firebase Hosting
```bash
gcloud firebase deploy --only hosting
```

---

## API Endpoints
### **Get Nearby Centers**
```http
GET /centers
```
- Returns a list of e-waste recycling centers.

### **Submit Leaderboard Score**
```http
POST /leaderboard
```
- Submits a user's contribution.

---

## Useful Google Cloud Commands
Check Compute Engine instances:
```bash
gcloud compute instances list
```
Check Firestore data:
```bash
gcloud firestore databases list
```
Restart VM instance:
```bash
gcloud compute instances start e-waste-backend --zone=us-central1-a
```

This project leverages **Google Cloud Compute Engine** for backend hosting, ensuring scalability and reliability. 🚀

