//Bài 1
function square (x) {
    console.log("square("+ x + ")" + " = " + x*x);
    return x*x;
}
//Kết thúc code bài 1

//Bài 2:
function countCentury (year) {
    var century = year/100;
    century = Math.floor(century) + 1;
    console.log(year + " là thế kỷ: " + century)
    return century;
}
//Kết thúc code bài 2

//Bài 3:
function shorten (inputString) {
    var shortenString = inputString.substring(0,10);
    shortenString += "...";
    console.log('Kết quả: ' + shortenString);
    return shortenString;
}
//Kết thúc code bài 3

//Bài 4
function convertString (inputString) {
    var firstLetter = inputString.substring(0,1);
    firstLetter = firstLetter.toUpperCase();
    var lowerCaseString = inputString.substring(1).toLowerCase();
    convertedString = firstLetter.concat(lowerCaseString);
    console.log('Kết quả: ' + convertedString);
    return(convertedString);
}
//Kết thúc code bài 4

//Bài 5:
function minArray(arr) {
    var sortedArr = arr.sort( function(a,b) {
        return a-b
    });
    var min = sortedArr[0];
    console.log("số nhỏ nhất: " + min);
    return min;
}
//Kết thúc code bài 5

//Bài 6:
function sortThenPrint (names) {
    sortedNames = names.sort( function (a,b) {
        return a.toLowerCase() > b.toLowerCase()?1:-1;
    });
    console.log("Kết quả: " + sortedNames);
    strToPrint = sortedNames.join("<br>");
    //document.write(strToPrint);
    // console.log(strToPrint);
    document.getElementById("exerciseResult_6").innerHTML = strToPrint;
    return sortedNames;
}
//Kết thúc code bài 6.

// Test code
square(12);
countCentury(2019);
shorten("012345678901234567890123456789012345678901234567890123456789");
convertString("trịnh Quốc Mạnh");
minArray([10, 8 , 11, 3, 5]);
// sortThenPrint (["Mạnh", "quỳnh", "Quỳnh", "Dương", "mạnh"]);
