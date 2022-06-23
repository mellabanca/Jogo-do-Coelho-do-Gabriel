const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var chao;
var corda;
var fruta;
var ligacao;
var fundo, frutaImagem, coelho;
var spritecoelho
var botao;
var piscando, comendo,triste;
var musicaFundo, musica, perder, ganhar, musicaVento;
var balao; 
var mute;
var botao2;
var botao3;
var corda2;
var corda3;
var ligacao2;
var ligacao3;



function preload(){
  fundo = loadImage("background.png");
  frutaImagem = loadImage("melon.png");
  coelho = loadImage("Rabbit-01.png");
  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  comendo = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  musicaFundo = loadSound("sound1.mp3");
  musica = loadSound("rope_cut.mp3");
  perder = loadSound("sad.wav");
  ganhar = loadSound("eating_sound.mp3");
  musicaVento = loadSound("air.wav");

  piscando.playing = true;
  comendo.playing = true;
  comendo.looping = false;
  triste.playing=true;
 triste.looping=false;
}

function setup() 
{
  var estaNoCelular = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if(estaNoCelular){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight);
  }

 
  musicaFundo.play();
  musicaFundo.setVolume(0.3);
  engine = Engine.create();
  world = engine.world;

  piscando.frameDelay = 15;
  comendo.frameDelay = 15;
  triste.frameDelay=15;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  chao = new Chao(200, canH, 600, 20);
 corda= new Rope(8,{x:40,y:30});
 corda2= new Rope(7,{x:370,y:40});
 corda3= new Rope(4,{x:400,y:225});


 fruta=Bodies.circle(300,300,15);
 Matter.Composite.add(corda.body,fruta);
ligacao= new Restricao(corda,fruta);
ligacao2= new Restricao(corda2,fruta);
ligacao3= new Restricao(corda3,fruta);

spritecoelho=createSprite(170,canH-80,100,100);
spritecoelho.addImage(coelho);
spritecoelho.scale=0.2;
spritecoelho.addAnimation("piscando", piscando);
spritecoelho.addAnimation("comendo", comendo);
spritecoelho.addAnimation("triste",triste);
spritecoelho.changeAnimation("piscando");

botao=createImg('cut_btn.png');
botao.position(20,30);
botao.size(50,50);
botao.mouseClicked(cortar);

botao2=createImg('cut_btn.png');
botao2.position(330,35);
botao2.size(50,50);
botao2.mouseClicked(cortar2);

botao3=createImg('cut_btn.png');
botao3.position(360,200);
botao3.size(50,50);
botao3.mouseClicked(cortar3);


mute=createImg('mute.png');
mute.position(450,20);
mute.size(50,50);
mute.mouseClicked(mudo);
}

function draw() 
{
  
  background(51);
  image(fundo, width/2, height/2, displayWidth+80, displayHeight);
  


  Engine.update(engine);
  chao.mostrar();


  corda.show();
  corda2.show();
  corda3.show();

  if(fruta!==null){
    image(frutaImagem, fruta.position.x,fruta.position.y,60,60);
  }
  if(colisao(fruta,spritecoelho)===true){
    spritecoelho.changeAnimation("comendo");
    ganhar.play();
  }

if(fruta!==null&&fruta.position.y>=height-70){
  spritecoelho.changeAnimation("triste");
 fruta= null;
musicaFundo.stop();
perder.play();
}

  
  drawSprites();
}


function cortar(){
  corda.break()
  ligacao.separar();
  ligacao=null;
  musica.play();
}

function colisao(corpo,sprite){
  if(corpo!==null){
    var queda=dist(corpo.position.x,corpo.position.y,sprite.position.x,sprite.position.y);
 if(queda<=80){
   World.remove(engine.world,fruta);
   fruta=null;
   return true;
 }
   else{
     return false;
   }

  }
}

function   vento(){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0});
  musicaVento.play();
}

function mudo(){
  if(musicaFundo.isPlaying()){
    musicaFundo.stop();
  }

else{
  musicaFundo.play();
}
}

function cortar2(){
  corda2.break()
  ligacao2.separar();
  ligacao2=null;
  musica.play();

}

function cortar3(){
  corda3.break()
  ligacao3.separar();
  ligacao3=null;
  musica.play();
}
