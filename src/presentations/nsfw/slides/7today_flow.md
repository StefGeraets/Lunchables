---
title: Moderation today
subtitle: The Beatport flow
type: 'demo'
order: 7
---

<script>
  import Flow from '../components/Flow.svelte'
</script>

<Flow
actors={['Browser', 'Beatport backend', 'Knox', 'S3', 'Google Vision']}
steps={[
{ from: 'Browser', to: 'Beatport backend', label: 'POST upload_request' },
{ from: 'Beatport backend', to: 'Knox', label: 'create upload request' },
{ from: 'Browser', to: 'Knox', label: 'upload file' },
{ from: 'Knox', to: 'S3', label: 'temp/{id}.png (public-read)' },
{ from: 'Browser', to: 'Beatport backend', label: 'POST is_safe_image/{guid}' },
{ from: 'Beatport backend', to: 'Knox', label: 'GET temp URL' },
{ from: 'Beatport backend', to: 'Google Vision', label: 'SafeSearch(temp URL)' },
{ from: 'Google Vision', to: 'S3', label: 'fetch image' },
{ from: 'Beatport backend', to: 'Knox', label: 'finalize (or 406 to the browser)' }
]}
/>
