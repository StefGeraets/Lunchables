---
title: 'Open: running it'
type: 'content'
order: 23
---

- Metadata is public: anyone loading the image sees its moderation scores
- Local dev runs on MinIO, which has no Lambda and no Rekognition
- Rekognition needs the bucket in the same region
- Cost is per image analysed. We need upload volumes per month
