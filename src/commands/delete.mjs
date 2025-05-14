import { deleteAllPosts, deletePostByid } from "../utils/utils.mjs";

export function deleteAll() {
  deleteAllPosts();
  console.log("The CodeBarn is empty");
}

export function deleteById(id) {
  deletePostByid(id);
  console.log(`Snippet with ID: ${id} has been deleted`);
}
