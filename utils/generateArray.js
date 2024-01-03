export function generateArray(start, end, interval) { 
    let newArray = [];
    for (let i = start; i <= end; i += interval) {
        let rv = parseFloat(i.toFixed(2))
        newArray.push(rv);
    }
    return newArray;
}



// function generateArray(start, end, interval) {
//     var newArray = [];
//     for (var i = start; i <= end; i += interval) {
//         var roundedValue = parseFloat(i.toFixed(2));
//         newArray.push(roundedValue);
//     }
//     return newArray;
// }