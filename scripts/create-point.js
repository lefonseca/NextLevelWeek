function populateUFs() {
  const ufSelect = document.querySelector("select[name = uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then( states => {
    
    for( const state of states ) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }

  } )
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("select[name = city]")
  const stateInput = document.querySelector("input[name = state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true;

  fetch(url)
  .then(res => res.json())
  .then( cities => {

    for( const city of cities ) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false;

  })
}

document
.querySelector("select[name = uf]")
.addEventListener("change",getCities)

// Itens of colect
// get all li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
  item.addEventListener("click",handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  
  const itemLi = event.target
  
  // add or remove an class with javascript
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // check if there are selected items, if yes
  //take the items selected

  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId // will this be true or false
    return item == itemId
  })

  // if it is already selected

  if( alreadySelected != -1) {
    //remove from selection
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    // if it is not already selected, add from selection
    selectedItems.push(itemId)
  }

  // update chosen filed(chosen filed = campos escolhidos) with the selected items
  collectedItems.value = selectedItems
}