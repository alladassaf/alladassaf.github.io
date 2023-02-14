const h1 = document.querySelector("h1")
const result = document.querySelector(".result")
const buttons = document.querySelectorAll("button")
const boxes = document.querySelectorAll(".guessing-options div")

let prevRandomIndex
let firstRandomIndex
let colorList = []
isStarted = false


buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        if (btn.dataset.btn == "reset") {
            reset()
        } else {
            getRandomRgbValue()
        }

    })
})

boxes.forEach(box => {
    box.addEventListener("click", () => {

        if (isStarted) {

            if (box.style.backgroundColor == correctColor) {
                outputResult("correct", "correct")
            } else {
                outputResult("incorrect", "wrong")
            }



        } else return
    })
})

function getRandomRgbValue() {

    reset()

    isStarted = true

    let value1 = randomNumber()
    let value2 = randomNumber()
    let value3 = randomNumber()


    correctColor = `rgb(${value1}, ${value2}, ${value3})`
    h1.textContent = correctColor
    colorList.push(correctColor)

    // console.log(correctColor)

    generateMultipleChioce()

    console.log(colorList)


}


function randomNumber() {
    return Math.floor(Math.random() * 256)
}

function generateMultipleChioce() {

    for (i = 0; i <= boxes.length - 2; i++) {
        let random = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`
        colorList.push(random)
    }


    boxes.forEach(box => {

        let randomIndex = Math.floor(Math.random() * boxes.length)

        while(randomIndex === prevRandomIndex || randomIndex === firstRandomIndex) {
            randomIndex = Math.floor(Math.random() * boxes.length)
            console.log(`While: ${randomIndex}`)
        }
        console.log(randomIndex)

        firstRandomIndex = prevRandomIndex
        prevRandomIndex = randomIndex
        console.log("\n" + prevRandomIndex)

        box.style.backgroundColor = colorList[randomIndex]
    })


}

function outputResult(output, message) {

    result.classList.add(output)
    result.innerHTML = 
    `
        <h1>${message}</h1>
    `

    setTimeout(() => {
        result.classList.remove(output)
        result.innerHTML = ""        
        getRandomRgbValue()
    }, 2000);


    result.addEventListener("transitionend", () => {

        

    })

}

function reset() {

    h1.innerText = "Click start to play.... if you dare"
    colorList = []
    randomIndex = ""
    prevRandomIndex = ""

    boxes.forEach(box => {
        box.style.backgroundColor = "black"
    })


}

reset()
