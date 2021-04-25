var items = ["Rock", "Paper", "Scissors"]

var user_points = 0
var comp_points = 0
var count = 0

// Instructions
document.getElementById("display").value += "Welcome To Rock Paper Scissors Game\n\nYou Can Press 1 2 3 Keys On Keyboard To Represent Rock Paper Scissors\nAnd You Can Click Rock Paper Scissors Buttons Start The Game\nPress Enter Or Click Done To Get The Score And Reset The Game\n\n		            Let's Get Started...\n\n\n"

// Methods

function button_pressed(str){

    if(count == 0){
        document.getElementById("display").value = ""
    }

    // Computer selecting from the items array
    comp = items[Math.floor(Math.random() * 3 )]

    // Incrementing the count
    count++

    // Showing who got a point
    document.getElementById("display").value += "(" + count + ") User: " + str + "\n"
    document.getElementById("display").value += "Computer: " + comp + "\n"

    if(comp == str){
        document.getElementById("display").value += ">>> Tie\n\n"
        document.getElementById("tie").play()
    }else if(comp == "Rock" && str == "Paper"){
        document.getElementById("display").value += ">>> You Got A Point: Paper Covered The Rock\n\n"
        document.getElementById("you_point").play()
        user_points += 1
    }else if(comp == "Paper" && str == "Rock"){
        document.getElementById("display").value += ">>> Computer Got A Point: Paper Covered The Rock\n\n"
        document.getElementById("comp_point").play()
        comp_points += 1
    }else if(comp == "Scissors" && str == "Rock"){
        document.getElementById("display").value += ">>> You Got A Point: Rock Smashed The Scissors\n\n"
        document.getElementById("you_point").play()
        user_points += 1
    }else if(comp == "Rock" && str == "Scissors"){
        document.getElementById("display").value += ">>> Computer Got A Point: Rock Smashed The Scissors\n\n"
        document.getElementById("comp_point").play()
        comp_points += 1
    }else if(comp == "Paper" && str == "Scissors"){
        document.getElementById("display").value += ">>> You Got A Point: Scissors Cuts The Paper\n\n"
        document.getElementById("you_point").play()
        user_points += 1
    }else if(comp == "Scissors" && str == "Paper"){
        document.getElementById("display").value += ">>> Computer Got A Point: Scissors Cuts The Paper\n\n"
        document.getElementById("comp_point").play()
        comp_points += 1
    }

    // To update the score
    document.getElementById("player_score").innerHTML = "Player: " + user_points + " &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Computer: " + comp_points
    
    // To scroll the textarea
    var textarea = document.getElementById('display')
    textarea.scrollTop = textarea.scrollHeight

}

function done_pressed(){

    if(count == 0){
        document.getElementById("display").value = ""
        document.getElementById("display").value += ">>> Play The Game To Know Who Won!"
        return
    }

    if(user_points == comp_points){
        document.getElementById("display").value += "\n\nUser: " + user_points+ "\nComputer: " + comp_points + "\n>>> Tie\n\n"
        document.getElementById("tie").play()
    }else if(user_points > comp_points){
        document.getElementById("display").value += "\n\nUser: " + user_points+ "\nComputer: " + comp_points + "\n>>> You Won The Game\n\n"
        document.getElementById("you_won").play()
    }else if(user_points < comp_points){
        document.getElementById("display").value += "\n\nUser: " + user_points+ "\nComputer: " + comp_points + "\n>>> Computer Won The Game\n\n"
        document.getElementById("comp_won").play()
    }

    var textarea = document.getElementById('display')
    textarea.scrollTop = textarea.scrollHeight

    // Reseting the points
    user_points = 0
    comp_points = 0

    document.getElementById("player_score").innerHTML = "Player: " + user_points + " &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Computer: " + comp_points
}

// Key press events

window.onkeydown = function(event) {

    if (event.keyCode == 13){
        // Enter
        done_pressed();
    }else if (event.keyCode == 49){
        // 1
        button_pressed("Rock");
    }else if (event.keyCode == 50){
        // 2
        button_pressed("Paper");
    }else if (event.keyCode == 51){
        // 3
        button_pressed("Scissors");
    }

};
