import express from "express";
const express = express.Router();
export default Router;

import { createFile } from "#db/queries/files";
import { getFolders, getFolderByIdIncludingFiles } from "#db/queries/folders";

// GET FOLDERS
router.route("/").get(async (req, res) => {
  const folders = await getFolders();
  return folders;
});

// GET FOLDERS BY ID
router.param("/:id", async (req, res, next, id) => {
  const folderById = await getFolderByIdIncludingFiles(id);
  if (!folderById)
    return res.status(404).json({ message: "Folder does not exist." });

  req.folder = folderById;
  next();
});

router.route("/:id").get(async (req, res) => {
  return res.send(req.folder);
});

// POST - CREATE NEW FILE RELATED TO FOLDER
router.route("/:id/files").post(async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "Request body is required." });

  if (!name || !size)
    return res.status(400).json({ message: "Please provide a request body." });

  const { name, size } = req.body;
  if (!req.body)
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });

  const file = await createFile(name, size, req.folder.id);
  res.status(201).send(file);
});
