const canvas = document.getElementById("jogoCanvas")
const ctx = canvas.getContext('2d')

document.addEventListener("click", (e) =>{
    if(gameOver){
        location.reload()
    }
})

let gameOver = false

const personagem = {
    posx: 50,
    posy: canvas.height -50,
    tamx: 50,
    tamy: 50,
    velocidade: 1
}
function desenhaPersonagem(){
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.posx, personagem.posy, personagem.tamx, personagem.tamy)
}
const obstaculo = {
    posx: canvas.width -100,
    posy: canvas.height -100,
    tamx: 50,
    tamy: 100,
    velocidade: 10
}
function desenhaObstaculo(){
    ctx.fillStyle = 'red'
    ctx.fillRect(obstaculo.posx, obstaculo.posy, obstaculo.tamx, obstaculo.tamy)
}
function atualizaObstaculo(){
    obstaculo.posx -= obstaculo.velocidade
}

function verificaColisao(){
    if(personagem.posx < obstaculo.posx + obstaculo.tamx &&
        personagem.posx + personagem.tamx > obstaculo.posx &&
        personagem.posy < obstaculo.posy + obstaculo.tamy &&
        personagem.posy + personagem.tamy > obstaculo.posy
    ){
        // setTimeout(()=> {
        //     location.reload();
        // }, -1)
        houveColisao()    
    }
}


function houveColisao(){
    obstaculo.velocidade = 0
        atualizaObstaculo()
    ctx.fillStyle = 'red'
    ctx.fillRect((canvas.width/2)-200, (canvas.height/2)-50, 400, 100)
    ctx.fillStyle='black'
    ctx.font="50px Arial"
    ctx.fillText("Game Over", (canvas.width/2)-130, (canvas.height/2) +15)
    gameOver = true
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    atualizaObstaculo()
    desenhaObstaculo()
    desenhaPersonagem()
    verificaColisao()
    requestAnimationFrame(loop)
}

loop()