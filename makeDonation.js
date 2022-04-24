import page from "./node_modules/page/page.mjs";
import { donate } from "./services/content-services.js";


export async function makeDonation(ctx) {
  const petId = ctx.params.id;
  const response = await donate(petId);

  if(response.status == 200){
    alert('Donation successful!');
    page.redirect(`/details/${petId}`);
  }

  
}
