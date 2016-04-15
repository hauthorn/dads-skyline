/**
 * The recursive algorithm to compute the skyline
 * @author Christoffer Hauthorn
 */
function calculateSkyline(houses) {
    if (houses.length === 1) {
        // Return the coordinates for this house
        return houses[0];
    }

    // Split the houses
    var halfPoint = Math.ceil(houses.length / 2);
    var leftSide = houses.slice(0, halfPoint);
    var rightSide = houses.slice(halfPoint);

    // Run recursively on the houses
    var leftSkyline = calculateSkyline(leftSide);
    var rightSkyline = calculateSkyline(rightSide);

    // Combine
    var skyline = [];

    var ri = 0;
    var li = 0;
    var lHeight = 0;
    var rHeight = 0;
    var x = 0;
    while (leftSkyline.length >= li || rightSkyline.length >= ri) {
        // get the leftmost of the two
        var left = leftSkyline[li];
        var right = rightSkyline[ri];

        // Make sure we halt when out of bounds
        if (left == undefined) {
            left = 1000000;
        }
        if (right == undefined) {
            right = 1000000;
        }

        // Pick the smaller
        if (left < right) {
            x = leftSkyline[li]; // 23
            if (leftSkyline[li + 1] != undefined) {
                lHeight = leftSkyline[li + 1]; // 13
            }
            else {
                lHeight = 0;
            }
            li += 2;
        }
        else {
            x = rightSkyline[ri];

            if (rightSkyline[ri + 1] != undefined) {
                rHeight = rightSkyline[ri + 1];
            }
            else {
                rHeight = 0;
            }
            ri += 2;
        }

        skyline.push(x);

        if (ri < rightSkyline.length || li < leftSkyline.length) {
            skyline.push(Math.max(lHeight, rHeight));
        }
    }
    return skyline;
}