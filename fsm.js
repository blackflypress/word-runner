
  
let index = 0;
let playInterval = null;
let input = document.getElementById('input');
let slider = document.getElementById("slider");
let wpm = document.getElementById("wpm");
let duration = document.getElementById("duration");
let playPauseBtn = document.getElementById("playPause-btn");
let stopBtn = document.getElementById("stop-btn");
let rewindBtn = document.getElementById("rewind-btn");
let forwardBtn = document.getElementById("forward-btn");
let output = document.getElementById('output');
let totalBar = document.getElementById("total-bar");
let progressBar = document.getElementById("progress-bar");
let delay = 60000 / slider.value; 

wpm.innerHTML = slider.value + " wpm"; // Display the default slider value


let content;
let words;
let progress;
let total;





function animProgressBar() {
    let percentage =   index / words.length * 100
    progressBar.style.width = percentage + "%"
    // console.log(percentage)
    return percentage;
}

function passDuration() {
    duration.innerHTML = (`${index + 1}/${words.length} `)
}

    
function stopWords() {
    pauseWords()
    index = 0;
    // if (words !== undefined)
    // output.textContent = words[index];
    // animProgressBar()
}
    
function playWords(){
this.playInterval = setInterval(() => {
    // delay = slider.value;
    if (index < words.length) {
        output.textContent = words[index];
        animProgressBar()
        passDuration()
        index++;
    } else if (index === words.length) {
        output.textContent = "Done."
    }
}, delay);

}


function pauseWords(){
 clearInterval(this.playInterval);
};

function rewindWords() {
    index = index - 10;
    if (index < 0){
        index = 0
    }
    output.textContent = words[index];
}

function forwardWords() {

    index = index + 10;
    if (index >  words.length) {
        index = words.length
    }
    output.textContent = words[index];
}

function togglePlaySymbol() {
    
    if (playPauseBtn.classList.contains("isPlaying")) {
        playPauseBtn.classList.remove("isPlaying");
        playPauseBtn.innerHTML = "&#9654";
    }
}

function togglePauseSymbol(){

if (!playPauseBtn.classList.contains("isPLaying")) {
        playPauseBtn.classList.add("isPlaying");
        playPauseBtn.innerHTML = "&#10074;&#10074";
        // STATE_MACHINE.dispatch('PLAY');
    }
}

function adjustWPM(){
    console.log(slider.value)
    wpm.innerHTML = slider.value + " wpm";
    pauseWords()
    // togglePlaySymbol()
    delay = 60000 / slider.value;
        // console.log(delay)
}




input.onpaste = function(){
    STATE_MACHINE.dispatch("LOAD");
}
 
slider.oninput = function() {
    STATE_MACHINE.dispatch("ADJUST_WPM");
    // playPause.classList.remove("isPlaying");
    // playPause.innerHTML = "&#9654";
    // wpm.innerHTML = this.value + " wpm";
    // pause()
    // delay = 60000 / this.value;
}

stopBtn.addEventListener("click", () => {
    STATE_MACHINE.dispatch('STOP');
});

playPauseBtn.addEventListener("click", () => {
    if (playPauseBtn.classList.contains("isPlaying")) {
        STATE_MACHINE.dispatch('PAUSE');
    }else if (!playPauseBtn.classList.contains("isPLaying"))
        STATE_MACHINE.dispatch("PLAY");
  });

rewindBtn.addEventListener("click", () => {
    STATE_MACHINE.dispatch('REWIND');
});

forwardBtn.addEventListener("click", () => {
    STATE_MACHINE.dispatch('FAST_FORWARD');
});

