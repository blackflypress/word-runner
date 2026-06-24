let index = 0;
let playInterval = null;
let input = document.getElementById('input');
let slider = document.getElementById("slider");
let wpm = document.getElementById("wpm");
let playPause = document.getElementById("playPause");
let stop = document.getElementById("stop");
let output = document.getElementById('output');
let total_bar = document.getElementById("total_bar");
let progress_bar = document.getElementById("progress_bar");
let delay = 60000 / slider.value; 

wpm.innerHTML = slider.value + " wpm"; // Display the default slider value

let content;
let words;
let progress;
let total;

function animProgressBar() {
    let percentage =   index / words.length * 100
    progress_bar.style.width = percentage + "%"
    return percentage;
}

input.onpaste = function(){
    content = event.clipboardData.getData("text");
    words = content.split(/[.!?,;\s]+/);
    return words;
}

slider.oninput = function() {
    playPause.classList.remove("isPlaying");
    playPause.innerHTML = "&#9654";
    wpm.innerHTML = this.value + " wpm";
    pause()
    delay = 60000 / this.value;
}

stop.addEventListener("click", () => {
    pause()
    index = 0
    output.textContent = words[index];
    animProgressBar(
)});


rewind.addEventListener("click", () => {
pause()
index = index - 10;
// play()
output.textContent = words[index];

animProgressBar()
});



forward.addEventListener("click", () => {
pause()
index = index + 10;

output.textContent = words[index];
// play()
animProgressBar()
});


function playPauseToggle() {

console.log(words.length)
if (playPause.classList.contains("isPlaying")) {
    playPause.classList.remove("isPlaying");
    playPause.innerHTML = "&#9654";
    pause()
    
} else {
    playPause.classList.add("isPlaying");
    playPause.innerHTML = "&#10074;&#10074";
play()  
}
}



playPause.addEventListener("click", () => {

playPauseToggle()
 animProgressBar()
 //     // console.log("play!")
 //        playPause.innerHTML = "&#9654";
 // // // clearInterval(intervalId);
 //    } else if (!isPlay) {
 //        // console.log('pause.')

 //        playPause.innerHTML = "&#10074;&#10074";
 //    }
    
    
});

// playPause.addEventListener("click", () => {
//     // 1. Toggle the CSS class "active"
//     const isPlay = playPause.classList.toggle("isPlay");

//     // 2. Change the button text based on the state
//     if (isPlay) {
//         playPause.innerHTML = "&#9654";

//  clearInterval(intervalId);
//     } else {
//         playPause.innerHTML = "&#10074;&#10074";
//         play()
//     }
// });
//console.log("butt")

// function setDelay(){

  
// }


function play(){


     // this.content = input.value;
     

this.playInterval = setInterval(() => {
    // 1. Check if we have run out of words
    if (index < words.length) {
        // 2. Update the text content of the <p> element
        output.textContent = words[index];
animProgressBar()
        index++;
    } else if (index === words.length) {
        output.textContent = "Done."
    }
}, delay);

}    



// let playInterval = setInterval(() => {
//     // 1. Checks if we have run out of words
//     if (index < words.length) {
//         // 2. Update the text content of the <p> element
//         output.textContent = words[index];
//         index++;

//         // console.log(index)
//         // console.log(words.length)
//     } else if (index === words.length) {
//         // 3. Stop the timer when the sequence is finished
//         clearInterval(playInterval);
//         output.textContent = "Done.";
//     }},  delay ); 
// }

function pause(){
 
 clearInterval(this.playInterval);
    
};
    
      //  output.innerText = words;


// let index = 0;



// const intervalId = setInterval(() => {
//     // 1. Check if we have run out of words
//     if (index < words.length) {
//         // 2. Update the text content of the <p> element
//         output.textContent = words[index];
//         index++;
//      } else if (index == words.lenth) {
//         // 3. Stop the timer when the sequence is finished
//         clearInterval(intervalId);
//         output.textContent = "Finished!";
//     }
// },  delay ); 
//        }

// function pause() {
  
//  clearInterval(intervalId);
// }
       
