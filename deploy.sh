#!/bin/bash
echo
echo
echo "🔵🐦🔵🐦🔵🐦 Deploying ReconBack Backend on NestJS 🔵🐦🔵🐦🔵🐦"
echo
# Define variables
PROJECT_ID="recon-back"
IMAGE_NAME="fake-bank-image"
REGION="europe-west1"
SERVICE_NAME="fake-bank-service"
echo
echo "\n🐦🐦🐦 Build the app ... 🔵🐦🔵🐦🔵🐦"
echo
npm run build

echo "\n🐦🐦🐦 Build the Docker image ... 🔵🐦🔵🐦🔵🐦"
echo
# Build the Docker image
# docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME .
docker buildx build --platform linux/amd64 -t gcr.io/$PROJECT_ID/$IMAGE_NAME .    
echo
# Push the Docker image to GCR
echo "🐦🐦🐦 Push the Docker image ... 🔵🐦🔵🐦🔵🐦"
echo
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME
echo
echo "🍎🍎🍎🍎🍎🍎🍎🍎🍎 start deployment to Cloud Run"
echo
# Deploy the app to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated
echo
echo "🍎🍎🍎🍎🍎🍎🍎🍎🍎 Hopefully, we have deployed successfully"
echo