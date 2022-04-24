import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { extractData, validateFields } from "../utils.js";
import { editContentDetails, loadContentDetails } from "../services/content-services.js";

const mainElement = document.querySelector("#content");

export async function renderEdit(ctx) {
  const contentId = ctx.params.id;

  const content = await loadContentDetails(contentId);

  async function onSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    const formData = new FormData(form);

    let isValid = validateFields(formData);

    if (isValid) {
      const edittedContent = extractData(formData);

      if (edittedContent) {
        let response = await editContentDetails(contentId, edittedContent);

        if (response.status == 200) {
          let edittedPost = await response.json();
          alert("Pet editted successfully!");
          page.redirect(`/details/${edittedPost._id}`);
        } else {
          console.log("Server error");
        }
      }
    } else {
      console.log("Invalid input");
    }
  }

  render(editTemplate(content, onSubmit), mainElement);
}

const editTemplate = (content, onSubmit) => html`
  <section id="editPage">
    <form class="editForm" @submit=${onSubmit}>
      <img src="./images/editpage-dog.jpg" />
      <div>
        <h2>Edit PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" value="${content.name}" />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" value="${content.breed}" />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" value="${content.age} years" />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input
            name="weight"
            id="weight"
            type="text"
            value="${content.weight}kg"
          />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input name="image" id="image" type="text" value="${content.image}" />
        </div>
        <button class="btn" type="submit">Edit Pet</button>
      </div>
    </form>
  </section>
`;