const STATE_MACHINE = {
    state: "STOP",
    transitions: {
        
            
    
        STOP: {
            loaded: false,
            // on: {START: "PROCESSING"},
            LOAD: function(){
                console.log("LOADED")


                this.transitions.STOP.loaded = true;

             
setTimeout(() => {
    console.log(input.value);
content = input.value;


                words = content.split(/[.!?,;\s]+/);
                passDuration()
                return words;

    
  }, 0);                
  
                // content = event.clipboardData.getData("text");
                
            },
            enter: function() {
                // console.log('enter stop')
                stopWords()
                togglePlaySymbol()
                animProgressBar()
                passDuration()
                output.textContent = words[index];
            },
        
            PLAY: function(){
              if (this.transitions.STOP.loaded){
                  // this.state = "PLAY";
                  this.changeState("PLAY")
                }},
        
             REWIND: function(){
              if (this.transitions.STOP.loaded){
                rewindWords()
                output.textContent = words[index];
                animProgressBar()
                passDuration()
                
            }},
            FAST_FORWARD: function() {
              if (this.transitions.STOP.loaded){
                forwardWords()
                output.textContent = words[index];
                animProgressBar()
                passDuration()
            }},
            ADJUST_WPM: function() {
                  adjustWPM()
            },
            STOP: function() {
                stopWords()
                animProgressBar()
                output.textContent = words[index];
                  // this.changeState("STOP")
                // this.state = "STOP"
            }
        },

        PLAY: {
          // on:{START: "PROCESSING"},
            enter: function(){
                // console.log("PLAYPLAYPLAY")
                togglePauseSymbol()
                // togglePlayPause();
                playWords();
            } ,
            PAUSE: function(){
                  this.changeState("PAUSE")
                // console.log("pausing")
                // this.state = "PAUSE";
            },
            REWIND: function(){
                rewindWords()
                animProgressBar()
                passDuration()
                  this.changeState("PAUSE")
                // this.state = "PAUSE"
            },
            FAST_FORWARD: function() {
                forwardWords()
                animProgressBar()
                passDuration()
                  this.changeState("PAUSE")
                // this.state = "PAUSE"
            },
            ADJUST_WPM: function() {
                
                // togglePauseSymbol()
                adjustWPM()               // this.state = "PAUSE"
                  this.changeState("PAUSE")
            },
            STOP: function() {
                  this.changeState("STOP")
                // this.state = "STOP"
            }
        },

        
        PAUSE: { 
         // on:{START: "PROCESSING"},
            enter: function(){
                togglePlaySymbol()
                // togglePlayPause();
                pauseWords();
            } ,
            
            PLAY: function(){
                this.changeState("PLAY")
            },
            
            REWIND: function(){
                rewindWords()
                animProgressBar()
                passDuration()
                output.textContent = words[index];
                // this.state = "PAUSE"
            },
            FAST_FORWARD: function() {
                forwardWords()
                animProgressBar()
                passDuration()
                output.textContent = words[index];
                // this.state = "PAUSE"
            },
            ADJUST_WPM:  function() {
                adjustWPM()               // this.state = "PAUSE"
                // this.state = "PAUSE"
            },
            STOP: function() {
                // this.state = "STOP"
                this.changeState("STOP")
            }
        }



    }, // TRANSITIONS
        

    // PROCESSING: {
    //     entry(payload) {
    //         console.log(`Processing ${payload.next}`);
    //         if (payload.next === "fast_forward") {
    //             console.log("NEXT FF");
    //             // this.run_fast_forward();
            
    //         } else if (payload.next === "rewind")  {
    //             console.log("NEXT REWIND");
    //             // this.run_rewind();
                
    //         } else if (payload.next === "adj_speed"){
    //              // this.run_adj_speed();         
    //             console.log("NEXT ADJ SPEED");
    //   }  }
    // },
    
    
    dispatch(actionName){



    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
        // console.log(actions)
        action.apply(STATE_MACHINE)
    } else {
        
    }
}, // dispatch

changeState(newState) {
    console.log(`Last State: ${this.state}`)
    this.state = newState;
            this.transitions[this.state]?.enter?.();
    console.log(`Current State: ${this.state}`)
}

} // STATE_MACHINE





        


    // const action = this.transitions[this.state][actionName];

    // if (action) {

            // console.log(`Previous State: ${this.state}`)
            // console.log(actionName)

// if (this.state === actionName) {

    // return;
            
    
         // this.state = action;
            // action.entry?.(payload);
        
    // }




    

        
        // const actions = this.states[this.state];
        // const action = this.transitions[this.state][actionName];

        // if (action) {
            // action.call(this);
            
            // this.transitions[this.state].entry?.(payload);
            
        // } else {
            // console.log(`Current State: ${this.state}`)
            // action.call(this);
            // console.log("Invalid Action")
            // this.transitions[this.state]?.enter?.();
            // action is not valid for current state.
        // };

        // if (payload) {
         // console.log("payload found.")
         // console.log(payload)
        // }
    // } // dispatchc
    

