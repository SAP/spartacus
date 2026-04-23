---
modified: 2026-04-23T03:47:41.545Z
title: null
---

1. App Endpoint: https://promotions-personalization-agent.c-568e783.stage.kyma.ondemand.com
2. Get Authentication Token:
curl --request POST \
  --url https://appfnddev.accounts400.ondemand.com/oauth2/token \
  --header 'accept: application/json' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data token_format=bearer \
  --data client_id=8634ee6e-64a7-43b2-a7cf-5678d06e2ee9 \
  --data client_secret=6T_HepeT4=Z]jbzyQbvzU3hlColS-ZwmN
3. Invoke Agent Endpoint:
curl --request POST \
 --url https://promotions-personalization-agent.c-568e783.stage.kyma.ondemand.com/ \
  --header 'authorization: Bearer <YOUR_TOKEN>' \
  --header 'content-type: application/json' \
  --data '{
  "jsonrpc": "2.0",
  "method": "message/send",
  "id": "test-1",
  "params": {
    "message": {
      "messageId": "msg-001",
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "What is App Foundation?"
        }
      ]
    }
  }
}'