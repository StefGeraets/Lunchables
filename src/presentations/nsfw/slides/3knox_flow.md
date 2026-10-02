---
title: Knox
subtitle: An upload, step by step
type: 'demo'
order: 3
---

<script>
  import Flow from '../components/Flow.svelte'
</script>

<Flow
actors={['Browser', 'Backend', 'Knox private', 'Knox public', 'img-renderer', 'S3']}
steps={[
{ from: 'Browser', to: 'Backend', label: 'I want to upload an image' },
{ from: 'Backend', to: 'Knox private', label: 'POST /upload_request' },
{ from: 'Knox private', to: 'Backend', label: 'guid + temp/final location' },
{ from: 'Backend', to: 'Browser', label: 'guid' },
{ from: 'Browser', to: 'Knox public', label: 'POST /{guid} (multipart)' },
{ from: 'Knox public', to: 'img-renderer', label: 'run actions' },
{ from: 'img-renderer', to: 'S3', label: 'PNG to temp/{id}.png' },
{ from: 'Knox public', to: 'Browser', label: '204 uploaded' }
]}
/>
