var iball;
var database;
var position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    iball = createSprite(250,250,10,10);
    iball.shapeColor = "red";

    var iballPosition = database.ref('ball/position');
    iballPosition.on("value", readPosition, showError)
}

function draw(){
    background("black");

    if(position !== undefined)
    {
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
}
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    });
}

function readPosition(data)
{
    position = data.val();
    iball.x = position.x;
    iball.y = position.y;
}

function showError()
{
    console.log("Error in the database");
}