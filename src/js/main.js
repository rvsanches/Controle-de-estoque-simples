import {Backend} from "./backend.js";

const API = new Backend();
API.setBaseUrl("http://localhost:3000");
console.log(API.getBaseUrl());

const spanNome = document.querySelector("#nomeMenu");
const selectMarcas = document.querySelector("#select-marcas");
const formProduto = document.querySelector("#form-add-produto");
const formProdutoNome = document.querySelector("#input-produto-nome");
const formProdutoQtdade = document.querySelector("#input-produto-qtdade");
const formProdutoValor = document.querySelector("#input-produto-valor");
const formMarca = document.querySelector("#form-add-marca");
const formMarcaNome = document.querySelector("#input-marca-nome");
const listaProdutos = document.querySelector("#lista-produtos");

const geraNome = () => {
    API.get("/admins")
    .then(data => {
        console.log(data);
        spanNome.textContent = data[data.length-1].nomeAdmin;
        document.title = `Olá, ${data[data.length-1].nomeAdmin}`
    })
}
geraNome();

const trazMarcas = () => {
    API.get("/marcas")
    .then(data => {
        console.log(data);
        data.forEach(function(marca) {
            selectMarcas.insertAdjacentHTML("beforeend", `<option data-marca="${marca.id}">${marca.nomeMarca}</option>`)
        })
    })
}
trazMarcas();

const trazAmbos = () => {
    API.getBoth("/produtos", "/marcas")
    .then(data => {
        console.log(data);
        data[0].forEach(function(produto) {
            const nomeDaMarca = data[1][produto.marcaId - 1].nomeMarca;
            let itemQuantidade = "";
            if (produto.quantidade <= 1) {
                itemQuantidade = `${produto.quantidade} unidade`
            } else {
                itemQuantidade = `${produto.quantidade} unidades`
            }
            listaProdutos.insertAdjacentHTML("afterbegin", `
            <li>
                <div class="card shadow mb-3 border-my-dark-light">
                    <div class="card-body p-2">
                        <div class="row no-gutters align-items-center">
                            <div class="col-3">
                                ${produto.nomeProduto}
                            </div>
                            <div class="col-3">
                                ${nomeDaMarca}
                            </div>
                            <div class="col-2 text-center">
                                ${itemQuantidade}
                            </div>
                            <div class="col-2 text-center">
                                R$ ${produto.valor}
                            </div>
                            <div class="col-2 text-right">
                                <button class="btn btn-sm btn-outline-my-blue">Editar</button>
                                <button class="btn btn-sm btn-outline-my-red ml-2">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `)
        })
    })
}
trazAmbos();

const addNovoProduto = () => {
    API.post("/produtos", {
        nomeProduto: formProdutoNome.value,
        valor: formProdutoValor.value,
        quantidade: formProdutoQtdade.value,
        marcaId: selectMarcas.options[selectMarcas.selectedIndex].dataset.marca
    }).then(data => {
        console.log(data);
    })
}

const addNovaMarca = () => {
    API.post("/marcas", {
        nomeMarca: formMarcaNome.value
    }).then(data => {
        console.log(data);
    })
}

formProduto.addEventListener("submit", event => {
    if(!formProdutoNome.value) {
        formProdutoNome.classList.add("is-invalid");
    } else {
        formProdutoNome.classList.remove("is-invalid");
        addNovoProduto();
    }
    event.preventDefault();
})

formMarca.addEventListener("submit", event => {
    if(!formMarcaNome.value) {
        formMarcaNome.classList.add("is-invalid");
    } else {
        formMarcaNome.classList.remove("is-invalid");
        addNovaMarca();
    }
    event.preventDefault();
})
