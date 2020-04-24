                            //variables
var play = document.getElementById("play"),
    playAgain = document.getElementById("playAgain"),
    container = document.getElementById("container"),
    containerHeight = Math.round(container.getBoundingClientRect().height),
    basket = document.getElementById("basket"),
    basketHeight = Math.round(basket.getBoundingClientRect().height),
    playMusic = document.getElementById("playMusic"),
    gameOverMusic = document.getElementById("gameOverMusic"),
    scoreMusic = document.getElementById("scoreMusic"),
    crackEggMusic = document.getElementById("crackEggMusic")
    eggs = document.getElementsByClassName("egg"),
    egg1 = document.getElementById("egg1"),
    egg2 = document.getElementById("egg2"),
    egg3 = document.getElementById("egg3"),
    initialPos = egg1.style.top,
    eggTop = 0,
    brokenEgg = document.getElementsByClassName("brokenEgg"),
    brokenEgg1 = document .getElementById("brokenEgg1"),
    brokenEgg2 = document .getElementById("brokenEgg2"),
    brokenEgg3 = document .getElementById("brokenEgg3"),
    floor = document.getElementById("floor"),
    brokenEggNum = 0,
    eggCurrentPos = 0,
    life = 10,
    score = 0,
    basketScore = 0,
    basketTop = containerHeight - basketHeight ,
    animationEgg = 0,
    speed = 2,
    maxSpeed = 15;

/*console.log(containerHeight);
console.log(basketHeight);*/

                            //functions
//egg drop
function eggDrop(egg)
{
    
        eggCurrentPos = egg.offsetTop;
        egg.style.top = eggCurrentPos + speed;
        
}  
//collision
function collision(div1 , div2)
{
            //rect1
    var x1 = /*div1.offsetLeft;*/ Math.round(div1.getBoundingClientRect().left) // left
    var y1 = /*div1.offsetTop;*/ Math.round(div1.getBoundingClientRect().top) // top
    var h1 = /*div1.offsetHeight;*/  Math.round(div1.getBoundingClientRect().height) //height with padding + border + margin
    /*h1 += parseInt(window.getComputedStyle(div1).getPropertyValue('margin-top'));
    h1 += parseInt(window.getComputedStyle(div1).getPropertyValue('margin-bottom'));*/
    var w1 = /*div1.offsetHeight;*/  Math.round(div1.getBoundingClientRect().width) //width with padding + border + margin
    /*w1 += parseInt(window.getComputedStyle(div1).getPropertyValue('margin-right'));
    w1 += parseInt(window.getComputedStyle(div1).getPropertyValue('margin-left'));*/
    var b1 = y1 + h1; //bottom
    var r1 = x1 + w1; //right

            //rect2
    var x2 = /*div2.offsetLeft;*/  Math.round(div2.getBoundingClientRect().left) // left
    var y2 = /*div2.offsetTop;*/  Math.round(div2.getBoundingClientRect().top) // top
    var h2 = /*div2.offsetHeight;*/  Math.round(div2.getBoundingClientRect().height) //height with padding + border + margin
    /*h2 += parseInt(window.getComputedStyle(div2).getPropertyValue('margin-top'));
    h2 += parseInt(window.getComputedStyle(div2).getPropertyValue('margin-bottom'));*/
    var w2 = /*div2.offsetHeight;*/  Math.round(div2.getBoundingClientRect().width) //width with padding + border + margin
    /*w2 += parseInt(window.getComputedStyle(div2).getPropertyValue('margin-right'));
    w2 += parseInt(window.getComputedStyle(div2).getPropertyValue('margin-left'));*/
    var b2 = y2 + h2; //bottom
    var r2 = x2 + w2; //right

    if ( b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2 )
    {
        return false;
    }
    else
    {
        return true;
    }

}  
// check if egg reach to floor
function checkEggToFloor(egg)
{
    if(collision(egg , floor))
    {
        showBrokenEgg(egg);
        decrementLife();
        return true;
    }
    else
    {
        return false;
    }
}
// show the broken eggs
function showBrokenEgg(egg)
{
    brokenEggNum = egg.getAttribute("data-brokenEgg");
    document.getElementById("brokenEgg" + brokenEggNum).classList.remove("d-none");
    crackEggMusic.play();
    hideBrokenEgg(brokenEggNum);
}
// hide the broken eggs
function hideBrokenEgg(brokenEggNum)
{
    setTimeout(function(){
        document.getElementById("brokenEgg" + brokenEggNum).classList.add("d-none");
        crackEggMusic.pause();
    }, 500);

}
// decrement life 
function decrementLife()
{
    life--;
    document.getElementById("life").innerHTML = life;
}
// check egg hits bascket
function checkEggInBasket(egg)
{
    if( collision( egg , basket ) )
    {
        eggTop = egg.offsetTop;
        if( eggTop < basketTop )
        {
            updateScore();
            scoreMusic.play();
            return true;
        }
    }
    else
    {
        return false;
    }
}
// update score
function updateScore()
{
    score++;
    if( score % 5 === 0 && speed <= maxSpeed)
    {
        speed++;
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("basketScore").innerHTML = score;
}
// set egg to initial position
function InitialPos(egg)
{
    egg.style.top = initialPos;
    
}

// stop the game
function stopGame()
{
    cancelAnimationFrame(animationEgg);
    scoreMusic.pause();
    restartGame();
}
function restartGame()
{
    document.getElementById("gameOver").classList.remove("d-none");
    playMusic.pause();
    gameOverMusic.play();
    document.getElementById("gameBar").classList.add("d-none");
    document.getElementById("gameContent").classList.add("d-none");
    document.getElementById("gameScore").innerHTML = score;
    playAgain.addEventListener("click" , function(){
        location.reload(start);
    })
}
//start game
function start()
    {
        for(var i = 0 ; i < eggs.length ; i++)
        {
            if( checkEggToFloor(eggs[i]) || checkEggInBasket(eggs[i]) )
            {
                InitialPos(eggs[i]);
            }
            else
            {
                eggDrop(eggs[i]);
            }
        }
        if( life > 0)
        {
            animationEgg = requestAnimationFrame(start);
        }
        else
        {
            stopGame();
        }
    }


//Basket motion
document.addEventListener("mousemove" , function(eventInfo){
    basket.style.left = eventInfo.clientX;
});

                            // the main game function
play.addEventListener("click" , function(){

    document.getElementById("startGame").style.display = "none";
    //add game music
    playMusic.play();
    start();
    animationEgg = requestAnimationFrame(start);


})



