import { html, render } from "../node_modules/lit-html/lit-html.js";
import { loadAllContent } from "../services/content-services.js";

const mainElement = document.querySelector("#content");

export async function renderCatalogue(ctx) {

  let isLogged = Boolean(ctx.user);
  let content = await loadAllContent();
  render(catalogueTemplate(content, isLogged), mainElement);
}

const catalogueTemplate = (content, isLogged) => html`
<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
<div class="animals-dashboard">
    
  ${ content.length > 0
   ? content.map(pet=> html`<div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src="${pet.image}">
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a class="btn" href="/details/${pet._id}">Details</a>
        </div>
    </div>`)
    : html` <div><p class="no-pets">No pets in dashboard</p></div>`
  }
</div>
</section>
`;
