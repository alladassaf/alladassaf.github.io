const navLinks = document.querySelectorAll('.nav ul li')
const banner = document.querySelector('.banner')
const slidesParent = document.querySelector('.slides')
const slides = document.querySelectorAll('.slide')
const reviewsContainer = document.querySelector('.reviews-container')
const reviewsParent = document.querySelector('.reviews')
const reviews = document.querySelectorAll('.review')
const pagePath = window.location.pathname.replace("/","")



// Home Page Features
const splitPathHome = navLinks[0].querySelector('a').href.split('/')
const homePath = splitPathHome[splitPathHome.length - 1]

if (pagePath == homePath) {

    const leftArr = document.querySelector('.btn.left')
    const rightArr = document.querySelector('.btn.right')


    leftArr.addEventListener('click', () => {moveSlides(-1, slides, slidesParent)})
    rightArr.addEventListener('click', () => {moveSlides(1, slides, slidesParent)})
    console.log(leftArr)
    console.log(rightArr)
}

// Menu Page Features
const splitPathMenu = navLinks[1].querySelector('a').href.split('/')
const menuPath = splitPathMenu[splitPathMenu.length - 1]

if (pagePath == menuPath) {
    const menuItems = document.querySelectorAll('.menu-items li')
    const menuCards = document.querySelectorAll('.menu-cards section')

    menuCards.forEach((sec, i) => {
        if (i != 0) {
            sec.style.transform = 'translateX(-100%)'
            sec.style.opacity = '0'
        } else {
            sec.style.transform = 'translateX(0)'
            sec.style.opacity = '1'
        }
    })


    menuItems.forEach((item, ind) => {

        item.addEventListener('click', () => {

            menuCards.forEach((sec, i) => {
                if (ind != i) {
                    sec.style.transform = 'translateX(-100%)'
                    sec.style.opacity = '0'
                }
            })

            if (menuCards[ind].style.transform != 'translateX(0)' && menuCards[ind].style.opacity != '1') {
                menuCards[ind].style.transform = 'translateX(0)'
                menuCards[ind].style.opacity = '1'
            }
        })
    })


    console.log('Menu Path')
}


// console.log(menuItems)
const options = {
    threshold: 0.5,
    rootMargin: '-50px 0px 0px 0px'
}

let bannerIndex = 0
let reviewIndex = 0



window.onload = () => {
    reviews.forEach(el => {
        const carousel = document.createElement('div')
        carousel.className = 'carousel'

        reviewsContainer.appendChild(carousel)
    })
}

function moveSlides(interval, list, parent) {
    bannerIndex = bannerIndex + interval
    
    if (bannerIndex < 0) {
        bannerIndex = list.length - 1
    }
    
    if (bannerIndex > list.length - 1) {
        bannerIndex = 0
    }
    
    console.log(list)
    console.log(bannerIndex)
    
    parent.style.transform = `translateX(-${100 * bannerIndex}%)`
    
}
