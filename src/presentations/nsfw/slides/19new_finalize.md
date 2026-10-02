---
title: The new setup
type: 'content'
order: 19
---

- Moderate once, on the temp object. The copy to final doesn't need a second run
- Scope the S3 event to the temp prefix, so finalize doesn't trigger it
- Metadata in the response needs a self-copy in the Lambda, which fires a new event
- And Knox finalize needs to keep it: copy the temp metadata instead of replacing it
