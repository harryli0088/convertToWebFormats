# Convert To Web Formats

Using a next-gen image format like ```.webp``` can greatly reduce image file size, which leads to faster load times, which leads to better Search Engine Optimization performance (ie higher ranking on Google searches). You can use the ```convertImagesToNextGenFormat.js``` script to convert your images to ```.webp``` format.

## Installation

Install convertToWebFormats as a dev dependency

```
npm i -D harryli0088/convertToWebFormats
```

## Valid image extensions

Currently, valid image extensions include ```.png```, ```.jpg```, and ```.jpeg```. All other file extensions will be ignored.

## Convert all files

By default, ```convertImagesToNextGenFormat.js``` recursively searches through the ```./src``` directory for all images with valid extensions. If the file already has a ```.webp``` version, the script will skip the file. Otherwise, it will convert the image to a new file with a ```.webp``` extension. You can run the script by running
```
npm run convertImages
```
or
```
node convertImagesToNextGenFormat.js
```

## Convert target files

You can pass command line arguments to the script to tell it to use specific files. For example
```
node convertImagesToNextGenFormat.js ./path/to/img1.png ./path/to/img2.jpg
```

## JSX usage

Use the ```picture``` and ```source``` tags to try to load the webp file. If there is an error, for example if the browser doesn't support ```.webp```, it will fallback to the ```img```.

```jsx
import Image from "./img.png"
import ImageWebp from "./img.webp"
...
  <picture>
    <source srcSet={ImageWebp} type="image/webp"/>
    <img src={Image} alt="img"/>
  </picture>
```
