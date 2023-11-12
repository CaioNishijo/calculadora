// elements
const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container")

// class
class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    addDigit(digit){
        if(digit == "." && this.currentOperationText.innerText.includes(".")){
            return
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation){
        if(this.currentOperationText.innerText == "" && operation != "C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return
        }
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperation()
                break
            case "CE":
                this.processCeOperation()
                break
            case "C":
            this.processCOperation()
            break
                case "=":
                this.processEqualOperation()
                break
            default: 
                break
        }
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null){
        if(operationValue == null){
            this.currentOperationText.innerText += this.currentOperation  
        } else {
            if(previous == 0){
                operationValue = current
            }
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    
    changeOperation(operation){
        const mathOperations = ["+", "-", "/", "*"]
        if(!mathOperations.includes(operation)){
            return
        } 
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    processDelOperation(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }
    processCeOperation(){
        this.currentOperationText.innerText = ""
    }
    processCOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }
    processEqualOperation(){
        this.processOperation(previousOperationText.innerText.split(" ")[1])
    }
}

const calculator = new Calculator(previousOperationText, currentOperationText)

// events
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        
        const value = e.target.innerText
        if(+value >= 0 || value === "."){
            calculator.addDigit(value)
        } else {
            calculator.processOperation(value)
        }
    })
})