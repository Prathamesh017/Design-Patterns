import { ImageProxy } from "./proxy/proxy-service";
import { Image } from "./proxy/original-image-service";

   // Create lightweight proxies instead of full image objects
   const image1: Image = new ImageProxy("photo1.jpg");
   const image2: Image = new ImageProxy("photo2.png"); // Never displayed
   const image3: Image = new ImageProxy("photo3.gif");

   console.log("\nGallery initialized. No images actually loaded yet.");
   console.log("Image 1 Filename: " + image1.getFileName()); // Does not trigger image load

   // User clicks on image1
   console.log("\nUser requests to display " + image1.getFileName());
   image1.display(); // Lazy loading happens here

   // User clicks on image1 again
   console.log("\nUser requests to display " + image1.getFileName() + " again.");
   image1.display(); // Already loaded; no loading delay

   // User clicks on image3
   console.log("\nUser requests to display " + image3.getFileName());
   image3.display(); // Triggers loading for image3

   console.log("\nApplication finished. Note: photo2.png was never loaded.");