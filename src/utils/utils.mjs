import crypto from "node:crypto";
import db from "../lib/lowdb.js";

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

export const getPosts = () => {
  try {
    const snippets = db.data.snippets;
    return snippets;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
};
export const getPostById = (id) => {
  try {
    const data = db.data.snippets.find((item) => item.id === id);
    return data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

export const deleteAllPosts = async () => {
  try {
    db.data.snippets = [];
    await db.write();
  } catch (error) {
    console.error("Failed to clear snippets:", error);
  }
};

export const deletePostByid = async (id) => {
  try {
    db.data.snippets = db.data.snippets.filter((item) => item.id !== id);
    await db.write();
  } catch (error) {
    console.error("Failed to clear snippet:", error);
  }
};

export function extractNumber(input) {
  const number = input.split("-")[0].trim(); // Dela strängen vid "-" och ta första delen
  return parseInt(number, 10); // Konvertera till ett heltal
}

export function createFile(folderPath, fileName, content) {
  const filePath = path.join(folderPath, fileName);
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Failed to create file at "${targetPath}":`, error.message);
  }
}
