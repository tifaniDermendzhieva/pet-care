const userURL = "http://localhost:3030/users";

export async function login(userData) {
  const requestType = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${userURL}/login`, requestType);
    const user = await response.json();
    return user;
  } catch (err) {
    console.log(err.message);
  }
}

export async function signup(userData) {
  const requestType = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${userURL}/register`, requestType);
    const user = await response.json();
    return user;
  } catch (err) {
    console.log(err.message);
  }
}
