#! node

const fs = require("fs")
const path = require("path")
const sharp = require("sharp")



function convertToWebFormats(startDirectory:string="./") {
  const argumentImagePaths = process.argv.slice(2)

  const filePathsToConvert = ( //filter images only
    argumentImagePaths.length>0 ? argumentImagePaths : getAllFilePaths(startDirectory) //if the user supplies file paths to convert, use them, get find all files
  ).filter(f => isImage(f))

  filePathsToConvert.forEach(imagePath => {
    const webpFilePath = replaceExtension(imagePath,"webp") //get the name of the file if it were to be converted to webp

    //if a webp version of this file already exists
    if(fs.existsSync(webpFilePath)) {
      console.log("Webp already exists for",imagePath) //we don't need to do anything

    }
    else {
      //convert the image to webp
      sharp(imagePath).webp({ lossless: true }).toFile(
        webpFilePath,
        (err:Error | undefined) => {
          if(err) return console.error("Failed converting",imagePath,err)
          console.log("Successfully converted",imagePath)
        }
      )
    }
  })
}



/**
 * given a directory, recursively return an array of all the file paths
 * @param  directory directory path as string
 * @param  filePaths array of file paths
 * @return           array of file paths
 */
function getAllFilePaths(directory:string, filePaths:string[]=[]) {
  fs.readdirSync(directory).forEach((file:string) => {
    const absolutePath = path.join(directory, file) //get the absolutePath path of this file

    if (fs.statSync(absolutePath).isDirectory()) { //if this is a directory
      getAllFilePaths(absolutePath,filePaths) //recursively search this directory
    }
    else {
      filePaths.push(absolutePath) //else add this file to the array of file paths
    }
  })

  return filePaths //return the file paths
}

/**
 * given a file path, return the file's extension
 * @param  filePath file path as string
 * @return          extension of the file without the dot
 */
function getFileExtension(filePath:string) {
  const split = filePath.split(".") //split up the string by the dots
  return split[split.length-1] //return the last array element
}

/**
 * given a file path and desired extension, return whether the file has the extension
 * @param  filePath  file path as string
 * @param  extension ie ".jpg", ".png", etc
 * @return           true/false whether the file path has the extension
 */
function hasFileExtension(filePath:string, extension:string) {
  return filePath.slice(filePath.length-extension.length) === extension
}

/**
 * given a file path, return whether the file has valid image extensions
 * @param  filePath
 * @return          true/false whether the file path has valid image extensions
 */
function isImage(filePath:string) {
  //TODO gifs?
  const validFilePaths:{[extension:string]:boolean} = {
    jpg: true,
    jpeg: true,
    png: true,
  }

  return validFilePaths[ getFileExtension(filePath).toLowerCase() ] === true
}

/**
 * given a file path, return a string with a replaced extension
 * @param  filePath     file path
 * @param  newExtension extension to replace
 * @return              [description]
 */
function replaceExtension(filePath:string, newExtension:string) {
  const split = filePath.split(".") //split the string by the dots
  split[split.length-1] = newExtension //replace the file extension
  return split.join(".") //join the array into a string
}

module.exports = convertToWebFormats
