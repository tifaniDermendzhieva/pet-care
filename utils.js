export function validateFields(formData) {
  let input = formData.values();
  let data = Array.from(input);
  let isValid = true;

  for (let value of data) {
    if (value == "") {
      isValid = false;
      return alert("All fields are required!");
    }
  }
  return isValid;
}

export function extractData(formData) {
  let data = formData.entries();
  let object = {};

  for (let pair of data) {
    let [key, value] = pair;
    object[key] = value;
  }
  return object;
}

export function selectFormInputElements(form){

    let formData = new FormData(form);
    let formKeys = formData.keys();
    let formElementObject= {};

    for (let key of formKeys){

        let currentElement = document.querySelector(`input[name="${key}"]`);
        
        console.log(currentElement);

        formElementObject[key]=currentElement;

    }

    console.log(formElementObject);
    return formElementObject;

}
