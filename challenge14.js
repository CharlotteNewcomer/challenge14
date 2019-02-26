/* 
 -?high score leaderboard?- future add
add     fruit, animals

    title section _title - matches made and time/score
    bottom section with 'control' buttons _ play game with selection _ reset
    reset button
        
        ?hint? maybe in future-add next to reset button - highlight match to the card they have flipped over or highlight 2 matching cards for 3seconds -5points for each click - can only be used 1 time every 10 seconds
        
        ?levels-easy-hard?- maybe in future-add to selection section - easy-cards shown before start- difficult-delete pairs as made and move cards to fillin progress to mixing cards up either after a match is made or if card is flipped more than 3 times
        
        score -how should it be scored- currently by time- however want to track the number of times matches were attempted and if the card was flipped before - if match made after flipping one of the cards no more than 2 times => 25 points- if match made on first flip for both => 20points- as it was luck.  for every time a card was flipped more then 2 times => -5points from the 25 ...times flipped added before comparison made- time should be calculated in this as well...   =<1 minute to find 10 pairs = 100 points- for every +1 second= -1 point from 100 
         may want to take into consideration the total number of attempts as well -if =<15 attempts =100points , >15&&<20 attempts=75points , >20&&<25 attempts =30points, >25&&<30 => 15points, >30&&<40=10points, >40&&<50 = 5points, =>50 attempts =no points .... +10points for each match made
 https://github.com/zero-to-mastery/coding_challenge-14
*/
let checkedOptions = [];
let numberChecked = 0;
let flipped = [];
let languages = document.getElementsByName('match');

let scoringSection = document.getElementById('scoringSection');
let optionSection = document.getElementById('optionSection');
const colorCards =['pink','red','orange','yellow','green','blue','purple','white','gray','black'];
let match =0;
let time=0;
let gameFinish=false;
let timer;
let clock = document.createElement('div');
clock.className='clock scoring';
let attempted = document.createElement('div');
attempted.className='attempted scoring';
let matched = document.createElement('div');
matched.className = 'matched scoring';
let attempts=0;
scoringSection.appendChild(attempted);
scoringSection.appendChild(matched);
//create multiple cards- when clicked turns over to reveal pic.  if two shown compares match made or waits 1sec then flips back.  

checkedOptions = [];
numberChecked = 0;  

//addevntlisteners to checkboxes and ensures no checkboxes are marked
languages.forEach(function(opt,index) {
    languages[index].addEventListener("change", listen);
    opt.checked=false;
});

let beginning = document.createElement('div');
optionSection.appendChild(beginning);



let topicChoice = document.createElement('div');
topicChoice.className='contentchoice';

let topicArray=['colors', 'numbers'];
topicArray.forEach(function(value){
    
    let contentImg = document.createElement('img');
    contentImg.src=`./images/${value}/${value}.png`;
    contentImg.title=value;
    contentImg.alt=value;
    contentImg.id=value;
    contentImg.addEventListener('click', function(){selectTopic(value)});
    topicChoice.appendChild(contentImg);
})

beginning.appendChild(topicChoice);

function selectTopic(chosentopic){
    topicArray.forEach(function(value){ 
        
        let element = document.getElementById(value);
        if (chosentopic===value){   
            element.className = "selected";
            console.log(element.classList);    
        } else {
            element.className = "";
            console.log (element.classList);
        };
    });
  
    let content = document.createElement('p');
    content.textContent="Choose any two";
    let contentChoices = document.createElement('div');
    contentChoices.className='contentchoice';
                
    let contentArray = [['numbers','Dots'],['numbers','Numerals'], ['colors', 'Paint'], ['language', 'English'],['language', 'French'],['language', 'German'],['language', 'Spanish'],['language', 'Swahili']]; 
    contentArray.forEach(function(value){
        if(value[0]==='language' || value[0]===chosentopic){
            let choices = document.createElement('input');
            choices.type='checkbox';
            choices.name='match';
            choices.value=value[1].toLowerCase();
            choices.addEventListener("change", listen);
            let choiceDiv = document.createElement('div');
            choiceDiv.className='option';
            let content = document.createElement('p');
            content.textContent=value[1];
            choiceDiv.appendChild(choices);
            choiceDiv.appendChild(content);
            contentChoices.appendChild(choiceDiv); 
        }
    })
     beginning.appendChild(content);
    beginning.appendChild(contentChoices);
    let btnPlay = document.createElement('btn');
    btnPlay.textContent = 'Play';
    beginning.appendChild(btnPlay);
    btnPlay.addEventListener('click', play);
};
           
