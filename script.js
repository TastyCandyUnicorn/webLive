
function tableGenerator(){
    const procNum = parseInt(document.getElementById('process-count').value);
    const container = document.getElementById('table');

    container.innerHTML = '';

    if(isNaN(procNum) || procNum<1){
        container.innerHTML = '<p style="color: red;" >Please enter a valid number</p>';
        return;
    }
    let tableHTML = `
    <table>
        <thead>
            <tr>
                <th>ProcessID</th>
                <th>BurstTime</th>
            </tr>
        </thead>
        <tbody>
                `;
    for(i=1;i<procNum+1;i++){
        tableHTML+= `
        <tr>
            <td><input type="number" value=${i} id="pid-${i}" class="table"></td>
            <td><input type="number" min="0" placeholder="0" id="burst-${i}" class="table"></td>
        </tr>
        `;
    }
    tableHTML +=`
        </tbody>
            </table>
    `;
    container.innerHTML = tableHTML;
}
function scheduler(){
    const procNum = parseInt(document.getElementById('process-count').value);
    const burstTime = []
    const pid = []
    for(i=1;i<procNum+1;i++){
        const burstValue  = parseInt(document.getElementById(`burst-${i}`).value);
        const pidValue = parseInt(document.getElementById(`pid-${i}`).value);
        burstTime.push(burstValue);
        pid.push(pidValue);
    }
    for(i=0;i<procNum-1;i++){
        for(j=i+1;j<procNum;j++){
            if(burstTime[i]>burstTime[j]){
                k = burstTime[i];
                m = pid[i];
                burstTime[i] = burstTime[j];
                burstTime[j] = k;
                pid[i] = pid[j];
                pid[j] = m;
            }
        }
    }
    const container = document.getElementById('output');
    let tableHTML=`
    <table>
        <thead>
            <tr>
                <th>ProcessId</th>
                <th>BurstTime</th>
                <th>WaitingTime</th>
                <th>TurnAroundTime</th>
            </tr>
        </thead>
        <tbody>
    `;
    const wt = new Int16Array(procNum);
    const tat = new Int16Array(procNum);
    for(i=0;i<procNum;i++){
        const processId = pid[i];
        const bursttime = burstTime[i];
        if(i===0){
            wt[i] = 0;
            tat[i] = bursttime;
        }else{
            wt[i] = tat[i-1];
            tat[i] = wt[i]+bursttime;
        }
        tableHTML+=`
            <tr>
                <td>P${processId}</td>
                <td>${bursttime}</td>
                <td>${wt[i]}</td>
                <td>${tat[i]}</td>
            </tr>
        `;
    }
    tableHTML+=`
        </tbody>
    </table>
    `;
    container.innerHTML = tableHTML;
    const container2 = document.getElementById('output2');
    let pen=``;
    
}