const studentData=[{
    name: "Prakash Parajuli",
    marks: {
        Cyber_Law: 70,
        E_Governance: 75,
        Cloud_Computing: 65,
        SPM: 80
    }
},{
    name: "Ranjan Acharya",
    marks: {
        Cyber_Law: 80,
        E_Governance: 70,
        Cloud_Computing: 80,
        SPM: 90
    }
},{
    name: "Ram Bahadur",
    marks: {
        Cyber_Law: 50,
        E_Governance: 60,
        Cloud_Computing: 20,
        SPM: 80
    }
},{
    name: "Anish Acharya",
    marks: {
        Cyber_Law: 70,
        E_Governance: 80,
        Cloud_Computing: 65,
        SPM: 45
    }
}]
const testButton=document.getElementById("testButton");
testButton.addEventListener("click", ()=>{
    const studentTable=document.querySelector("table");
    if(studentTable) document.body.removeChild(studentTable);
    const studentResult=studentData.reduce((studentResult, student)=>{
        const {Cyber_Law, E_Governance, Cloud_Computing, SPM} = student.marks;
        const total=Cyber_Law + E_Governance + Cloud_Computing + SPM;
        const percentage=(total/400 * 100).toFixed(2);
        const result=(Cyber_Law >=40 && E_Governance>=40 && Cloud_Computing>=40 && SPM>=40)? "Passed" : "Failed";
        return [...studentResult, {name: student.name, total, percentage, result}];
    }, []);

    const resultTable=document.createElement("table");
    document.body.appendChild(resultTable);
    const caption=document.createElement("caption");
    caption.textContent="Student Result";
    const headRow=document.createElement("tr");
    const SN=document.createElement('th');
    SN.textContent="S.No.";
    headRow.appendChild(SN);
    const Name=document.createElement('th');
    Name.textContent="Student Name";
    headRow.appendChild(Name);
    const Percentage=document.createElement('th');
    Percentage.textContent="Percentage";
    headRow.appendChild(Percentage);
    const Result=document.createElement('th');
    Result.textContent="Result";
    headRow.appendChild(Result);
    resultTable.appendChild(headRow);

    studentResult.forEach((student,index) => {
        const newRow=document.createElement("tr");
        const sn=document.createElement("td");
        sn.textContent=index;
        const name=document.createElement("td");
        name.textContent=student.name;
        const percentage=document.createElement("td");
        percentage.textContent=student.percentage;
        const result=document.createElement("td");
        result.textContent=student.result;
        newRow.appendChild(sn);
        newRow.appendChild(name);
        newRow.appendChild(percentage);
        newRow.appendChild(result);
        resultTable.appendChild(newRow);
    });
})
