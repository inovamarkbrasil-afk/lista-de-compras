const inputItem = document.getElementById("input-item")
const botaoAdicionar = document.getElementById("botao-adicionar")
const listaCompras = document.getElementById("lista-compras")
const mensagem = document.getElementById("mensagem")

const itensIniciais = ["Arroz", "Leite", "Pão"]

function criarItem(textoItem) {
  const li = document.createElement("li")
  const checkbox = document.createElement("input")
  const span = document.createElement("span")
  const botaoRemover = document.createElement("button")

  checkbox.type = "checkbox"
  span.textContent = textoItem
  botaoRemover.textContent = "🗑️"

  checkbox.addEventListener("change", function () {
    li.classList.toggle("concluido")
  })

  botaoRemover.addEventListener("click", function () {
    li.remove()
    mensagem.textContent = "Item removido com sucesso"
  })

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(botaoRemover)

  listaCompras.appendChild(li)
}

botaoAdicionar.addEventListener("click", function () {
  const textoItem = inputItem.value.trim()

  if (textoItem === "") {
    mensagem.textContent = "Digite um item antes de adicionar"
    return
  }

  mensagem.textContent = ""

  criarItem(textoItem)

  inputItem.value = ""
})

itensIniciais.forEach(function (item) {
  criarItem(item)
})