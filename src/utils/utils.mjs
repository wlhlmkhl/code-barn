import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import db from "../lib/lowdb.mjs";

// Adds a new snippet to the database with a unique ID, timestamp, title, and code.
export const addNewPost = async (title, content) => {
  try {
    const snippets = db.data.snippets;
    snippets.push({
      id: crypto.randomUUID(),
      savedAt: Date.now(),
      title: title,
      code: content,
    });
    await db.write();
  } catch (error) {
    console.error("Failed to add new post:", error);
  }
};

// Returns all snippets from the database.
export const getPosts = () => {
  try {
    const snippets = db.data.snippets;
    return snippets;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};

// Finds and returns a snippet by its unique ID.
export const getPostById = (id) => {
  try {
    const data = db.data.snippets.find((item) => item.id === id);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

// Removes all snippets from the database.
export const deleteAllPosts = async () => {
  try {
    db.data.snippets = [];
    await db.write();
  } catch (error) {
    console.error("Failed to clear snippets:", error);
  }
};

// Deletes a snippet from the database by its unique ID.
export const deletePostById = async (id) => {
  try {
    db.data.snippets = db.data.snippets.filter((item) => item.id !== id);
    await db.write();
  } catch (error) {
    console.error("Failed to clear snippet:", error);
  }
};

// Extracts and returns the number at the start of a string, before the first hyphen.
export const extractNumber = (input) => {
  const number = input.split("-")[0].trim();
  return parseInt(number, 10);
};

// Creates a new file in the specified folder, prepending the content with a comment containing the snippet ID and an 'r'.
export const createFile = (folderPath, fileName, content, id) => {
  const filePath = path.join(folderPath, fileName);
  try {
    const comment = `r\n// ID: ${id}\n`;
    const newContent = comment + content;
    fs.writeFileSync(filePath, newContent);
  } catch (error) {
    console.error(`Failed to create file at "${folderPath}":`, error.message);
  }
};

// Reads and returns the content of a file at the given path.
export const readFileContent = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Failed to read file:", error);
    return null;
  }
};

// Returns a list of file names in the specified folder. Throws an error if the folder is empty.
export const readFolderContent = (folderPath) => {
  try {
    const fileNames = fs.readdirSync(folderPath);
    if (fileNames.length === 0) {
      throw new Error("The directory is empty.");
    }
    return fileNames;
  } catch (error) {
    console.error("Failed to read directory:", error);
    return [];
  }
};

// Deletes the file at the specified path.
export const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};
