const assignments = document.getElementById('grades_summary').querySelectorAll('.student_assignment')
const groups = document.querySelectorAll('.hard_coded');
const conversions = {
  'A+': [97, Infinity],
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
  'F': [-Infinity, 64],
}

function extractNum(tgt) {
  const txt = tgt.trim().replace(/^\D+/g, '');
  const num = parseFloat(txt);

  if (num.toString != 'NaN') {
    return num;
  } else {
    return null;
  }
}

for (let i = 0; i < assignments.length; i++) {
  try {
    const element = assignments.item(i);
    const actual = extractNum(element.querySelector('.original_score').innerHTML);
    const max = extractNum(element.querySelector('.tooltip').children[1].innerHTML);
    const pct = (actual / max * 100).toFixed(2);

    for (const [grade, range] of Object.entries(conversions)) {
      if (Math.round(pct) >= range[0] && Math.round(pct) <= range[1]) {
        element.innerHTML += `<td>${pct}%<br>${grade}</td>`;
      }
    }
  } catch (e) {
    console.log("Fiddlesticks")
  }
}

for (let i = 0; i < groups.length; i++) {
  try {
    const element = groups.item(i);
    const tgt = element.querySelector('.grade');
    const pct = extractNum(tgt.innerHTML);

    for (const [grade, range] of Object.entries(conversions)) {
      console.log(grade, range, Math.round(pct) >= range[0] && Math.round(pct) <= range[1])
      if (Math.round(pct) >= range[0] && Math.round(pct) <= range[1]) {
        console.log(grade);
        tgt.innerHTML = `${pct}% (${grade})`
      }
    }
  } catch (e) { 
    console.log(e);
  }
}