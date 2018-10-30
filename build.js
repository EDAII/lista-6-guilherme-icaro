let canvasInstance = new main.graphics.Canvas(500, 500, 'blue');
let canvas = canvasInstance.element;
// main.graphics.setBackgroundColor(canvas, 'red');

class Point {
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

var points = []

for (let i = 0; i < 10; i++){
    x_axis = Math.random()*300;
    y_axis = Math.random()*300;
    color = 'cyan'

    let point = new Point(x_axis, y_axis, color);

    points.push(point);
}

console.log(points)

let responses = bruteForce(points, 10);
let first_element = responses[0];
let second_element = responses[1];
let minimal_distance = responses[2];

// console.log(points);
points = changeColor(points, first_element, second_element);
// console.log(points);

// console.log(first_element);
// console.log(second_element);
// console.log(minimal_distance);

for (let i = 0; i < 10; i++){
    x_axis = points[i].x;
    y_axis = points[i].y;
    color = points[i].color;
    let square = new main.graphics.Square(10, 10,  x_axis, y_axis, color);
    canvasInstance.addObject(square);
}

document.body.appendChild(canvas);


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function compareX(a, b){
//     return (a.x - b.x);
// }
//
// function compareY(a, b){
//     return (a.y - b.y);
// }

function dist(p1, p2){
    return Math.sqrt(
        (p1.x - p2.x)*(p1.x - p2.x) +
        (p1.y - p2.y)*(p1.y - p2.y)
    );
}

function min(x, y){
    return (x < y)? x : y;
}

function bruteForce(element_list, n){
    min = 100000000;
    for(let i = 0; i < n; i++){
        for(let j = i+1; j < n; j++){
            if (dist(element_list[i], element_list[j]) < min){
                element_1 = element_list[i];
                min = dist(element_list[i], element_list[j]);
                element_2 = element_list[j];
            }
        }
    }

    return [element_1, element_2, min];
}

function changeColor(pointsList, first_element, second_element){
    let new_list = []

    for(i = 0; i < 10; i++){
        console.log(pointsList[i])
        if(pointsList[i] == first_element || pointsList[i] == second_element){
            pointsList[i].color = 'red';
        }

        new_list.push(pointsList[i]);
    }

    return new_list;
}
