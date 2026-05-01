const inputItem = document.getElementById("input-item")
const botaoAdicionar = document.getElementById("botao-adicionar")
const listaCompras = document.getElementById("lista-compras")
const mensagem = document.getElementById("mensagem")

const itensIniciais = [
  { texto: "Arroz", concluido: false },
  { texto: "Leite", concluido: false },
  { texto: "Pão", concluido: false }
]

function mostrarMensagem(texto) {
  mensagem.textContent = texto

  setTimeout(function () {
    mensagem.textContent = ""
  }, 2000)
}

function salvarItens() {
  const itens = []
  const lista = document.querySelectorAll("li")

  lista.forEach(function (li) {
    const texto = li.querySelector("span").textContent
    const concluido = li.classList.contains("concluido")

    itens.push({
      texto: texto,
      concluido: concluido
    })
  })

  localStorage.setItem("listaCompras", JSON.stringify(itens))
}

function criarItem(textoItem, concluido = false) {
  const li = document.createElement("li")
  const checkbox = document.createElement("input")
  const span = document.createElement("span")
  const botaoRemover = document.createElement("button")

  checkbox.type = "checkbox"
  checkbox.checked = concluido

  span.textContent = textoItem
  botaoRemover.textContent = "🗑️"

  if (concluido) {
    li.classList.add("concluido")
  }

  checkbox.addEventListener("change", function () {
    li.classList.toggle("concluido")
    salvarItens()
  })

  botaoRemover.addEventListener("click", function () {
    li.remove()
    mostrarMensagem("Item removido com sucesso")
    salvarItens()
  })

  li.appendChild(checkbox)
  li.appendChild(span)
  li.appendChild(botaoRemover)

  listaCompras.appendChild(li)
}

function adicionarItem() {
  const textoItem = inputItem.value.trim()

  if (textoItem === "") {
    mostrarMensagem("Digite um item antes de adicionar")
    return
  }

  criarItem(textoItem)

  salvarItens()

  inputItem.value = ""
  inputItem.focus()

  mostrarMensagem("Item adicionado com sucesso")
}

function carregarItens() {
  const itensSalvos = JSON.parse(localStorage.getItem("listaCompras"))

  if (itensSalvos && itensSalvos.length > 0) {
    itensSalvos.forEach(function (item) {
      criarItem(item.texto, item.concluido)
    })
  } else {
    itensIniciais.forEach(function (item) {
      criarItem(item.texto, item.concluido)
    })

    salvarItens()
  }
}

botaoAdicionar.addEventListener("click", adicionarItem)

inputItem.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    adicionarItem()
  }
})

carregarItens()