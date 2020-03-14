function loader() {
  console.log("TAKES");
  var state = document.readyState;
  if (state === 'interactive') {
    document.getElementsByClassName('contents').style.visibility="hidden";
  } else if (state === 'complete') {
    setTimeout(function(){
      document.getElementById('load').style.visibility="hidden";
      document.getElementsByClassName('contents').style.visibility="visible";
    }, 3000);
  }
}
