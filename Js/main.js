const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')

const items = JSON.parse(localStorage.getItem('Itens')) || []

items.forEach(element => {
    criaElemento(element)
});


form.addEventListener('submit', (event) => {
    event.preventDefault()

    const nome = event.target.elements['nome']
    const quantidade = event.target.elements['quantidade']


    const existe = items.find(elemento => elemento.Nome === nome.value)

    const itemAtual = {
        "Nome": nome.value,
        "Qtd": quantidade.value,
    }

    if (existe) {

        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        items[items.findIndex(element => element.id === existe.id)] = itemAtual


    } else {

        itemAtual.id = items[items.length -1] ? (items[items.length - 1]).id + 1  : 0

        criaElemento(itemAtual)

        items.push(itemAtual)

    }

    localStorage.setItem('Itens', JSON.stringify(items))


    nome.value = ''
    quantidade.value = ''

})


function criaElemento(item) {

    const novoItem = document.createElement('li')
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.Qtd
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += item.Nome

    novoItem.appendChild(botaoDel(item.id))
    lista.appendChild(novoItem)

}


function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.Qtd
}


function botaoDel(id) {
    const elemento_btn = document.createElement('button')
    elemento_btn.setAttribute('class', 'btn_remove')
    elemento_btn.innerText = '-'

    elemento_btn.addEventListener('click', function () {
        deletaElemetno(this.parentNode, id)
    })

    return elemento_btn
}

function deletaElemetno(tag, id) {
    tag.remove()

    items.splice(items.findIndex(element => element.id === id), 1)

    localStorage.setItem('Itens', JSON.stringify(items))
}