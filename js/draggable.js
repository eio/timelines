// https://www.w3schools.com/howto/howto_js_draggable.asp

// make the DIV element draggagle:
dragElement(document.getElementById("widget"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // if (document.getElementById(elmnt.id + "header")) {
  // // if present, the header is where you move the DIV from:
  //   document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  // } else {
  // // otherwise, move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;
  elmnt.ontouchstart = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    // e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.body.onmouseup = closeDragElement;
    document.body.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.body.onmousemove = elementDrag;
    document.body.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // e.preventDefault();
    // calculate the new cursor position:
    var clientX = e.clientX;
    var clientY = e.clientY;
    if (clientX == undefined && clientY == undefined) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.body.onmouseup = null;
    document.body.onmousemove = null;
    document.body.ontouchend = null;
    document.body.ontouchmove = null;
  }
}