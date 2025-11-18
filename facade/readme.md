A Facade is the simplest design pattern, which basically combines all the different functions into a single one , so the client doesn't have to handle them sepaartely 

for example consider this subsystems
```
// Subsystems
class VideoDecoder {
  decode(path: string) { /* ... */ }
}

class FrameExtractor {
  extractFrames(decodedVideo: any) { /* ... */ }
}

class ThumbnailGenerator {
  generate(frames: any[]) { /* ... */ }
}

class CloudUploader {
  upload(thumbnail: any) { /* ... */ }
}

// Client code WITHOUT facade
const decoder = new VideoDecoder();
const extractor = new FrameExtractor();
const generator = new ThumbnailGenerator();
const uploader = new CloudUploader();

const decoded = decoder.decode("video.mp4");
const frames = extractor.extractFrames(decoded);
const thumb = generator.generate(frames);
uploader.upload(thumb);

```

The client has to remember the exact order, the correct types passed between components, and the workflow steps.
so what we need we create a facade-class which exposes a single method , and this class is used  by the client now so that he doesn't neeed to remember any flows.

class VideoProcessingFacade {
  constructor(
    private decoder = new VideoDecoder(),
    private extractor = new FrameExtractor(),
    private generator = new ThumbnailGenerator(),
    private uploader = new CloudUploader()
  ) {}

  processAndUploadThumbnail(videoPath: string) {
    const decoded = this.decoder.decode(videoPath);
    const frames = this.extractor.extractFrames(decoded);
    const thumb = this.generator.generate(frames);
    return this.uploader.upload(thumb);
  }
}

// Client code WITH facade
const processor = new VideoProcessingFacade();
processor.processAndUploadThumbnail("video.mp4");


now we will just expose `processAndUploadThumbnail`  to client , 