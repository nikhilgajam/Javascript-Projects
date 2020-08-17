click_count = 0

function key_pressed(get){

    if(click_count < 12){

        let show = document.getElementById("display")
        if(show.innerHTML.toString() == "0"){
            show.innerHTML = get.innerHTML.toString()
        }else{
            show.innerHTML = show.innerHTML.toString() + get.innerHTML.toString()
        }

    }
    click_count++

}

function c_pressed(){

    document.getElementById("show").innerHTML = "&nbsp"
    document.getElementById("display").innerHTML = "0"

    click_count = 0

}

function equals_pressed(){

    let nums = document.getElementById("display").innerHTML.toString();

    if(nums.indexOf('+') != -1){

        nums = nums.split('+')
        document.getElementById("show").innerHTML = nums[0] + "+" + nums[1]
        nums = Number(nums[0]) + Number(nums[1])

    }else if(nums.indexOf('-') != -1){

        nums = nums.split('-')
        document.getElementById("show").innerHTML = nums[0] + "-" + nums[1]
        nums = Number(nums[0]) - Number(nums[1])

    }else if(nums.indexOf('×') != -1){

        nums = nums.split('×')
        document.getElementById("show").innerHTML = nums[0] + "×" + nums[1]
        nums = Number(nums[0]) * Number(nums[1])

    }else if(nums.indexOf('÷') != -1){

        nums = nums.split('÷')
        document.getElementById("show").innerHTML = nums[0] + "÷" + nums[1]
        nums = Number(nums[0]) / Number(nums[1])

    }else{

        document.getElementById("show").innerHTML = "Error"
        return

    }

    document.getElementById("display").innerHTML = nums.toString().substr(0, 12)


}