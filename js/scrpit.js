const arrOfpara = [
    'I looked for Mary and Samantha at the bus station, but they arrived at the station before noon and left on the bus before I arrived.',
    'She completed her literature review, but she still needs to work on her methods section even though she finished her methods course last semester.',
    'With pizza and soda at hand, they studied APA rules for many hours, and they decided that writing in APA made sense because it was clear, concise, and objective.',
    'Although he organized his sources by theme, he decided to arrange them chronologically, and he carefully followed the MEAL plan for organization.'
];

textToChoose = arrOfpara[Math.floor((Math.random() * 3) + 0)]
document.getElementById('text').innerHTML = textToChoose;

let textUserWrite = document.getElementById('text-area-id');
let btn = document.getElementById('btn-id');
let textToWrite = document.getElementById('text');
let resultOutput = document.getElementById('result-output');

let startTime, endTime;

function startTyping() {
    btn.innerHTML = 'Finish'
    let currentTimeBefore = new Date();
    startTime = currentTimeBefore.getTime();
    console.log('Start Time' + startTime);
}

function countWord() {
    let count = 1;
    for (i of textUserWrite.value) {
        if (i == ' ') {
            count = count + 1;
        }
    }
    return count;
}

function endTyping() {
    btn.innerHTML = 'Start'
    let currentTimeAfter = new Date();
    endTime = currentTimeAfter.getTime();
    totalTime = Math.round(((endTime - startTime) / 1000));

    totalTimeInMin = totalTime / 60

    console.log('End Time' + endTime);
    
    let totalWordCount = countWord();

    let grossWPM = (totalWordCount) / (totalTimeInMin); 

    let exact_match = 0;
    let match = 0;

    let arr1 = textToWrite.innerHTML.split(' ');
    let arr2 = textUserWrite.value.split(' ');

    console.log(arr1);
    console.log(arr2);

    arr1.forEach(function (element, index) {

        if (element == arr2[index]) {
            exact_match = exact_match + 1
        }

        if (index < arr2.length) {
            if (element.toLowerCase() == arr2[index].toLowerCase()) {
                match = match + 1
            }
        }
    })

    let error = totalWordCount - exact_match;
    let miss = arr1.length - match;
    let netWPM = (totalWordCount - error) / totalTimeInMin;
     
    let accuracy = (netWPM / grossWPM)*100;

    let remark='';
    
    let speed=Math.round(grossWPM)

    if(speed < 30){
        remark = "Learner's Speed"
    }
    else if( speed < 35 && speed >= 30){
        remark = "Slow"
    }
    else if( speed < 40 && speed >= 35){
        remark = "Average Typist"
    }
    else if( speed < 45 && speed >= 40){
        remark = "Good Typist"
    }
    else if( speed < 50 && speed >= 45){
        remark = "Fast Typist"
    }
    else if( speed < 55 && speed >= 50){
        remark = "Very Fast Typist"
    }
    else{
        remark = "Perfect Typist"
    }
    
    let html = ''

    html = `
        <div class='card-output'>
            <h2 class='result-heading'>Result</h2>
            <div class='result-output'>
                <p class='result'>Typing Speed : ${Math.round(grossWPM)} WPM</p>
                <p class='result'>Remark : ${remark}</p>
                <p class='result'>Words Match : ${exact_match} words</p>
                <p class='result'>Missed : ${miss} words</p>
                <p class='result'>Accuracy : ${accuracy.toFixed(2)} %</p>
            </div>
            <div class='progress-div'>
                <label class='accuracy-label' >Accuracy</label>
                <progress class='progress-class' value=${accuracy.toFixed(2)} max="100"> ${accuracy.toFixed(2)}% </progress>
            </div>   
        </div> `

    resultOutput.innerHTML = html;
}


btn.addEventListener('click', onBtnClick);

function onBtnClick() {
    if (btn.innerHTML == 'Start') {

        textUserWrite.disabled = false;
        textUserWrite.value = '';

        resultOutput.innerHTML = ''

        // Start Function
        // console.log('Start')
        startTyping();
    }
    else {
        // Finish Function
        // console.log('Finish')

        if (textUserWrite.value == '') {
            alert('Please! Write to Test the Speed')
        }
        else {
            endTyping();
            textUserWrite.disabled = true;
        }


    }
}














