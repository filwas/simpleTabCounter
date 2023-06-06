document.addEventListener('paste', (event)=>{
    let amount = event.clipboardData.getData('text/plain').match(/\d+\.\d{2}$/)[0];
    let lastQuerableElement = document.querySelector("#main-content > div:nth-child(6) > div > div:nth-child(1) > div");
    let inputElement = lastQuerableElement.childNodes[3].firstChild.firstChild.querySelector("input[name='received']");
    inputElement.value = amount
    inputElement.dispatchEvent(new InputEvent("input", {bubbles: true}));
  })
  
  