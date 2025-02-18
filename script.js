const canvas = document.getElementById("jogoCanvas")
const ctx = canvas.getContext('2d')

function loop(){

    requestAnimationFrame(loop)
}

loop()