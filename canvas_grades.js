const percentElements = document.getElementsByClassName('percent')
const conversions = {
    'A+': [97, 100],
    'A': [93, 96],
    'A-': [90, 92],
    'B+': [87, 89],
    'B': [83, 86],
    'B-': [80, 82],
    'C+': [77, 79],
    'C': [73, 76],
    'C-': [70, 72],
    'D+': [67, 69],
    'D': [65, 66],
    'F': [0, 64],
}

for (let i = 0; i < percentElements.length; i++) {
    const element = percentElements.item(i);
    const txt = element.innerHTML.trim().replace(/^\D+/g, '');
    const num = parseFloat(txt);

    if (num.toString() != 'NaN') {
        const val = Math.round(num);
        
        for (const [grade, range] of Object.entries(conversions)) {
            if (val >= range[0] && val <= range[1]) {
                element.innerHTML = ` ${num}% (${grade}) `;
            }
        }
    }
}