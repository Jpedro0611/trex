// Variaveis:
var nuvem,nuv;
var trex, trex_correndo, pontas;
var solo,imagemdosolo, soloinvisivel;
var cacto;
var c1,c2,c3,c4,c5,c6;
var ponto = 0;
var grupodenuvens, grupodecactos;
var estadodojogo = "JOGAR"; 
var trexcolide;
var gameover;
var fim_de_jogo;
var reiniciar,reset;
var morrer,pulo,checkpoint;


function preload (){
  //loadAnimation/loadImage = carrega todas as imagens/animações 
  trex_correndo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  imagemdosolo = loadImage ( "ground2.png");
  
  trexcolide = loadAnimation ('trex_collided.png');
  
  nuv = loadImage ("cloud.png");
  
  c1 = loadImage('obstacle1.png');
  c2 = loadImage('obstacle2.png');
  c3 = loadImage('obstacle3.png');
  c4 = loadImage('obstacle4.png');
  c5 = loadImage('obstacle5.png');
  c6 = loadImage('obstacle6.png');
  
  gameover = loadImage ('gameOver.png'); 
  
  reiniciar = loadImage ('reiniciar.png');
  
  //sons
  morrer = loadSound ('die.mp3');
  pulo = loadSound ('jump.mp3');
  checkpoint = loadSound ('checkPoint.mp3');
}

function setup(){ //Padrões de configuração do jogo!
  createCanvas(600,200);
  
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);  
  // addAnimation adiciona a animação no Sprite!
  trex.addAnimation ("running", trex_correndo);
  
  trex.addAnimation ('colide',trexcolide);
  
  // pontas = createEdgeSprites (); // Beiradas! 
  trex.scale = 0.5; //scala e posição
  
  //SOLO
  solo = createSprite(300,185,600,20); 
  solo.addImage ("ground1", imagemdosolo)
  
  //solo invisível:
  soloinvisivel = createSprite(300,200,600,10); 
  soloinvisivel.visible = false; 
  
  fim_de_jogo = createSprite(300,80,10,10)
  fim_de_jogo.addImage (gameover);
  fim_de_jogo.scale = 0.76;
  fim_de_jogo.visible = false;
  
  reset = createSprite(300,110,130,130)
  reset.addImage (reiniciar);
  reset.scale = 0.16
  reset.visible = false;
  
  //criar os grupos:
  grupodecactos = new Group();
  grupodenuvens = new Group();
  
  trex.setCollider('circle',0,0,40);
  //trex.debug=true;
}
 

function draw(){

  background ("white");
  
  text ('pontuação: ' + ponto,20,20);
  
  
  // ESTADOS DO JOGO: 
  if (estadodojogo === "JOGAR"){
    solo.velocityX = -(4+ponto/100);
    ponto = ponto+Math.round (frameCount/230);
    
    if (ponto%100 ===0 && ponto>0 ){
      checkpoint.play();
      
    }
    
    //trex pulando
    if(keyDown("space") && trex.y >=100) {    
      trex.velocityY = -10;
      pulo.play();
  }
    trex.velocityY = trex.velocityY + 0.8; //"gravidade"  
 
     //SOLO:
    if(solo.x<0) {
      solo.x=solo.width/2;  //width === largura
  }
  
    geranuvens();
    geracacto();
  
    if(trex.isTouching(grupodecactos)){
    
      // trex.velocityY=-12;
      // pulo.play();      
      estadodojogo = 'ENCERRAR';    
      morrer.play();  
     //trex.x = 50;
    // trex.y = 160;
   //   
    }
  } else if (estadodojogo === "ENCERRAR"){
    
      
    fim_de_jogo.visible = true;
    
    reset.visible = true;
    
    grupodenuvens.setLifetimeEach(-1);
    grupodecactos.setLifetimeEach(-1);
    
    trex.changeAnimation('colide',trexcolide);
    
    solo.velocityX = 0;
    
    grupodecactos.setVelocityXEach (0);
    grupodenuvens.setVelocityXEach (0);
    
    if(mousePressedOver(reset)&&estadodojogo === 'ENCERRAR'){
        resetar();
    
  }
  }
  
   
 
  trex.collide (soloinvisivel ); // quicando nas beiras
  
  
    
  drawSprites();
}

function resetar(){
    //console.log("função reiniciar");
   estadodojogo = "JOGAR";
   ponto = 0;
  grupodecactos.destroyEach();
  grupodenuvens.destroyEach();
  fim_de_jogo.visible=(false);
  reset.visible=(false);
  trex.changeAnimation ("running", trex_correndo);
  
}

function  geranuvens() {
 if(frameCount%60===0){
    nuvem = createSprite(600,80,50,50);
    nuvem.velocityX = -2.7;
    nuvem.addImage(nuv);
    nuvem.y = Math.round(random(10,70));
    nuvem.scale = 0.7;
   
    nuvem.lifetime = 230;
   
    nuvem.depth = trex.depth;
    trex.depth = trex.depth +1;
   
    grupodenuvens.add(nuvem);
 }
  
  
}

function geracacto(){
  if (frameCount%120===0){
    cacto = createSprite(600,170,10,10)
    cacto.velocityX=-(4+ponto/100);
    
    var rand = Math.round (random(1,6));
    switch (rand){
      case 1:cacto.addImage (c1);
      break;
      
      case 2:cacto.addImage (c2);
      break;
      
      case 3:cacto.addImage (c3);
      break;
      
      case 4:cacto.addImage (c4);
      break;
      
      case 5:cacto.addImage (c5);
      break;
      
      case 6:cacto.addImage (c6);
      break;
      
      default: break;
     
    }
    cacto.scale = 0.5;
    cacto.lifetime = 320;
    
    grupodecactos.add(cacto);
  }
  
}

