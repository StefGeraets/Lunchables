---
title: 'Why S3 + Rekognition'
type: 'content'
order: 15
---

- Knox already writes everything to S3
- Rekognition reads the object with IAM, so temp images can stop being public
- No service of our own to run. Lambda only runs when a file arrives
- Every Knox consumer gets moderation, not only Beatport
- One vendor instead of AWS plus Google
