---
title: Knox
type: 'content'
order: 4
---

- Our upload service, written in Go
- A backend creates an _upload request_ with a temporary and a final S3 location
- Two ports: _private_ for backends, _public_ for browsers
- No tokens, no signed URLs. The upload request GUID is the only credential
