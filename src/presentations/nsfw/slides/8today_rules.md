---
title: Moderation today
type: 'content'
order: 8
---

<div class="text-4xl">

Vision returns a likelihood per category, 0 (unknown) to 5 (very likely). One category at or above its threshold rejects the image.

| Category | Threshold | Rejected at |
| -------- | --------- | ----------- |
| adult    | 4         | likely      |
| violence | 4         | likely      |
| racy     | 5         | very likely |
| medical  | 5         | very likely |
| spoof    | off       | never       |

Set per whitelabel in config/moderation.php. Only Beatport has an entry.

</div>
