//-----タイマーが動く　15:00 - (現在時刻 - timestamp) -----//
// var date = new Date();
// const timeOfNow = Math.floor(date.getTime()); // 今
// //スタートボタンを押したタイミングをstoreしたい
// console.log(timeOfNow);
//取得はできている

// var btnStart = document.getElementById('start');
// var minutes = document.getElementById('minutes').value;
// var seconds = document.getElementById('seconds').value;
// console.log(minutes);

// function timer(){
//     var date = new Date();
//     const timeOfStart = Math.floor(date.getTime());
//     console.log(timeOfStart);
//     const differ = timeOfStart - timeOfNow;
//     console.log(differ);
//     const timer = 15 * 60 - Math.floor(differ / 100);
//     console.log(timer);
//     minutes = Math.floor(timer / 60);
//     console.log(minutes);
//     seconds = Math.floor(timer % 60); 
//     console.log(seconds);
//     document.getElementById("inputMinutes").value = minutes;
//     document.getElementById("inputSeconds").value = seconds;

//-----startボタンを押す-----//
// function clickStart(){
//     var date = new Date();
//     const timeOfStart = Math.floor(date.getTime());
//     console.log(timeOfStart); 
//     const differ = timeOfStart - timeOfNow;
//     console.log(differ);
//     const timer = 15 * 60 - Math.floor(differ / 1000);
//     console.log(timer);
//     minutes = Math.floor(timer / 60);
//     console.log(minutes);
//     seconds = Math.floor(timer % 60); 
//     console.log(seconds);
//     document.getElementById("inputMinutes").value = minutes;
//     document.getElementById("inputSeconds").value = seconds;
//     var getTimer = setInterval(function(){
//         clickStart();}, 100 );
//     if ( seconds <= 56 ){ 
//             clearInterval(clickStart);}
// };

//     // これでタイマーは動く　あとは止め方////////////////////////////////////榎戸さんに聞く
// };
// btnStart.addEventListener('click',clickStart);

// //timerを画面表示させる


//ここから解法を見てやってみた部分//
var btnStart = document.getElementById('start');
const ring = document.querySelector('.ring');
const seconds = document.querySelector('.seconds > input[type=text]');
const minutes = document.querySelector('.minutes > input[type=text]');
const btnSetting = document.querySelector('.settings');
let originalMinutes = 0;
let originalSeconds = 0;
let running = false;
let totalSeconds;

// -----startボタンを押す-----//
btnStart.addEventListener('click', function(){
    if(!running){
        startTimer();
        } 
        else if(running){
        //-----timerを止める-----//
        pauseTimer();    
        };})

const startTimer = () => {
    running = true;
        const timeOfStart = Math.floor(Date.now());
        const secondsValue = parseInt(seconds.value);
        const minutesValue = parseInt(minutes.value);

        totalSeconds = secondsValue + minutesValue * 60;
        console.log(totalSeconds);
        
        //-----タイマーの動作-----//
        timer =setInterval(() => {
        btnStart.innerHTML = "<button>pause</button>";   
        var date = Date.now();
        const timeOfNow = Math.floor(Date.now());
        const differ = timeOfNow - timeOfStart;

        const secondsLeft = totalSeconds - Math.floor(differ / 1000);
        const minutesLeft = Math.floor(secondsLeft / 60);

        seconds.value = padNumber(secondsLeft % 60);
        minutes.value = padNumber(minutesLeft % 60);
            
        if(secondsLeft === 0 && minutesLeft <= 0){
            ring.classList.add('ending');
            finishTimer();}
        }, 1000);
}

const pauseTimer = () => {
    running = false;
    btnStart.innerHTML = "<button>start</button>";
    clearInterval(timer);
}

//---タイマー終了-----//
const finishTimer = () =>{
    clearInterval(timer)
    ring.classList.add('ending');
    window.alert('Time out!');
    clearInterval(timer);
    setTimeout(() => {
        alert("Time's up!");
        resetTimer();
    }, 0)
    //setTimeoutは処理終了時点から一定時間後に処理が行われる。ここでは0秒後、つまりclearIntervalしたタイミングで実行される。
}




//-----to　榎戸さん　timerをconst で定義したら後のpauseTimerでtimerがundefinedになってて、const外すと関数の外でも使えたのはなぜですか//
//     timer =setInterval(() => {
//     btnStart.innerHTML = "<button>pause</button>";   
//     var date = Date.now();
//     const timeOfNow = Math.floor(Date.now());
//     const differ = timeOfNow - timeOfStart;

//     const secondsLeft = totalSeconds - Math.floor(differ / 1000);
//     const minutesLeft = Math.floor(secondsLeft / 60);

//     seconds.value = padNumber(secondsLeft % 60);
//     minutes.value = padNumber(minutesLeft % 60);
    
//     if(secondsLeft === 0 && minutesLeft <= 0){
//         finishTimer();}
//     }, 1000);

//-----文字を入力できるようにする-----//
btnSetting.addEventListener('click', function(){
    if(running){
        pauseTimer();
    }
    seconds.disabled = false;
    minutes.disabled = false;
})

//-----入力した文字が1桁の時、自動で十の位に0を入れる-----//

const validInput = (e) => {
    const validatedInput = e.target.value.replace(/^[0-9]/g, '').substring(0,2);
    e.target.value= validatedInput;
}

seconds.addEventListener('keyout', validInput);
minutes.addEventListener('keyout', validInput);

const padNumber = (number) => {
    if(number < 10){
        return "0" + number;
        }
        return number;
    }

//-----リセット-----//
const resetTimer = () => {
    clearInterval(timer);
    seconds = 0;
    minutes = 0;
    btnStart.innerHTML = "<button>start</button>";
    running = false;
}

const setOriginalTime = () => {
    originalMinutes = padNumber(parseInt(minutes.value));
    originalSeconds = padNumber(parseInt(seconds.value));
}

resetTimer();
setOriginalTime();






