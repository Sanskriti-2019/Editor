export var count = 1;
export var initialData = `` //dont put anything herok

export function countIncr(){
    count+=1;
}
var tempVal='';

export function mergeQuery(codeData){
    var re = new RegExp(String.fromCharCode(160), "g");
    tempVal = (codeData.replace(re, " "));

    initialData = initialData +(codeData.replace(re, " "));

    return initialData;
}

export function revertQuery(){
    console.log(tempVal)
    initialData=initialData.replace(tempVal, '');
    console.log(initialData)
}

