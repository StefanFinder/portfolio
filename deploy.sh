#!/bin/bash
set -e

PROJECT_ID="portfolio-492420"
IMAGE="gcr.io/$PROJECT_ID/portfolio"
REGION="us-central1"
SERVICE="portfolio"

echo "🚀 Starting deployment..."

# 1. Push to GitHub
echo "\n📦 Pushing to GitHub..."
git push origin main

# 2. Build Docker image for linux/amd64
echo "\n🔨 Building Docker image..."
docker build --platform linux/amd64 -t $IMAGE .

# 3. Push image to GCP Container Registry
echo "\n📤 Pushing image to GCP..."
docker push $IMAGE

# 4. Deploy to Cloud Run
echo "\n☁️  Deploying to Cloud Run..."
gcloud run deploy $SERVICE \
  --image $IMAGE \
  --platform managed \
  --region $REGION \
  --port 3000 \
  --memory 512Mi \
  --allow-unauthenticated \
  --project $PROJECT_ID

echo "\n✅ Deployment complete!"
gcloud run services describe $SERVICE --region $REGION --project $PROJECT_ID --format="value(status.url)"
