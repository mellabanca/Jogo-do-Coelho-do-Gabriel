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

function preload(){
  fundo = loadImage("background.png");
  frutaImagem = loadImage("melon.png");
  coelho = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50);

  chao = new Chao(200, 690, 600, 20);
 corda= new Rope(6,{x:245,y:30});
 fruta=Bodies.circle(300,300,15);
 Matter.Composite.add(corda.body,fruta);
ligacao= new Restricao(corda,fruta);

}

function draw() 
{
  background(51);
  image(fundo, width/2, height/2, 500, 700);

  Engine.update(engine);
  chao.mostrar();
  corda.show();
  image(frutaImagem, fruta.position.x,fruta.position.y,60,60);
}




