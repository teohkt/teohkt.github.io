var homeTab = document.getElementById('homeTab')
var aboutTab = document.getElementById('aboutTab')
var projectsTab = document.getElementById('projectsTab')
var contactTab = document.getElementById('contactTab')

var aboutContainer = document.getElementById('about')

var homeDistance = $('#home').offset().top,
  aboutDistance = $('#about').offset().top,
  timelineDistance = $('#timeline').offset().top,
  projectDistance = $('#projects').offset().top,
  contactDistance = $('#contact').offset().bottom,
  $window = $(window)

$window.scroll(function () {
  if ($(window).scrollTop() >= homeDistance) {
    activeMark(homeTab)
  }
  if ($(window).scrollTop() > aboutDistance - screen.height * 0.25) {
    activeMark(aboutTab)
  }
  if ($(window).scrollTop() > projectDistance - screen.height * 0.1) {
    activeMark(projectsTab)
  }
  if ($(window).scrollTop() > timelineDistance - screen.height * 0.1) {
    activeMark(timelineTab)
  }
  if ($(window).scrollTop() + $(window).height() == getDocHeight()) {
    activeMark(contactTab)
  }
})

function activeMark(activeSite) {
  if (aboutTab.classList.contains('active')) {
    aboutTab.classList.remove('active')
    aboutTab.blur()
    activeSite.classList.add('active')
  }
  if (projectsTab.classList.contains('active')) {
    projectsTab.classList.remove('active')
    projectsTab.blur()
    activeSite.classList.add('active')
  }
  if (timelineTab.classList.contains('active')) {
    timelineTab.classList.remove('active')
    timelineTab.blur()
    activeSite.classList.add('active')
  }
  if (contactTab.classList.contains('active')) {
    contactTab.classList.remove('active')
    contactTab.blur()
    activeSite.classList.add('active')
  }
  activeSite.classList.add('active')
  return false
}

function getDocHeight() {
  var D = document
  return Math.max(
    D.body.scrollHeight,
    D.documentElement.scrollHeight,
    D.body.offsetHeight,
    D.documentElement.offsetHeight,
    D.body.clientHeight,
    D.documentElement.clientHeight
  )
}

$(function () {
  var navMain = $('.navbar-collapse')
  navMain.on('click', 'a:not([data-toggle])', null, function () {
    navMain.collapse('hide')
  })
})

// Unfocus buttons after click
$(document).ready(function () {
  $('.btn').click(function (event) {
    // Removes focus of the button.
    $(this).blur()
  })
})

// Form message input resize
$('textarea')
  .each(function () {
    this.setAttribute('style', 'height:' + this.scrollHeight + 'px;overflow-y:hidden;')
  })
  .on('input', function () {
    this.style.height = 'auto'
    this.style.height = this.scrollHeight + 'px'
  })

// // Form Control
// $('form').on('submit', (e) => {
//   e.preventDefault()

//   const email = $('#email').val().trim()
//   const name = $('#name').val().trim()
//   const text = $('#message').val().trim()

//   const data = {
//     email,
//     subject,
//     text,
//   }

//   $.post('/email', data, function () {
//     console.log('server recieved our data')
//   })

//   var alertBox = document.getElementById('msg')
//   alertBox.setAttribute('style', 'display: inline-block')
//   setTimeout(function () {
//     alertBox.setAttribute('style', 'display: none')
//   }, 3000)
//   $('.clearFields').val('')
// })

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// Typewriter effect
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

  var that = this
  var delta = 200 - Math.random() * 100

  if (this.isDeleting) {
    delta /= 2
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false
    this.loopNum++
    delta = 500
  }

  setTimeout(function () {
    that.tick()
  }, delta)
}

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite')
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type')
    var period = elements[i].getAttribute('data-period')
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period)
    }
  }
  // INJECT CSS
  var css = document.createElement('style')
  css.type = 'text/css'
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}'
  document.body.appendChild(css)
}