function setup(){

    const gameBox = document.getElementById("gameSection");
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    count = 0;
    flipped =[];
    match=0;
    attempts=0;
    time=0;
    //clear game container before setting it up
    while (gameBox.lastChild) {
        gameBox.lastChild.remove();
    }

    //randomizing cards- from Alexander  (https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php)... seems to work better than w3schools suggestion-which didn't mix it up too well
    function randomCards(arra) {
        var ctr = arra.length;
        var temp;
        var index;
    
    // While there are elements in the array
        while (ctr > 0) {
    // Pick a random index
            index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
            ctr--;
    // And swap the last element with it
            temp = arra[ctr];
            arra[ctr] = arra[index];
            arra[index] = temp;
        }
        return arra;
    }
    randomCards(cards);

    //add div with card and box classes
    cards.forEach(function(value){
        let card = document.createElement("div");
        gameBox.appendChild(card);
        let img = document.createElement('img');
        
        //add image to div
        img.src = `./images/numbers/numbers.png`;
        card.appendChild(img);
        img.onclick= ('click',function(){turn(img, value)});
        card.className = 'card box';
    })
    matched.textContent = "Matches: "+match;
    attempted.textContent = "Attempts: "+attempts;
}


function listen(){
// if numberchecked =2 then give alert that they have already checked 2 boxes/can't select more than 2
// when box is checked add to checkedOptions and add 1 to number checked
// when unchecked remove from checkedoptions and takeaway 1 from numberchecked
switch (this.checked) {
    case true:
        if (numberChecked===2){
            alert('You have selected 2 already');
            this.checked=false;
            break;
        }
        numberChecked += 1;
        checkedOptions.push(this.value);
        break;
    case false:
        numberChecked -= 1;
        if (checkedOptions[0]!==this.value){
            checkedOptions.pop();
        } else if (checkedOptions[0]===this.value){
            checkedOptions.shift();
        }
        break;
    default:
        console.log('error');
    }
}

function play(){
    // when submit is clicked check if numberchecked is 2 - alert if less than 2
    if (numberChecked<2){
        alert ('You need to select 2');
    } else {
        setup();
        timer= setInterval(function(){ 
            time++;
            var seconds = time%60;
            if (seconds<10){
                seconds = "0"+seconds;
            }
            scoringSection.appendChild(clock);
             /*add dom to div that will display time and update it every second*/ 
            clock.textContent = parseInt(time/60)+":"+seconds;
           }, 1000);
    }
}

function turn(img, value){
    
    img.name=value;
    if (value < 11){
        opt = checkedOptions[0];
    } else if (value > 10){
        opt = checkedOptions[1];
        value -= 10;
    }

    img.src=`./images/numbers/${opt}/${value}.png`;
  
    img.alt=value;
    flipped.push(img);
    if (flipped.length===2){
        if (flipped[0].name!==flipped[1].name){ 
            attempts++;
            attempted.textContent="Attempts: "+attempts;
            switch (flipped[0].alt === flipped[1].alt){
                case true:
                    flipped[0].className = 'match';
                    flipped[0].onclick='';
                    flipped[1].className = 'match';
                    flipped[1].onclick='';
                    flipped=[];
                    match++;
                    break;
                case false:
                    setTimeout(flip, 500);
                    break;
                default: 
                    console.log ('error');
                    break;
            }  
        } else {
            flipped.pop();
        }
        function flip(){
            flipped[0].src=`./images/numbers/numbers.png`;
            flipped[1].src=`./images/numbers/numbers.png`;
            flipped=[];
        }
    }
    if (match===10){
        gameFinish=true;
        clearInterval(timer);
    }
    matched.textContent = "Matches: "+match;
}

//add link to leaderboard - make leaderboard
