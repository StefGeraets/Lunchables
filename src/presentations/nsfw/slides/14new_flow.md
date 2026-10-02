---
title: The new setup
subtitle: Moderation on upload
type: 'demo'
order: 14
---

<script>
  import Flow from '../components/Flow.svelte'
</script>

<Flow
actors={['Browser', 'Knox', 'S3', 'Lambda', 'Rekognition']}
steps={[
{ from: 'Browser', to: 'Knox', label: 'upload file' },
{ from: 'Knox', to: 'S3', label: 'temp/{id}.png' },
{ from: 'S3', to: 'Lambda', label: 'ObjectCreated event' },
{ from: 'Lambda', to: 'Rekognition', label: 'DetectModerationLabels(bucket, key)' },
{ from: 'Rekognition', to: 'Lambda', label: 'labels + confidence' },
{ from: 'Lambda', to: 'S3', label: 'write result on the object' },
{ from: 'Browser', to: 'Knox', label: 'finalize (via backend)' },
{ from: 'Knox', to: 'S3', label: 'copy temp to final, result included' },
{ from: 'Browser', to: 'S3', label: 'GET image, result in the response' }
]}
/>
