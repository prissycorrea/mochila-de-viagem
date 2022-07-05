const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    //previne o recarregamento da página ao enviar formulário
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']
    //verifica se o elemento já existe na lista
    const existe = itens.find(elemento => elemento.nome === nome.value)

    //objeto que será utilizado no local storage para que as informações não sejam sobescritas
    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

        //chamando a função que cria o elemento na lista
        criaElemento(itemAtual)

        //adiciona o novo item ao array
        itens.push(itemAtual)
    }

    //armazenando no local storage
    localStorage.setItem("itens", JSON.stringify(itens))

    //limpa o formulário após envio dos dados
    nome.value = ''
    quantidade.value = ''
})


//cria o elemento na lista, adicionando seu nome e quantidade
function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.nome
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerHTML = 'X'
    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}