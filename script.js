
//ITEMS WITH "@" ID MEAN ON THE BOARD!
var turnCounter = -1;
var turn = "white";
var board = document.getElementById("board");
var promoUI = document.getElementById("promotion")
var promoX,promoY;
let moving = false;
var parsePiece = "Parse"
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    let box = document.createElement("div");
    box.id = "@" + j.toString() + "-" + i.toString();
    // box.innerHTML = "K";
    if (i % 2 === 0) {
      if (j % 2 === 0) {
        box.style.backgroundColor = "#fccc74";
      } else {
        box.style.backgroundColor = "#8a785d";
      }
    } else {
      if (j % 2 === 0) {
        box.style.backgroundColor = "#8a785d";
      } else {
        box.style.backgroundColor = "#fccc74";
      }
    }
    box.classList.add("boardTile")
    board.appendChild(box);
  }
}
//KING1 ROOK2 BISHOP3 KNIGHT4 QUEEN5 PAWN6
var pieceArray = [null, "King", "Rook", "Bishop", "Knight", "Queen", "Pawn"];
var codeBoard = [
  [-2, -4, -3, -5, -1, -3, -4, -2],
  [-6, -6, -6, -6, -6, -6, -6, -6],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [6, 6, 6, 6, 6, 6, 6, 6],
  [2, 4, 3, 5, 1, 3, 4, 2]
];

function promote(team) //Handles Piece Promotion
{
  let barray = ["./piece/bKnight.svg","./piece/bBishop.svg","./piece/bRook.svg","./piece/bQueen.svg","./piece/wKnight.svg","./piece/wBishop.svg","./piece/wRook.svg","./piece/wQueen.svg"]
  promoUI.style.display = "block"
  if(team == "white")
  {
    for(let i=0;i<4;i++)//ideally don't hard code it to "4" For White
    {
      let promoImage = document.getElementById("Pro" + i.toString())
      promoImage.src = barray[i+4]
    }
    return;
  }
  for(let i=0;i<4;i++)//ideally don't hard code it to "4" For Black
  { 
    let promoImage = document.getElementById("Pro" + i.toString())
    promoImage.src = barray[i]
  }
}//I LOVE PROGRAMMING!!!

function promoReturn(pieceReturn) //this returns an Int based on the piecetype array thing
{
if(turn == "white")//Reason we check if it's white is because we update turn on update()/move() 
//when this ui gets opened the turn has already changed 
{
  pieceReturn = -Math.abs(pieceReturn)
  codeBoard[promoY][promoX] = pieceReturn
  updateBoard() //call update board because update updates the turn and promotion is not a turn
  promoUI.style.display = "none"
  return;
}
  codeBoard[promoY][promoX] = pieceReturn
  updateBoard()
  promoUI.style.display = "none"
  return;
}

function updateBoard()
{


for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    //i =y j=x
    let ident;
    let picture;
    if(document.getElementById("@" + x.toString() + "-" + y.toString()).firstElementChild != null)
    {
      document.getElementById("@" + x.toString() + "-" + y.toString()).firstElementChild.remove()
    }
    //let sprite;
    //let picture;
    if(codeBoard[y][x] < 0)
    {
      if(codeBoard[y][x] == -6  && y == 7) //Promotion
      {
        promote("black")
        promoX = x
        promoY = y
      }
      ident = Math.abs(codeBoard[y][x])
      ident = pieceArray[ident]
      ident = "b" + ident;
      ident = './piece/' + ident + ".svg"
      picture = document.createElement("img")
      picture.src = ident
      picture.id = "@" + x.toString() + y.toString() + "b"
      //picture.setAttribute("onclick","move(this.id)")
      document.getElementById("@" + x.toString() + "-" + y.toString()).appendChild(picture)
    }
    else if(codeBoard[y][x] > 0)
    {
      if(codeBoard[y][x] == 6  && y == 0) //Promotion
      {
        //codeBoard[y][x] = 5
        promote("white")
        promoX = x
        promoY = y
      }
      ident = codeBoard[y][x]
      ident = pieceArray[ident]
      ident = "w" + ident;
      ident = './piece/' + ident + ".svg"
      picture = document.createElement("img")
      picture.src = ident
      picture.id = "@" + x.toString() + y.toString() + "w"
     // picture.setAttribute("onclick","move(this.id)")
      document.getElementById("@" + x.toString() + "-" + y.toString()).appendChild(picture)
    }
    }
  }

}

function update()
{
updateBoard()
turnCounter++
if(turnCounter % 2 == 0)
{
turn = "white";
document.getElementById("Turn").innerText = turn
return
}
turn = "black"
document.getElementById("Turn").innerText = turn
}

update()
document.addEventListener("click", function(e)
{
  var target = e.target
  move(target.id)
})


