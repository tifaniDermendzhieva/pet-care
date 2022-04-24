import page from "../node_modules/page/page.mjs";
import { deleteContent } from "../services/content-services.js";

export async function deleteIt(ctx) {
  const contentId = ctx.params.id;

  let confirmation = confirm("Are you sure you want to delete this pet?");

  if (confirmation) {
    let response = await deleteContent(contentId);

    if (response.status == 200) {
      page.redirect("/");
    }
  }
}
