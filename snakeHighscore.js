(function (window, document, drawFunction, undefined) {

  function getName(){
    let name = prompt("Enter your name: ", "your name here")
    return name;
  }
  var currentInfo;
  var submitScore = document.getElementById('submitScore');
  submitScore.addEventListener("click",function(){var currentInfo={name:getName(), highScore:finalScore}; if(finalScore>highestScore){ document.getElementById("displayScores").innerHTML = (currentInfo.name + " : " + currentInfo.highScore);} else{}});

})(window, document, drawFunction);
