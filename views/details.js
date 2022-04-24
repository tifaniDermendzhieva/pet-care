import { html, render } from "../node_modules/lit-html/lit-html.js";
import { loadContentDetails, loadDonationSum, userHasDonated } from "../services/content-services.js";

const mainElement = document.querySelector("#content");

export async function renderDetails(ctx) {
  const contentId = ctx.params.id;
  let userId;
  let isLogged = false;
  if (ctx.user) {
    userId = ctx.user._id;
    isLogged = true;
  } else {
    userId = false;
  }

  let content = await loadContentDetails(contentId);

  const contentOwner = content._ownerId;
  let isOwner = userId == contentOwner;

  ////bonus 
  
  const hasDonated = Boolean(await userHasDonated(userId, contentId));
  const currentDonation = await loadDonationSum(contentId);

  render(detailsTemplate(content, isOwner, isLogged, hasDonated, currentDonation), mainElement);
}

const detailsTemplate = (content, isOwner, isLogged, hasDonated, currentDonation) => html`
  <section id="detailsPage">
    <div class="details">
      <div class="animalPic">
        <img src="${content.image}" />
      </div>
      <div>
        <div class="animalInfo">
          <h1>Name: ${content.name}</h1>
          <h3>Breed: ${content.breed}</h3>
          <h4>Age: ${content.age}</h4>
          <h4>Weight: ${content.weight}</h4>
          <h4 class="donation">Donation: ${
            currentDonation? currentDonation+'00$' : '0$'}
          </h4>
        </div>

        ${isLogged
          ? html`
          <div class="actionBtn">
              ${isOwner
                ? html`<a href="/edit/${content._id}" class="edit">Edit</a>
                    <a href="/delete/${content._id}" class="remove">Delete</a>`
                : hasDonated
                  ? ""
                  :html`<a href="/donate/${content._id}" class="donate">Donate</a>`
                }
            </div>`
          : ""}
      </div>
    </div>
  </section>
`;
