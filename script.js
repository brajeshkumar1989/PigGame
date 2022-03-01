'use strict';

//Select Element

const playerSection01=document.querySelector('.player--0');
const playerSection02=document.querySelector('.player--1');
const scorePlayer01=document.querySelector('#score--0');
const scorePlayer02=document.querySelector('#score--1');
const totalScorePlayer01=document.querySelector('#current--0');
const totalScorePlayer02=document.querySelector('#current--1');

const diceE1=document.querySelector('.dice');
const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');

const btnHold=document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

//starting condition
const init=function(){
    score=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

    scorePlayer01.textContent=0;
    scorePlayer02.textContent=0;
    totalScorePlayer01.textContent=0;
    totalScorePlayer02.textContent=0;

    diceE1.classList.add('hidden');
    playerSection01.classList.remove('player--winner');
    playerSection02.classList.remove('player--winner');
    playerSection01.classList.add('player--active');
    playerSection02.classList.remove('player--active');
};

init();

const switchPlayer= function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currentScore=0;
    activePlayer=activePlayer===0?1:0;
    playerSection01.classList.toggle('player--active');
    playerSection02.classList.toggle('player--active');
};


//rolling dice functionality

btnRoll.addEventListener('click',function(){
    if(playing){
        //1. generate a rendom number
        const dice=Math.trunc(Math.random()*6) +1;
        //2. display dice
        diceE1.classList.remove('hidden');
        diceE1.src=`img/dice-${dice}.png`
        //3. check for rolled one
        if(dice !==1){
            // add dice to current one 
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore
        } else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click',function(){
    if(playing){
        //add score to Active player score
        score[activePlayer]+= currentScore;
        //score[1]=score[1]+currentScore

        document.getElementById(`score--${activePlayer}`).textContent=score[activePlayer];

        // check if Player score is >100

        if(score[activePlayer] >=100){
            //Finish the game
            playing=false;
            diceE1.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');


        } else{
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);