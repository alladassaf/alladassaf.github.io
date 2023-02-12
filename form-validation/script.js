const inputFields = document.querySelectorAll(".input-field")
const submitBTN = document.querySelector("button[type=submit]")

let working = false
submitBTN.disabled = true
submitBTN.classList.add("disabled")

window.onload = () => {
    inputFields.forEach(field => {
        const label = field.querySelector("label")
        const input = field.querySelector("input")
    
    
        input.value = ""

    })
}


inputFields.forEach(field => {
    const label = field.querySelector("label")
    const input = field.querySelector("input")

    input.addEventListener("focus", () => {
        field.classList.add("focused")
    })

    
    if (input.id == "cvv") {

        input.addEventListener("blur", () => {
            field.classList.remove("focused")
            checkInputBlanks(3)
        })

    } else if (input.id == "credit") {

        input.addEventListener("blur", () => {
            field.classList.remove("focused")
            checkInputBlanks(16)

            if (input.value == "" || input.value.length != 16) return            

            hideNum(input, input.value)
        })


    /*     input.addEventListener("input", e => {
            
            if (hideNum && e.key == "BACKSPACE") {
                e.target.value = ""
            }
        }) */
        
    /*     input.addEventListener("keydown", e => {

            if (isNaN(input.value)) return
            console.log("running")
        }) */
    } else {

        input.addEventListener("blur", () => {
            field.classList.remove("focused")
            checkInputBlanks(input, 10)            
        })
    }


})




function checkInputBlanks(input, limit) {

    inputFields.forEach(field => {
        const label = field.querySelector("label")
        const input = field.querySelector("input")
    
    
        if (input.value != "" && input.value.length == limit) {
            working = true
        } else {
            working = false
        }
    
    
    })

    if (working) {
        submitBTN.disabled = false
        submitBTN.classList.remove("disabled")
    }

    addErr(input, limit)
    removeErr(input, limit)
}

function addErr(element, limit) {
    const parentDiv = element.parentElement
    const errMsg = document.createElement("span")
    errMsg.classList.add("errMsg")
    errMsg.innerText = `This field Must be at least ${limit} characters long.`

    if (parentDiv.querySelector("span.errMsg") !== null) return

    parentDiv.appendChild(errMsg)
}

function removeErr(element, limit) {
    const parentDiv = element.parentElement


    if (parentDiv.querySelector("span.errMsg") !== null && element.value.length == limit) {
        parentDiv.querySelector("span.errMsg").remove()
    } else {
        return
    }
}

function hideNum(element, userInput) {
    // Get last 4 characters
    const lastFourChars = userInput.slice(-4)

    const cardNumHidden = `XXXXXXXXXXXX${lastFourChars}`
    cardNumArr = []


    for (i=0; i<4; i++) {

        let slicedDigit = cardNumHidden.slice(i * 4, (i+1) * 4)

        cardNumArr.push(slicedDigit)
    }

    slicedDigit = cardNumArr.join("-")

    
    element.value = slicedDigit

    return true


}