import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";

import { validateFields } from "../utils.js";
import { signup } from "../services/user-services.js";

const mainElement = document.querySelector("#content");

export async function renderSignup(ctx) {
  async function onSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email"); 
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");


    let isValid = validateFields(formData);
    if (isValid) {
      if (password === repeatPassword) {
    
        let respo = await signup({email, password});
        if (respo.email == email) {
         
          localStorage.setItem("user", JSON.stringify(respo));
          form.reset();

          page.redirect("/");

        } else {
          alert("This email is taken!");
        }
      } else {
        alert("Passwords don't match!");
      }
    }
  }

  render(signupTemplate(onSubmit), mainElement);
}

const signupTemplate = (onSubmit) => html`
 <section id="registerPage">
            <form class="registerForm" @submit=${onSubmit}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>
`;