let year = '';
for (let i = 2019; i > 1900; i--) {
    if (i != 2019) year += `<option value= '${i}'> Năm ${i} </option>`;
    else year += `<option value= '${i}' selected> Năm ${i} </option>`
}

document.getElementById('year').innerHTML = year;