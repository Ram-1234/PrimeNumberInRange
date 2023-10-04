

let primeNumber = (n) => {
    let count = 0;
    for (let i = 2; i <= parseInt(Math.sqrt(n)); i++) {
        if (n % i === 0) count++;
    }
    if (count > 0) return 0
    else return 1;
}
/* 
prime method
time complexity : O(sqrt(n)); 
space complexity: O(1);
*/


const getPrimesInRange = (num1, num2) => {
    let aa = [];
    let totalStart = Date.now();
    for (let i = num1; i <= num2; i++) {
        const startTime = Date.now();
        let res = primeNumber(i);
        const endTime = Date.now();
        if (res) aa.push({ ['number']: i, ['result']: 'Prime', ['time']: (endTime - startTime) });
        else aa.push({ ['number']: i, ['result']: 'Normal', ['time']: (endTime - startTime) })
    }
    return { data: aa, total_time: (Date.now() - totalStart) }
}
/* 
getPrimeInRange method
time complexity : O(n) * O(sqrt(n)) =>  O(n(sqrt(n))); over all complexity
space complexity: O(n); array store prime numbers.
*/

document.getElementById('details').addEventListener('click', (e) => {
    e.preventDefault()
    let num1 = document.getElementById('input1').value;
    let num2 = document.getElementById('input2').value;
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    let res = [];
    let totalTime = 0;
    if ((num2 >= num1) && (num1 > 1)) {
        const { data, total_time } = getPrimesInRange(num1, num2);
        res = data
        totalTime = total_time;
    } else {
        alert('num1 must be greater than 1')
    }

    /* average time complexity of 2b & 2c */
    let averageTime = parseFloat(totalTime / res.length).toFixed(5);

    if (res.length > 1) {
        document.getElementById('tab__button').style.visibility = 'visible';
    }
    document.getElementById('input1').value = null;
    document.getElementById('input2').value = null;
    let averageTimeTaken = document.getElementById('average__time');
    let totalTimeTaken = document.getElementById('total__time');
    let table_1 = document.getElementById('table_1');
    let table_2 = document.getElementById('table_2');
    let modalBody = document.getElementById('modal_body');
    let tabBtnB = document.getElementById('tab_btn_2b');
    let tabBtnC = document.getElementById('tab_btn_2c');
    let table1 = document.getElementById('table1');
    let table2 = document.getElementById('table2');
    let modalTitle = document.getElementById('exampleModalLabel');

    averageTimeTaken.innerHTML = `Average time taken: ${averageTime}`;
    totalTimeTaken.innerHTML = `Total time taken: ${totalTime}`;

    /*  table 2b map */
    let tableB = res && res.map((item, index) => {
        let tr = document.createElement('TR');
        let td1 = document.createElement('TD')
        let td2 = document.createElement('TD')
        let td3 = document.createElement('TD')
        td1.append(item.number)
        td2.append(item.result);
        td3.append(item.time);
        tr.append(td1, td2, td3)
        return tr;
    })
    table_1.append(...tableB);

    /*  table 2c map */
    let tableC = res && res.map((item, index) => {
        if (item.result === 'Normal') return null;
        let tr = document.createElement('TR');
        let td1 = document.createElement('TD')
        let td2 = document.createElement('TD')
        td1.append(item.number)
        td2.append(item.time);
        tr.append(td1, td2)
        return tr;
    })
    table_2.append(...tableC.filter(item => item !== null));

    /* table 2b modal open */
    tabBtnB.addEventListener('click', () => {
        modalBody?.lastElementChild && modalBody.removeChild(modalBody?.lastElementChild); // clear the previous table
        table1.style.visibility = 'visible';
        modalTitle.innerHTML = "Example 2B"
        modalBody.append(table_1);
    })

    /* table 2c modal open */
    tabBtnC.addEventListener('click', () => {
        modalBody?.lastElementChild && modalBody.removeChild(modalBody?.lastElementChild); // clear the previous table
        table2.style.visibility = 'visible';
        table1.style.visibility = 'hidden';
        modalTitle.innerHTML = "Example 2C"
        modalBody.append(table_2);
    })

})

