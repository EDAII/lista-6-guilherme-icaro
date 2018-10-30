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

for (let i = 0; i < 30; i++){
    x_axis = Math.random()*450;
    y_axis = Math.random()*450;
    color = 'cyan'

    let point = new Point(x_axis, y_axis, color);

    points.push(point);
}

console.log(points)

let responses = bruteForce(points, 30);
let first_element = responses[0];
let second_element = responses[1];
let minimal_distance = responses[2];

// console.log(points);
points = changeColor(points, first_element, second_element);
// console.log(points);

// console.log(first_element);
// console.log(second_element);
// console.log(minimal_distance);

for (let i = 0; i < 30; i++){
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

function bruteForce(element_list, n){
    min = 100000000;
    for(let i = 0; i < n; ++i){
        for(let j = i+1; j < n; ++j){
            if (dist(element_list[i], element_list[j]) < min){
                element_1 = element_list[i];
                element_2 = element_list[j];
                min = dist(element_list[i], element_list[j]);
            }
        }
    }

    return [element_1, element_2, min];
}

function stripClosest(strip, size, d){
    min = d;

    strip = quick_sort(strip, 0, size) // make quick sort after

    for (let i = 0; i < size; i++){
        for(let j = i+1; j < size && (strip[j].y - strip[i].y) < min; j++){
            if (dist(element_list[i], element_list[j]) < min){
                element_1 = element_list[i];
                element_2 = element_list[j];
                min = dist(element_list[i], element_list[j]);
            }
        }
    }

    return [element_1, element_2, min];
}

function minimun(x, y){
    return (x < y)? x : y;
}

function closestUtil(pointsList, n){
    if (n <= 3) {
        return bruteForce(pointsList, n);
    }

    mid = parseInt(n/2);

    midPoint = new Point(
        pointsList[mid].x,
        pointsList[mid].y,
        pointsList[mid].color
    )

    left = closestUtil(pointsList, mid);
    right = closestUtil(pointsList + mid, n-mid);

    d = minimun(left, right);

    strip = [];
    j = 0;
    for (let i = 0; i < n; i++){
        if (Math.abs(pointsList[i].x - midPoint.x) < d) {
            strip.push(pointsList[i])
        }
    }

    return minimun(d, stripClosest(strip, j, d));
}

function closest(pointsList, n){
    pointsList = quick_sort(pointsList, 0, n, 'x');

    return closestUtil(pointsList, n);
}

function changeColor(pointsList, first_element, second_element){
    let new_list = []

    for(i = 0; i < 30; i++){
        console.log(pointsList[i])
        if(pointsList[i] == first_element || pointsList[i] == second_element){
            pointsList[i].color = 'red';
        }

        new_list.push(pointsList[i]);
    }

    return new_list;
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right, constant) {

    if(constant == 'x'){
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;


        while (i <= j) {
            while (items[i].x < pivot.x) {
                i++;
            }
            console.log(items[i].x);
            while (items[j].x > pivot.x) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }
    } else {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        while (i <= j) {
            while (items[i].y < pivot.y) {
                i++;
            }
            while (items[j].y > pivot.y) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }
    }

    return i;
}

function quick_sort(items, left, right, constant) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right, constant);

        if (left < index - 1) {
            quick_sort(items, left, index - 1, constant);
        }
        if (index < right) {
            quick_sort(items, index, right, constant);
        }
    }

    return items;
}
