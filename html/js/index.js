var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 2,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    session_string = null;
    unkwnCommReaction = "I didn't quite get that.";
		let possibleInputArray = [],
				possibleInputArrayChar = [],
				splitInput = [],
				wordScore,
				inputSuggestion,
    		outputIsSuggestion = false;

setSession();
//fixed that when you scroll to end it doesnt scroll window
chatList.addEventListener('mouseover', function(){
  document.body.style.overflow='hidden';
})

chatList.addEventListener('mouseout', function(){
  document.body.style.overflow='auto';
  document.body.style.overflowX='hidden';
})

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      // ga('send', 'event', 'interact', 'Navvy');
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 1) {
    createBubble(input)
    // ga('send', 'event', 'interact', 'Navvy');
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;
  console.log('input = '+input);

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble);

  console.log("Start");
  checkInput(input);
}

var checkInput = function(input) {
  var client = new HttpClient();
  client.get('http://localhost:5000/?text='+input+'&session='+session_string, function(response) {
    console.log(session_string)
    responseText(response);
  });

}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
  //   // chatList.scrollTop = chatList.scrollTop + response.clientHeight;
  //   // console.log(chatList.scrollTop = chatList.scrollTop + response.clientHeight);
  }, 0)

  console.log("finished");
}

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/images/"+e;
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    console.log(image.scrollHeight);
    // chatList.scrollTop = chatList.scrollHeight;
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      console.log(image.scrollHeight);
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
  //Load image so height gets checked after chatlist add

}

//change to SCSS loop
function animateBotOutput() {
  //chatList.scrollTop = chatList.scrollTop + response.scrollHeight;
  console.log(chatList)
  chatList.lastElementChild.style.animationDelay= (animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];
  console.log(previousInput);
}

function setSession(){
  var client = new HttpClient();
  client.get('http://localhost:5000/session', function(response) {
    session_string = response;
    console.log(response);
  });
}
