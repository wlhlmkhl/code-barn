import { clearAllPosts } from "../utils/utils.mjs";

export default async function deleteAllPosts() {
  clearAllPosts();
  console.log("The CodeBarn is empty");
}
