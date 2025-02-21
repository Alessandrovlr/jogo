const canvas = document.getElementById("jogoCanvas")
const ctx = canvas.getContext('2d')
let gravidade = 0.5
let gameOver = false
let contPulo = 0
let pontos = 0

function congelaTela(){
    document.getElementById('overlay').style.display = 'block'
}

document.addEventListener("click", (e) =>{
    if(gameOver){
        location.reload()
    }
})

document.addEventListener("keypress", (e)=>{
    if(contPulo < 2){
        if(e.code == 'Space'){
            personagem.velocidadey = -15
            personagem.pulando = true
            contPulo++
        }
    }
})

document.addEventListener("keypress", (e)=>{
    switch(event.key){
        case 'a':
            personagem.velocidadex = -5
        break

        case 'd':
            personagem.velocidadex = 5
        break
    }

})

const personagem = {
    posx: 50,
    posy: canvas.height -50,
    tamx: 50,
    tamy: 50,
    velocidadey: 0,
    velocidadex:0,
    pulando: false
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
    velocidade: 5
}
function desenhaObstaculo(){
    ctx.fillStyle = 'red'
    ctx.fillRect(obstaculo.posx, obstaculo.posy, obstaculo.tamx, obstaculo.tamy)
}
function atualizaObstaculo(){
    obstaculo.posx -= obstaculo.velocidade
    if(obstaculo.posx <=  0 - obstaculo.tamx){
        let altura_rand = (Math.random() * 50) + 90
        obstaculo.posx = canvas.width -100
        obstaculo.velocidade += 0.5
        obstaculo.tamy = altura_rand
        obstaculo.posy = canvas.height - altura_rand
        pontos++
        // pontos += obstaculo.velocidade
    }
}

function atualizaPersonagem(){
    personagem.posx += personagem.velocidadex
    if(personagem.pulando){
        personagem.velocidadey += gravidade
        personagem.posy += personagem.velocidadey
        if(personagem.posy >= canvas.height - 50){
            contPulo = 0
            personagem.velocidadey = 0
            personagem.pulando = false
        }
    }
    // if(personagem.posy == canvas.height - 50 ){
    //     personagem.pulando = false
    // }
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
    // personagem.velocidadey = 0
    // personagem.posy = canvas.height - 50
        atualizaObstaculo()
    ctx.fillStyle = 'red'
    ctx.fillRect((canvas.width/2)-200, (canvas.height/2)-50, 400, 100)
    ctx.fillStyle='black'
    ctx.font="50px Arial"
    ctx.fillText("Game Over", (canvas.width/2)-130, (canvas.height/2) +15)
    gameOver = true
    congelaTela()
}


function pontuacao (){
    document.getElementById("ponto").innerHTML = pontos
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    pontuacao()
    atualizaObstaculo()
    desenhaObstaculo()
    desenhaPersonagem()
    verificaColisao()
    atualizaPersonagem()
    requestAnimationFrame(loop)
}

loop()