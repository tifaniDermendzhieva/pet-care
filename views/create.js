import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { extractData, validateFields } from "../utils.js";
import { postContent } from "../services/content-services.js";

const mainElement = document.querySelector("#content");

export async function renderCreate(ctx) {
  async function onSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    const formData = new FormData(form);

    let isValid = validateFields(formData);

    if (isValid) {
      const newPet = extractData(formData);
      if (newPet) {
        let response = await postContent(newPet);
        if (response.status == 200) {
          form.reset();
          alert("Posted successfuly!");

          //redirect to home //
          page.redirect('/');
        } else {
          alert("Posting failed! Please try again!");
        }
      }
    } else {
      console.log("invalid input");
    }
  }

  render(createTemplate(onSubmit), mainElement);
}

const createTemplate = (onSubmit) => html`
  <section id="createPage">
    <form class="createForm" @submit=${onSubmit}>
      <img src="./images/cat-create.jpg" />
      <div>
        <h2>Create PetPal</h2>
        <div class="name">
          <label for="name">Name:</label>
          <input name="name" id="name" type="text" placeholder="Max" />
        </div>
        <div class="breed">
          <label for="breed">Breed:</label>
          <input name="breed" id="breed" type="text" placeholder="Shiba Inu" />
        </div>
        <div class="Age">
          <label for="age">Age:</label>
          <input name="age" id="age" type="text" placeholder="2 years" />
        </div>
        <div class="weight">
          <label for="weight">Weight:</label>
          <input name="weight" id="weight" type="text" placeholder="5kg" />
        </div>
        <div class="image">
          <label for="image">Image:</label>
          <input
            name="image"
            id="image"
            type="text"
            placeholder="./image/dog.jpeg"
          />
        </div>
        <button class="btn" type="submit">Create Pet</button>
      </div>
    </form>
  </section>
`;
