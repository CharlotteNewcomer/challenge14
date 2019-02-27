/* 
 -?high score leaderboard?- future add
add     fruit, animals

        ?hint? maybe in future-add next to reset button - highlight match to the card they have flipped over or highlight 2 matching cards for 3seconds -5points for each click - can only be used 1 time every 10 seconds
        
        ?levels-easy-hard?- maybe in future-add to selection section - easy-cards shown before start- difficult-delete pairs as made and move cards to fillin progress to mixing cards up either after a match is made or if card is flipped more than 3 times
        
        score -how should it be scored- currently by time- however want to track the number of times matches were attempted and if the card was flipped before - if match made after flipping one of the cards no more than 2 times => 25 points- if match made on first flip for both => 20points- as it was luck.  for every time a card was flipped more then 2 times => -5points from the 25 ...times flipped added before comparison made- time should be calculated in this as well...   =<1 minute to find 10 pairs = 100 points- for every +1 second= -1 point from 100 
         may want to take into consideration the total number of attempts as well -if =<15 attempts =100points , >15&&<20 attempts=75points , >20&&<25 attempts =30points, >25&&<30 => 15points, >30&&<40=10points, >40&&<50 = 5points, =>50 attempts =no points .... +10points for each match made
 https://github.com/zero-to-mastery/coding_challenge-14

 make look nicer- add flipping animate to cards
*/
let timer;
let numberChecked = 0;
let match =0;
let time=0;
let attempts=0;
let checkedOptions = [];
let flipped = [];
let topicArray=['colors', 'numbers'];
const colorCards =['pink','red','orange','yellow','green','blue','purple','white','gray','black'];
const scoringSection = document.getElementById('scoringSection');
const optionSection = document.getElementById('optionSection');
const gameBox = document.getElementById("gameSection");
const clock = document.createElement('div');
const attempted = document.createElement('div');
const matched = document.createElement('div');
const beginning = document.createElement('div');
clock.className='clock scoring';
attempted.className='attempted scoring';
matched.className = 'matched scoring';
scoringSection.appendChild(attempted);
scoringSection.appendChild(matched);

reSet();

function reSet (){
    clearAll();
    matched.textContent = "";
    attempted.textContent = "";
    clock.textContent = "";
    clearInterval(timer);
    optionSection.appendChild(beginning);
    checkedOptions = [];
    numberChecked = 0; 
    let topicChoice = document.createElement('div');
    topicChoice.className='contentchoice';
    beginning.appendChild(topicChoice);
    
    topicArray.forEach(function(value){
        let contentImg = document.createElement('img');
        contentImg.src=`./images/${value}/${value}.png`;
        contentImg.title=value;
        contentImg.alt=value;
        contentImg.id=value;
        contentImg.className="box hvr-grow";
        contentImg.addEventListener('click', function(){selectTopic(value)});
        topicChoice.appendChild(contentImg);
    })   
}

function selectTopic(chosentopic){
    if (beginning.lastChild.id==='contentdiv'){beginning.lastChild.remove()};
    
    let contentArray = [['numbers','Dots'],['numbers','Numerals'], ['colors', 'Paint'], ['language', 'English'],['language', 'French'],['language', 'German'],['language', 'Spanish'],['language', 'Swahili']]; 
    const contentDiv = document.createElement('div');
    const content = document.createElement('p');
    const contentChoices = document.createElement('div');
    const btnPlay = document.createElement('button');
    
    contentDiv.id='contentdiv';
    content.textContent="Choose any two";
    contentChoices.className='contentchoice';
    btnPlay.textContent = 'Play';
    btnPlay.addEventListener('click', function (){play(chosentopic)});
    
    numberChecked=0;
   
    contentDiv.appendChild(content);
    contentDiv.appendChild(contentChoices);
    beginning.appendChild(contentDiv);
    contentDiv.appendChild(btnPlay);

    topicArray.forEach(function(value){ 
        let element = document.getElementById(value);
        if (chosentopic===value){   
            element.className = "box hvr-grow selected";   
        } else {
            element.className = "box hvr-grow";
        };
    }); 

    contentArray.forEach(function(value){
        if(value[0]==='language' || value[0]===chosentopic){
            let choices = document.createElement('input');
            let choiceDiv = document.createElement('div');
            let contentP = document.createElement('p');

            choiceDiv.className='option';
            choices.name='match';
            choices.type='checkbox';
            choices.value=value[1].toLowerCase();
            choices.addEventListener("change", listen);
            contentP.textContent=value[1];
            
            choiceDiv.appendChild(choices);
            choiceDiv.appendChild(contentP);
            contentChoices.appendChild(choiceDiv); 
        }
    });
};

function clearAll(){
    while (gameBox.lastChild) {
        gameBox.lastChild.remove();
    }
    while (beginning.lastChild) {
        beginning.lastChild.remove();
    }
} 

function setup(topic){

    let controlBtns=['Reset', 'Restart'];
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    count = 0;
    match=0;
    attempts=0;
    time=0;
    flipped =[];

    matched.textContent = "Matches: "+match;
    attempted.textContent = "Attempts: "+attempts;
    //clear game container before setting it up
    clearAll();
    //mix cards up
    randomCards(cards);

    //add div with card and box classes
    cards.forEach(function(value){
        let card = document.createElement("div");
        let img = document.createElement('img');

        card.className = 'box hvr-grow animated';
        img.src = `./images/${topic}/${topic}.png`;
        img.onclick= ('click',function(){turn(img, value, topic)});

        gameBox.appendChild(card);
        card.appendChild(img);
    });

    controlBtns.forEach(function(value){
        let controlBtn = document.createElement('button');
        controlBtn.textContent=value;
        controlBtn.id=value.toLowerCase();
        beginning.appendChild(controlBtn);
    });

    reset.addEventListener('click', reSet );
    restart.addEventListener('click', function(){setup(topic)} );

    //randomizing cards- from Alexander  (https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php)... 
    //seems to work better than w3schools suggestion-which didn't mix it up too well
    //mixs up by swapping to last item for a different item in the array
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

function play(topic){
    // when submit is clicked check if numberchecked is 2 - alert if less than 2
    if (numberChecked<2){
        alert ('You need to select 2');
    } else {
        scoringSection.appendChild(clock);
        setup(topic);
        timer= setInterval(function(){ 
            time++;
            var seconds = time%60;
            if (seconds<10){
                seconds = "0"+seconds;
            };
            clock.textContent = parseInt(time/60)+":"+seconds;
        }, 1000);
    }
}

function turn(img, value, topic){
 
    img.name=value;
    
    if (value < 11){
        opt = checkedOptions[0];   
    } else if (value > 10){
        opt = checkedOptions[1];
        value -= 10;
    }

    if (topic==='colors'){
        value = colorCards[value-1];    
    }
   
    img.src=`./images/${topic}/${opt}/${value}.png`;
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
                    setTimeout(function(){flip(topic)}, 750);
                    break;
                default: 
                    console.log ('error');
                    break;
            }  
        } else {
            flipped.pop();
        }

        function flip(topic){
            flipped[0].src=`./images/${topic}/${topic}.png`;
            flipped[1].src=`./images/${topic}/${topic}.png`;
            flipped=[];
        }
    }

    if (match===10){
        clearInterval(timer);
        
    }

    matched.textContent = "Matches: "+match;
}
