// Constant definition
const interval = 100

// Smartphone setting
const ua = navigator.userAgent.toLowerCase()
const isSP = /iphone|ipod|ipad|android/.test(ua)
const eventStart = isSP ? 'touchstart' : 'mousedown'
const eventEnd = isSP ? 'touchend' : 'mouseup'
const eventLeave = isSP ? 'touchmove' : 'mouseleave'

let timer

function touchEventStart(elementArg, functionArg) {
  elementArg.addEventListener(eventStart, function(e) {
    e.preventDefault()
    functionArg()
    timer = setInterval(() => {
      functionArg()
    }, interval)
  })
}

function touchEventEnd(elementArg) {
  elementArg.addEventListener(eventEnd, (e) => {
    e.preventDefault()
    clearInterval(timer)
  })
}

function touchEventLeave(elementArg) {
  elementArg.addEventListener(eventLeave, (e) => {
    e.preventDefault()
    const pointedElement = isSP
      ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      : elementArg
    if (!isSP || pointedElement !== elementArg) {
      clearInterval(timer)
    }
  })
}

export function addLongTouchEvent(elementArg, functionArg) {
  touchEventStart(elementArg, functionArg)
  touchEventEnd(elementArg)
  touchEventLeave(elementArg)
}
