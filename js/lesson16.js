
// click

document.getElementById('button-click').addEventListener('click', function() {
    this.classList.add('red')
    this.textContent = 'Красный клик!!'
})

// mouseover

const p2 = document.getElementById('p2')
p2.addEventListener('mouseover', function() {
    p2.style.fontSize = "1.1em"
    p2.style.color = "gray"
})

p2.addEventListener('mouseout', function() {
    p2.style.fontSize = ""
    p2.style.color = ""
})

// keyup

const keyUp = document.getElementById('input-p3')
keyUp.addEventListener('keyup', function(e) {
    console.log(e.key)
})

// submit

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault()
    alert('Успешно отправлено!')
})

// toggle

const buttonTheme = document.getElementById('button-theme')
buttonTheme.addEventListener('click', function() {
    document.getElementById('body').classList.toggle('night-theme')
})