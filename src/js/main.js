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

const trazProdutos = () => {
    API.get("/produtos")
    .then(data => {
        console.log(data);
        data.forEach(function(produto) {
            let itemQuantidade = "";
            if (produto.quantidade <= 1) {
                itemQuantidade = `${produto.quantidade} unidade`
            } else {
                itemQuantidade = `${produto.quantidade} unidades`
            }
            listaProdutos.insertAdjacentHTML("afterbegin", `
            <li>
                <div class="card shadow-sm mb-3">
                    <div class="card-body p-2">
                        <div class="row no-gutters">
                            <div class="col-3">
                                ${produto.nomeProduto}
                            </div>
                            <div class="col-3">
                                ${produto.marcaId}
                            </div>
                            <div class="col-2">
                                ${itemQuantidade}
                            </div>
                            <div class="col-2">
                                R$ ${produto.valor}
                            </div>
                            <div class="col-2">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `)
        })
    })
}
trazProdutos();

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
    event.preventDefault();
    if(!formProdutoNome.value) {
        formProdutoNome.classList.add("is-invalid");
    } else {
        formProdutoNome.classList.remove("is-invalid");
        addNovoProduto();
    }
})

formMarca.addEventListener("submit", event => {
    event.preventDefault();
    if(!formMarcaNome.value) {
        formMarcaNome.classList.add("is-invalid");
    } else {
        formMarcaNome.classList.remove("is-invalid");
        addNovaMarca();
    }
})