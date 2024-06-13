/* Created by Tivotal */

let elem = document.querySelector(".draggable-elem");
let initialX = 0;
let initialY = 0;
let deviceType = "";
let isMoving = false;

//checking device type(touch based/mouse based)
let getDevicetype = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touchDevice";
    return true;
  } catch {
    deviceType = "mouseDevice";
    return false;
  }
};

getDevicetype();

let events = {
  mouseDevice: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touchDevice: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

elem.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();

  //initial x and y values
  initialX = getDevicetype() ? e.touches[0].clientX : e.clientX;
  initialY = getDevicetype() ? e.touches[0].clientY : e.clientY;

  isMoving = true;
});

elem.addEventListener(events[deviceType].move, (e) => {
  if (isMoving) {
    e.preventDefault();

    //new x and y values
    let newX = getDevicetype() ? e.touches[0].clientX : e.clientX;
    let newY = getDevicetype() ? e.touches[0].clientY : e.clientY;

    elem.style.top = elem.offsetTop - (initialY - newY) + "px";
    elem.style.left = elem.offsetLeft - (initialX - newX) + "px";

    initialX = newX;
    initialY = newY;
  }
});

elem.addEventListener(events[deviceType].up, (e) => {
  e.preventDefault();
  isMoving = false;
});

elem.addEventListener("mouseleave", (e) => {
  e.preventDefault();
  isMoving = false;
});
