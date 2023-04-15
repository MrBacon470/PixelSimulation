function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addHTML(target,html) {
    document.getElementById(target).insertAdjacentHTML('beforeend',html)
}