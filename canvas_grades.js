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

const ap_Offset = 1
const hon_Offset = 0.5
const rate = 0.1
const offset = -55

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let item_sum = 0;
let item_count = 0;
for (let i = 0; i < percentElements.length; i++) {
    const element = percentElements.item(i);
    const previous = element.previousElementSibling;
    const dropdown = element.nextElementSibling.nextElementSibling;
    const txt = element.innerHTML.trim().replace(/^\D+/g, '');
    const num = parseFloat(txt);

    const gpa_element = document.createElement('td');
    gpa_element.innerHTML = ' GPA: N/A ';

    if (num.toString() != 'NaN') {
        const val = Math.round(num);
        
        for (const [grade, range] of Object.entries(conversions)) {
            if (val >= range[0] && val <= range[1]) {
                element.innerHTML = ` ${num}% (${grade}) `;
            }
        }

        // Get Grade Modifiers
        const prevTitle = previous.getElementsByTagName('a')[0].innerHTML
        const isHon = prevTitle.indexOf('Hon') != -1 || prevTitle.indexOf('Honor') != -1 || prevTitle.indexOf('Honors') != -1;
        const isAP = prevTitle.indexOf('AP') != -1;

        // Get raw GPA
        const rawGPA = (num + offset) * rate;
        let gpa = rawGPA;

        if (isAP) {
            gpa += 1;
        } else if (isHon) {
            gpa += 0.5;
        }

        gpa_element.innerHTML = " GPA: " + gpa.toFixed(2) + " "

        // is Half Year Class
        const isHalfYear = dropdown.getElementsByTagName('select')[0].childElementCount <= 3;

        // Average
        item_sum += gpa;
        item_count += isHalfYear && 0.5 || 1
    }

    insertAfter(element, gpa_element)
}

const predictedGPA = document.createElement('h4');
predictedGPA.innerHTML = ' Predicted GPA: ' + (item_sum / item_count).toFixed(2) + ' ';

insertAfter(document.getElementsByTagName('h2')[0], predictedGPA)