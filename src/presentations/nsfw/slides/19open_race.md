---
title: 'Open: timing and failure'
type: 'content'
order: 19
---

- S3 events arrive asynchronously, typically in seconds, sometimes longer
- So finalize can arrive before the result. Wait, poll, or refuse?
- Lambda fails or Rekognition throttles: pass or block? Today we pass
- Events are delivered at least once, so the Lambda must be safe to run twice
