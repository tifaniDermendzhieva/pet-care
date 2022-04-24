const allContentURL ="http://localhost:3030/data/pets?sortBy=_createdOn%20desc&distinct=name";
const detailedContentURL = "http://localhost:3030/data/pets";

export async function loadAllContent() {
  const requestType = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${allContentURL}`, requestType);
    const contentList = await response.json();

    return contentList;
  } catch (err) {
    console.log(err.message);
  }
}

export async function loadContentDetails(contentId) {
  const requestType = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${detailedContentURL}/${contentId}`, requestType);
    const content = await response.json();

    return content;
  } catch (err) {
    console.log(err.message);
  }
}

export async function postContent(newContent) {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const requestType = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify(newContent),
  };

  try {
    const response = await fetch(`${detailedContentURL}`, requestType);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

export async function editContentDetails(contentId, edittedContent) {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const requestType = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify(edittedContent),
  };

  try {
    const response = await fetch(`${detailedContentURL}/${contentId}`, requestType);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteContent(contentId) {
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;

  const requestType = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
  };

  try {
    const response = await fetch(`${detailedContentURL}/${contentId}`, requestType);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

///////////// Bonus /////////
const donateURL = 'http://localhost:3030/data/donation';
export async function donate (petId){
  
  const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
  const requestType = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({petId}),
  };
  
  try {
    const response = await fetch(`${donateURL}`, requestType);
    return response;
  } catch (err) {
    console.log(err.message);
  }
  
}

export async function loadDonationSum (petId){
  const petDonatedSumURL = `http://localhost:3030/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`;
  const requestType = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${petDonatedSumURL}`, requestType);
    const donationSum = await response.json();
    return donationSum;
  } catch (err) {
    console.log(err.message);
  }
}

export async function userHasDonated(userId, petId){
  const petDonatedSumURL = `http://localhost:3030/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`;
  const requestType = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

    },
  };

  try {
    const response = await fetch(`${petDonatedSumURL}`, requestType);
    const hasDonated = await response.json();
    return hasDonated;
  } catch (err) {
    console.log(err.message);
  }


}