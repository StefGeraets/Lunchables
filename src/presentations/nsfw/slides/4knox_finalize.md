---
title: Knox
subtitle: Finalize
type: 'demo'
order: 4
---

<div class="text-3xl leading-relaxed text-center">
	Copy temp to final, replace metadata, <code>public-read</code>, delete temp
</div>

```go
// go/knox/knox.go:316
_, err = s3Service.CopyObjectWithContext(ctx, &s3.CopyObjectInput{
	Bucket:            bucket,
	ACL:               acl, // "public-read"
	CopySource:        aws.String(url.PathEscape(sBucket + "/" + sKey)),
	Key:               key,
	MetadataDirective: aws.String(s3.MetadataDirectiveReplace),
	Metadata:          metadataToApply, // only what the finalize body sends
})
// no TaggingDirective: S3 defaults to COPY, tags survive
```
