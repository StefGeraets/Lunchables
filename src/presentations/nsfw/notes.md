Current implementation:
Make Knox upload request: returns temp image location
Give temp image to Google Vision API
Check result against config rules
Fire off finalize call to Knox when vision is within config

Other Options:
Make a separate service for moderation.

Best option:
AWS Rekognition

Fire a Lambda that calls Rekognition. The Lambda writes as Object Tags or custom metadata to the image. When the images is retrieved, you receive the custom metadata as http header with the call.

Knox finalize call: It copies the S3 ‘image’ to the final location. And it strips the metadata. We can also copy the metadata when ‘image’ is being copied.

AWS S3

Concerns. 
Once custom metadata is set, it is automatically public info. Comes with each image loaded from S3.
Who is responsible for ‘blocking’ an image. When does it not get through moderation.
How to circumvent calling finalize directly.

Benefits: 
Just use Knox, moderation values come from the header of the response. AWS Lambda’s do the work.
More Lamba’s for other metadata/tags. Think of user guid that uploaded image, or company that uploaded the image.

Temp image and finalized image are different. We don’t need to fire the moderation Lambda again for the same image. We can, on the other hand, bake in the moderation metadata in the image when calling finalize.

Another beast to tackle. This is just image moderation, not text. This is complete different beast.

Upcoming shop concern regarding image upload/handling.
