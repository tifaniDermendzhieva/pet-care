import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";

import { login } from "../services/user-services.js";
import { extractData, validateFields } from "../utils.js";

const mainElement = document.querySelector("#content");

export async function renderLogin(ctx) {
  async function onSubmit(e) {
    e.preventDefault();
    let form = e.currentTarget;
    const formData = new FormData(form);

    let isValid = validateFields(formData);

    if (isValid) {
      let userInput = extractData(formData);
      let user = await login(userInput);

      if (user.email) {
        localStorage.setItem("user", JSON.stringify(user));
        form.reset();
        page.redirect("/");
      } else {
        alert("Incorrect username or password!");
      }
    }
  }

  render(loginTemplate(onSubmit), mainElement);
}

const loginTemplate = (onSubmit) => html`
  <section id="loginPage">
    <form class="loginForm" @submit=${onSubmit}>
      <img src="./images/logo.png" alt="logo" />
      <h2>Login</h2>

      <div>
        <label for="email">Email:</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="steven@abv.bg"
          value=""
        />
      </div>

      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          value=""
        />
      </div>

      <button class="btn" type="submit">Login</button>

      <p class="field">
        <span>If you don't have profile click <a href="/signup">here</a></span>
      </p>
    </form>
  </section>
`;
