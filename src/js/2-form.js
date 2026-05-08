const formData = {
    email: "",
    message: "",
};

const STORAGE_KEY = "feedback-form-state";

const formEl = document.querySelector(`.feedback-form`);
formEl.addEventListener(`input`, (e) => {
    formData.email = formEl.elements.email.value;
    formData.message = formEl.elements.message.value;
    saveToLS(STORAGE_KEY, formData);
});

document.addEventListener(`DOMContentLoaded`, () => {
    const savedData = getFromLS(STORAGE_KEY);
    if (!savedData){
        return;
    }
    Object.assign(formData, savedData);
    formEl.elements.email.value = savedData.email;
    formEl.elements.message.value = savedData.message;
});

formEl.addEventListener(`submit`, (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.message === "") {
        alert("Fill please all fields");
        return;
    }
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    formData.email = "";
    formData.message = "";
    formEl.reset();
})


function saveToLS(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
}

function getFromLS(key) {
    const json = localStorage.getItem(key);
    const result = JSON.parse(json);
    return result;
}
