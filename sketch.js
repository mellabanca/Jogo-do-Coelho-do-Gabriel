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
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;

  piscando.frameDelay = 15;
  comendo.frameDelay = 15;
  triste.frameDelay=15;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  chao = new Chao(200, 690, 600, 20);
 corda= new Rope(6,{x:245,y:30});
 fruta=Bodies.circle(300,300,15);
 Matter.Composite.add(corda.body,fruta);
ligacao= new Restricao(corda,fruta);

spritecoelho=createSprite(250,630,100,100);
spritecoelho.addImage(coelho);
spritecoelho.scale=0.2;
spritecoelho.addAnimation("piscando", piscando);
spritecoelho.addAnimation("comendo", comendo);
spritecoelho.addAnimation("triste",triste);
spritecoelho.changeAnimation("piscando");

botao=createImg('cut_btn.png');
botao.position(220,30);
botao.size(50,50);
botao.mouseClicked(cortar);
}

function draw() 
{
  
  background(51);
  image(fundo, width/2, height/2, 500, 700);
  


  Engine.update(engine);
  chao.mostrar();
  corda.show();
  if(fruta!==null){
    image(frutaImagem, fruta.position.x,fruta.position.y,60,60);
  }
  if(colisao(fruta,spritecoelho)===true){
    spritecoelho.changeAnimation("comendo");
  }

if(fruta!==null&&fruta.position.y>=650){
  spritecoelho.changeAnimation("triste");
 fruta= null;

}

  
  drawSprites();
}


function cortar(){
  corda.break()
  ligacao.separar();
  ligacao=null;
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

