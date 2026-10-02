---
title: 'Open: running it'
type: 'content'
order: 24
---

- Metadata is public: anyone loading the image sees its moderation scores
- Local dev runs on MinIO, which has no Lambda and no Rekognition
- Rekognition needs the bucket in the same region
- Cost is per image analysed. Estimated cost is $1 per 1000 images processed
