let gameSeq= [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

let btns= ['yellow','purple','red','green'];
let startbtn = document.querySelector('#startbtn');
startbtn.addEventListener('click',function(){
    if(started==false){
        started = true;
        this.innerText = 'End';
        levelUp();
    }else{
        started = false;
        gameOver();
    }

});
// document.addEventListener('keypress',function(){
//     if(started==false){
//         // console.log('game is started');
//         started  = true;
//         levelUp();
//     }
// });
function gameFlash(btn){
    btn.classList.add('gameflash');
    // timeout (handler function, time)
    setTimeout(() => {
        btn.classList.remove('gameflash');
    }, 250);
}
function userFlash(btn){
    btn.classList.add('userflash');
    // timeout (handler function, time)
    setTimeout(() => {
        btn.classList.remove('userflash');
    }, 150);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText= `level ${level}`;

    // random btn choose
    let randIdx = Math.ceil(Math.random()*3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);

    // console.log(randIdx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameFlash(randbtn);
    gameSeq.push(randcolor);
}
function checkans(idx){
    if(userSeq[idx]!=gameSeq[idx] && started==true){
        gameOver();
    }else{
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
}
function btnpress(){
    // console.log("btn was pressed");
    let btn = this;
    // console.dir(btn);
    userFlash(btn);

    let color = btn.getAttribute('id');
    userSeq.push(color);
    // console.log(userSeq);
    checkans(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnpress);
}
function gameOver(){
    started = false;
    h2.innerHTML = `Game Over! Your score is <b>${level-1}</b> </br> Press the button to start again.`;
    startbtn.innerText = 'Start Again';
    let body = document.querySelector('body');
    body.classList.add('bodybgred');
    setTimeout(() => {
        console.log("hey");
        body.classList.remove('bodybgred');
    }, 300);
    level = 0;
    gameSeq = [];
    userSeq = [];
}