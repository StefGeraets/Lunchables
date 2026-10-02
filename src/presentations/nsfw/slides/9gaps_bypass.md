---
title: Why change
subtitle: Skipping moderation
type: 'demo'
order: 9
---

<script>
  import Flow from '../components/Flow.svelte'
</script>

<Flow
actors={['Browser', 'Beatport backend', 'Knox public', 'S3']}
steps={[
{ from: 'Browser', to: 'Beatport backend', label: 'POST upload_request' },
{ from: 'Beatport backend', to: 'Browser', label: 'guid' },
{ from: 'Browser', to: 'Knox public', label: 'upload file' },
{ from: 'Browser', to: 'Knox public', label: 'POST /{guid}/finalize', warn: true },
{ from: 'Knox public', to: 'S3', label: 'copy to final, never moderated', warn: true }
]}
/>

<div class="mt-8 text-3xl text-center">
	Knox public exposes finalize without auth. The guid is enough.<br />
	<code>is_safe_image</code> also never checks that the guid belongs to the event.
</div>
