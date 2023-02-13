const resultsContainer = document.querySelector('.results-container')
const inputEl = document.querySelector('.search-input')
const searchBTN = document.querySelector('.search-box button')


window.onload = () => {
    inputEl.value = ''
}

console.log(inputEl)
let results = []
async function getData() {
    const res = await fetch('https://restcountries.com/v3.1/all')
    const data = await res.json()

    createCard(data)
}

function createCard(data) {

    results = data.map(el => {
        const card = document.createElement('div')
        card.classList.add('card')
        resultsContainer.appendChild(card)

        const top = document.createElement('div')
        top.classList.add('top')
        card.insertAdjacentElement('afterbegin', top)
        // top.style.backgroundImage = `url(${})`

        const bottom = document.createElement('div')
        bottom.classList.add('bottom')
        card.insertAdjacentElement('beforeend', bottom)


        bottom.innerHTML = `<ul>
                                <li>Lat: ${el.latlng[0]}</li>
                                <li>Long: ${el.latlng[1]}</li>
                                <li>Flag: ${el.flag}</li>
                                <li>Fifa Team: ${el.fifa === undefined ? 'NA' : el.fifa}</li>
                            <ul>
                            <h3>${el.name.common}</h3>`

        return {
            card,
            abbrevaition: el.cca2,
            country: el.name.common
        }
    })

    console.log(results)


}


searchBTN.addEventListener('click', () => { searchCountry(inputEl, results)})

function searchCountry(inputVal, arr) {

    const targetText = inputVal.value
    console.log(arr)
    arr.forEach(card => {
        if (card.abbrevaition.toLowerCase().startsWith(targetText) || card.country.toLowerCase().startsWith(targetText)) {
            card.card.style.display = 'block'
        } else {
            card.card.style.display = 'none'
        }
    });
}

getData()