import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const CHARACTERS_PER_PAGE = 20;

router.get("/about/:id", (req, res) => {
  const { id } = req.params;
  const page = Math.ceil(id / CHARACTERS_PER_PAGE);
  const filePath = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "../../db",
    `${page}.json`
  );

  fs.readFile(filePath, "utf-8", (error, fileData) => {
    if (error) {
      return res.status(404).json({
        error:
          "No information associated with the searched character was found",
      });
    }

    try {
      const data = JSON.parse(fileData);
      const requiredData = data?.list.find(
        (character) => character.id === parseInt(id)
      );
      res.json(requiredData);
    } catch (error) {
      res
        .status(500)
        .json({ error: "The file reading could not be completed" });
    }
  });
});

export default router;
