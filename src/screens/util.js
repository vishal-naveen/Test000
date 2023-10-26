import moment from 'moment';

const Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    white: "#ffffff",
    yellow: "#ffff00"
};

Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};


// database
// .ref('/HurricaneDatabase/HardCodedData')
//     .update({
//      dates:["10-24-2023 12:30", "10-23-2023 10:30","10-21-2023 18:30","10-20-2023 09:30", "10-22-2023 17:30","11-01-2023 18:30","11-02-2023 10:30","11-02-2023 11:00" ],
//      locations:["3967 West Paxton Avenue","6001 N Nebraska Ave","1960 Twin Lakes Pkwy","111 Yale St","450 10th St", ]
//     })
//     .then(() => console.log('Data set. 1'));

export default Colors

export const getDate = (dateTime)=>{
    const date = dateTime.split(' ')?.[0] ?? ""
    return date
}

export const getStartTime = (dateTime)=>{
    const date = dateTime.split(' ')?.[1] ?? ""
    return date
}

export const getEndTime = (dateTime)=>{
    const date = dateTime.split(' ')?.[2] ?? ""
    return date
}

export const getSortedDateList = (arr)=>{
    arr =
    arr?.length > 0
      ? arr.sort(function (a, b) {
          var keyA = moment(a, 'MM-DD-YYYY').toDate(),
            keyB = moment(b, 'MM-DD-YYYY').toDate();
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
      : [];  
        return arr
}