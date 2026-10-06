---
title: 'Where does the result live?'
type: 'content'
order: 18
---

<div class="text-4xl">

|                        | Metadata        | Tags               | Annotations        |
| ---------------------- | --------------- | ------------------ | ------------------ |
| Set after upload       | no, copy needed | yes                | yes                |
| In the GET response    | x-amz-meta-*    | count only         | no                 |
| Survives Knox finalize (currently) | no (REPLACE)    | yes (COPY default) | yes (COPY default) |
| Size                   | 2 KB total      | 10 tags, 256 chars | 1 MiB each         |

</div>
