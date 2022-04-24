import page from "../node_modules/page/page.mjs";

const userURL = "http://localhost:3030/users";

export async function logout(ctx) {
  const accessToken = ctx.user.accessToken;

  const requestType = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
  };

  try {
    const response = await fetch(`${userURL}/logout`, requestType);

    if (response.status == 204) {
      localStorage.removeItem("user");
      alert("Successfully logged out!");
      page.redirect('/');
    }
  } catch (err) {
    console.log(err.message);
  }
}
