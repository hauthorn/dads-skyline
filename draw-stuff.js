/**
 * @description Helper methods to draw houses/buildings and the skyline on the canvas.
 * @author Christoffer Hauthorn
 */

// Config drawing
var canvasHeight = 512;
var canvasWidth = 512;
var dadsWidth = 30; // The width, from assignment
var extraThick = 10;
var bottomLineHeight = canvasHeight - 20;
var dadsFactor = (canvasWidth / dadsWidth);
var canvas = document.getElementById("render");
canvas.height = canvasHeight;
canvas.width = canvasWidth;
var ctx = canvas.getContext("2d");
var stdThick = ctx.lineWidth;
var stdColor = ctx.strokeStyle;


function drawBottomLine() {
    ctx.lineWidth = extraThick;
    ctx.moveTo(0, bottomLineHeight);
    ctx.lineTo(canvasWidth, bottomLineHeight);
    ctx.stroke();

    // Draw the ticks
    for (var i = 0; i <= dadsWidth; i += 5) {
        drawLineTick(i * dadsFactor, bottomLineHeight);
    }
}

function drawLineTick(x, y) {
    ctx.lineWidth = stdThick;
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x, y + 10);
    ctx.stroke();
}

function parseTextToHouses() {
    // Get the value
    var housesString = document.getElementById('houses').value;
    var houseRegEx = /\(\d+,\d+,\d+\)/gm;
    var valRegEx = /\d+/gm;

    var houses = housesString.match(houseRegEx).map(function (houseString) {
        return houseString
            .match(valRegEx)
            .map(function (val) {
                return parseInt(val)
            }); // Make sure they are ints
    });

    ctx.beginPath();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.closePath();

    // Draw bottom line (thick)
    ctx.beginPath();
    drawBottomLine();
    ctx.closePath();

    // Draw the houses
    ctx.beginPath();
    houses.forEach(function (house) {
        drawHouse(house)
    });
    ctx.closePath();

    var skylinePoints = calculateSkyline(houses);

    // Draw the skyline
    ctx.beginPath();
    drawSkyline(skylinePoints);
    ctx.closePath();

    return false;
}

function drawHouse(house) {
    ctx.lineWidth = 5;
    var actualLeft = house[0] * dadsFactor;
    var actualRight = house[2] * dadsFactor;
    var actualHeight = house[1] * dadsFactor; // Maybe make this a function of the tallest building

    // Go to left point
    ctx.moveTo(actualLeft, bottomLineHeight);
    // Line up
    ctx.lineTo(actualLeft, bottomLineHeight - actualHeight);
    // Line right
    ctx.lineTo(actualRight, bottomLineHeight - actualHeight);

    // Line down
    ctx.lineTo(actualRight, bottomLineHeight);
    ctx.stroke();
}

/**
 * Draws the skyline based on the list of points
 * @param points
 */
function drawSkyline(points) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ff0000';

    ctx.moveTo(points[0] * dadsFactor, bottomLineHeight);

    for (var i = 0; i <= points.length; i += 2) {
        var actualLeft = points[i] * dadsFactor;
        var actualHeight = bottomLineHeight - (points[i + 1] * dadsFactor);
        var actualRight = points[i + 2] * dadsFactor;

        if (actualHeight > 0) {
            ctx.lineTo(actualLeft, actualHeight);
        }
        if (actualRight > 0) {
            ctx.lineTo(actualRight, actualHeight);
        }
    }
    ctx.lineTo(points[points.length - 1] * dadsFactor, bottomLineHeight);
    ctx.stroke();
    ctx.strokeStyle = stdColor;
}