var Bx;
var By;
var savedColor;
var belement
var Mx;
var My;
var piecebool
function move(pos)
{
  if(pos.charAt(0) != "@") //board detection
  {
    document.getElementById("@" + Bx + "-" + By).style.backgroundColor = savedColor
    moving = false
    return;
  }

  if(moving == true) 
  {

    if(pos.charAt(2) == "-" && document.getElementById("@" + pos.charAt(1) + "-" + pos.charAt(3)).hasChildNodes() == false) //move to empty board position
    {
      Mx = pos.charAt(1)
      My = pos.charAt(3)
      Mx = parseInt(Mx)
      My = parseInt(My)
      let determ = Math.abs(codeBoard[By][Bx])
     /* if(Math.abs(determ) != 6)
      {
        determ = Math.abs(determ)
      }
      
      Instead of this let's pass the turn as an argument in pawnmove
      */ 
     piecebool = false
      switch(determ)
      {
        case 2:
        piecebool = RookMove()
        break;
        case 4:
        piecebool = KnightMove()
        break;
        case 1:
        piecebool = KingMove()
        break;
        default:
          pieceType = codeBoard[By][Bx]
          codeBoard[By][Bx] = 0
          codeBoard[My][Mx] = determ
          update()
        break;
      }
      
      if(piecebool)
      {
        pieceType = codeBoard[By][Bx]
      codeBoard[By][Bx] = 0
      codeBoard[My][Mx] = pieceType
      update()
      }
    }

    if(pos.charAt(3) == "w" || pos.charAt(3) == "b") //capture logic
    {
      if((turn == "white" && pos.charAt(3) == "w") || (turn == "black" && pos.charAt(3) == "b"))
      {
        document.getElementById("@" + Bx + "-" + By).style.backgroundColor = savedColor
    moving = false
        return;
      } 
      //console.log("why")
      Mx = pos.charAt(1)
      My = pos.charAt(2)
      Mx = parseInt(Mx)
      My = parseInt(My)
      pieceType = codeBoard[By][Bx]
      codeBoard[By][Bx] = 0
      codeBoard[My][Mx] = pieceType
      update()
    }

    //reset client white out
    document.getElementById("@" + Bx.toString() + "-" + By.toString()).style.backgroundColor = savedColor
    moving = false;
    return;
  }

  if((turn == "white" && pos.charAt(3) == "b") || (turn == "black" && pos.charAt(3) == "w"))
  {
    belement.backgroundColor = savedColor
    moving = false
    return;
  }
  Bx = pos.charAt(1)
  By = pos.charAt(2)
  belement = document.getElementById("@" + Bx + "-" + By)
  savedColor = belement.style.backgroundColor
  belement.style.backgroundColor = "#FFFFFF"
  moving = true
  //console.log(Bx)
  //console.log(By)
 // document.getElementById("Turn").innerHTML += moving
  //update()
}

function legalizeNucleaBombs()
{
  console.log("New Instance Of Nuclear Bombs Added To Workspace")
}

function compareNumbers(a, b) {
  return a - b;
}

function removeDuplicates(arr) {
  return arr.filter((item, 
      index) => arr.indexOf(item) === index);
}

function KnightMove()
{
  let checkx = Math.abs(Mx-Bx)
  let checky = Math.abs(My-By)
  if(checkx + checky != 3 || Mx==Bx || By == My)
  {
    return false
  }
  return true
}

function RookMove() //unfinished due to player pass through
{
  //let j = 0;
  if(Mx!=Bx && By!=My)
  {
    return false
  }
  
 /* let i,j = 0;
  let sarray = [Mx,Bx,My,By]
  sarray = removeDuplicates(sarray) //one x or y value stays the same in rook movement
  sarray.sort(compareNumbers)
  i = sarray[0]
  j = sarray[1]
  if(Mx == (i || j))
  {
    if(My < Bx
    for(i=i;i<j;i++)
    {
      if(codeBoard[My][i] )
    }
  }
  else
  {
    x_or_y = "y"
  }
*/
if(Mx!=Bx)//x is moving
{
if(Mx<Bx)//Moving Right
{

}
else//Moving Left
{

}
}
else//y is moving
{
  if(My<By)//Moving Down
  {
  
  }
  else//Moving Up
  {
  
  }
}
  return true;
}

function KingMove() //Unfinished: due to no check detections
{
  if(Math.abs(My-By) + Math.abs(Mx-Bx) > 2 || (Math.abs(My-By) + Math.abs(Mx-Bx) == 2 && (My==By || Mx==Bx)))
  {
    return false;
  }
  return true;
}

/*
for(let i=0;i<8;i++)
{
  for(let j=0;j<8;j++)
  {
    let standardx = 4
    let standardy = 3
    if(Math.abs(j-standardy) + Math.abs(i-standardx) > 2  || (Math.abs(j-standardy) + Math.abs(i-standardx) == 2 && (j==standardy || i==standardx)))
    {
      
    }
    else
    {
      document.getElementById("@" + j.toString() + "-" + i.toString()).style.backgroundColor = "#FFFFFF"
    }
  }
}
*/
/*
ORDER OF OPS:
click piece -> moving = true -> click an empty tile -> moving false -> push to array

as long as this is all grene you can write or spam whatever you want
JLASDFK;LJK;JLSADKLJ;FKJ;LASLK;JF;LKJSA;LKJASKJ;LF
*/
