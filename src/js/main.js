import {Backend} from "./backend.js";

const API = new Backend();
API.setBaseUrl("http://localhost:3000");
console.log(API.getBaseUrl());

const geraNome = () => {
    API.get("/admins")
    .then(data => {
        console.log(data);
        spanNome.textContent = data[data.length-1].nomeAdmin;
        document.title = `Olá, ${data[data.length-1].nomeAdmin}`
    })
}

const spanNome = document.querySelector("#nomeMenu");

geraNome();