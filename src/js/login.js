import {Backend} from "./backend.js";

const API = new Backend();
API.setBaseUrl("http://localhost:3000");
console.log(API.getBaseUrl());

const novoAdmin = () => {
    API.post("/admins", {
        nomeAdmin: nomeLogin.value
    }).then(data => {
        console.log(data);
        window.location.href = "dashboard.html";
    })
}

const nomeLogin = document.querySelector("#inputNome");
const btnLogin = document.querySelector("#formLogin");

btnLogin.addEventListener("submit", event => {
    event.preventDefault();
    if (!nomeLogin.value) {
        nomeLogin.classList.add("is-invalid");
    } else {
        nomeLogin.classList.remove("is-invalid");
        nomeLogin.classList.add("is-valid");
        btnLogin.setAttribute("disabled", "disabled");
        btnLogin.innerHTML = `<div class="spinner-border spinner-border-sm text-dark" role="status">
            <span class="sr-only">Loading...</span>
        </div>`;
        novoAdmin();
    }
})