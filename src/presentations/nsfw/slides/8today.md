---
title: Moderation today
type: 'content'
order: 8
---

- Lives in the _Beatport backend_ only, in EventController::isSafeImage
- Google Vision _SafeSearch_ gets the public temp URL and fetches the image itself
- Pass: the backend calls Knox finalize. Fail: a 406 with the failed categories
- backend/api has a copy of the code that nothing calls
