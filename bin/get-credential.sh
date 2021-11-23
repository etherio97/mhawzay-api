#!/usr/bin/env bash

DOTENV_FILE="$(pwd)/.env"
SERVICE_ACCOUNT="$(pwd)/serviceAccount.json"

if [ -f "$SERVICE_ACCOUNT" ]; then
    echo "[o] Already existed at $SERVICE_ACCOUNT"
    exit
else 
    if [ -f "$DOTENV_FILE" ]; then
        echo "[!] .env file found"
        source "$DOTENV_FILE"
    fi
    echo "[-] Downloading to $SERVICE_ACCOUNT"
    curl -Lo "$SERVICE_ACCOUNT" "$FIREBASE_CREDENTIAL_URL" --progress-bar
    echo "[o] Downloaded to $SERVICE_ACCOUNT"
fi