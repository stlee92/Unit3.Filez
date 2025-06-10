import express from "express";
const express = express.Router();
export default Router;

import {
  getFiles,
  createFile,
  getFilesIncludingFolderName,
} from "#db/queries/files";

// CREATE FILES
Router.route("/").post(async (req, res) => {
  const { name, size, folderId } = req.body;
  if (!req.body)
    return res.status(400).json({ message: "Please provide a body." });
  if (!name || !size || !folderId)
    return res.status(400)({
      message: "Please provide a name, size, and folderId",
    });
  const newFile = await createFile();
  return newFile;
});

// GET FILES
Router.route("/").get(async (req, res) => {
  if (!files) return res.status(404).json({ message: "No files available." });
  const files = getFiles();
  return files;
});

// GET FILES INCLUDING FOLDER NAME
Router.route("/");
