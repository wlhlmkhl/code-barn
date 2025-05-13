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
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

export const clearAllPosts = async () => {
  try {
    db.data.snippets = [];
    await db.write();
  } catch (error) {
    console.error("Failed to clear posts:", error);
  }
};
export function extractNumber(input) {
  const number = input.split("-")[0].trim(); // Dela strängen vid "-" och ta första delen
  return parseInt(number, 10); // Konvertera till ett heltal
}
