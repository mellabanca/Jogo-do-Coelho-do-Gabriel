class Restricao{
    constructor(a,b){
        var ultimaligacao=a.body.bodies.length-2;
        this.ligacao=Constraint.create({
            bodyA:a.body.bodies[ultimaligacao],
            pointA:{x:0,y:0},
            bodyB:b,
            pointB:{x:0,y:0},
            length:-10,
            stiffness:0.01,

        })
        World.add(engine.world,this.ligacao);
    }
    separar (){
        World.remove(engine.world,this.ligacao);
    }
}