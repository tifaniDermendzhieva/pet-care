import { html, render } from "../node_modules/lit-html/lit-html.js";

const mainElement = document.querySelector("header");
export function renderNavigation(ctx, next) {
  const user = localStorage.getItem("user");

  if (user) {
    ctx.user = JSON.parse(user);
  }

  let isLogged = Boolean(ctx.user);

  render(navigationTemplate(isLogged), mainElement);
  next();
}

const navigationTemplate = (isLogged) => html`
  <nav>
    <section class="logo">
      <img src="./images/logo.png" alt="logo" />
    </section>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/catalogue">Dashboard</a></li>
      ${isLogged
        ? html`<li><a href="/create">Create Postcard</a></li>
            <li><a href="/logout">Logout</a></li>`
        : html`
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Register</a></li>
          `}
    </ul>
  </nav>
`;
