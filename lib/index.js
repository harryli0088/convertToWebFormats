#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const argumentImagePaths = process.argv.slice(2)


function convertToWebFormats() {
  const filePathsToConvert = ( //filter images only
    argumentImagePaths.length>0 ? argumentImagePaths : getAllFilePaths("./") //if the user supplies file paths to convert, use them, get find all files
  ).filter(f => isImage(f))

  filePathsToConvert.forEach(imagePath => {
    const webpFilePath = replaceExtension(imagePath,"webp") //get the name of the file if it were to be converted to webp

    //if a webp version of this file already exists
    if(fs.existsSync(webpFilePath)) {
      console.log("Webp already exists for",imagePath) //we don't need to do anything

    }
    else {
      //convert the image to webp
      sharp(imagePath).webp({ lossless: true }).toFile(webpFilePath, (err, info) => {
        if(err) return console.error("Failed converting",imagePath,err)
        console.log("Successfully converted",imagePath)
      })
    }
  })
}



function getAllFilePaths(directory, filePaths=[]) {
  fs.readdirSync(directory).forEach(file => {
    const absolutePath = path.join(directory, file) //get the absolutePath path of this file

    if (fs.statSync(absolutePath).isDirectory()) { //if this is a directory
      getAllFilePaths(absolutePath,filePaths) //recursively search this directory
    }
    else {
      filePaths.push(absolutePath) //else add this file to the array of file paths
    }
  })

  return filePaths
}

function getFileExtension(filePath) {
  const split = filePath.split(".")
  return split[split.length-1]
}

function hasFileExtension(filePath, extension) {
  return filePath.slice(filePath.length-extension.length) === extension
}

function isImage(filePath) {
  const validFilePaths = {
    jpg: true,
    jpeg: true,
    png: true,
  }

  return validFilePaths[ getFileExtension(filePath).toLowerCase() ] === true
}

function replaceExtension(filePath, newExtension) {
  const split = filePath.split(".")
  split[split.length-1] = newExtension
  return split.join(".")
}

module.exports = convertToWebFormats
