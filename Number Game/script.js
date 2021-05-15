// Operators
let operators = ['+', '-', '*', '/', '%', '^']


// Variables
let num1 = 0.0
let num2 = 0.0
let ans = 0.0
let range_var = 0
let op = ' '

// Score variables
let correct = 0
let mistake = 0



// Operations

function ques_eval(){

    range_var = Number(document.getElementById("range_box").value)

    if(range_var < 10 || range_var > 1000){
        range_var = 100
        document.getElementById("range_box").value = range_var
        alert("Enter the numbers in range (10 - 1000)")

        return
    }
    
    num1 = Math.floor((Math.random() * range_var) + 0)
    num2 = Math.floor((Math.random() * range_var) + 1)
    op = operators[Math.floor(Math.random() * 6)]  // 

    document.getElementById("ques").innerHTML = `${num1} ${op} ${num2} = `
    
    if(op == '+'){
        ans = num1 + num2
    }else if(op == '-'){
        ans = num1 - num2
    }else if(op == '*'){
        ans = num1 * num2
    }else if(op == '/'){
        ans = (num1 / num2).toFixed(2)
    }else if(op == '%'){
        ans = num1 % num2
    }else if(op == '^'){
        // Taking small numbers when performing 
        num1 = Math.floor((Math.random() * 9) + 0)
        num2 = Math.floor((Math.random() * 3) + 1)
        document.getElementById("ques").innerHTML = `${num1} ${op} ${num2} = `

        ans = Math.pow(num1, num2)
    }

}


function check_pressed(){

    let val = Number(document.getElementById("ans_box").value)
    if(ans == val){
        document.getElementById("c_sound").play()
        correct++
    }else{
        document.getElementById("m_sound").play()
        mistake++
    }

    document.getElementById("display").innerHTML = `${num1} ${op} ${num2} = ` + ans

    document.getElementById("score").innerHTML = `Correct: ${correct} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Mistake: ${mistake}`

    document.getElementById("ans_box").value = ""

    ques_eval()

}



// Key listener when enter pressed inside ans_box
document.getElementById("ans_box").addEventListener("keyup", function(event){

    if(event.key == "Enter"){
        check_pressed()
    }

})

// Key listener when enter pressed inside range_box
document.getElementById("range_box").addEventListener("keyup", function(event){

    if(event.key == "Enter"){
        document.getElementById("ans_box").focus()
        ques_eval()
    }

})


// Calling
ques_eval()
