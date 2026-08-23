const users=document.createElement("div");
const userData=[["UserName","username"], ["Name", "name"], ["Email","email"], ["Phone","phone"], ["Website", "website"]];
fetch("https://jsonplaceholder.typicode.com/users")
.then((response)=>{
    if(response.ok) return response.json();
    else users.textContent="Failed to fetch Data";
}).then((responseData)=>{
    if(responseData.length===0) users.textContent="No users found";
    responseData.forEach(user => {
        const singleUser=document.createElement("div");
        singleUser.setAttribute("class", "card-element");
        userData.forEach(data => {
            const dataField=document.createElement("p");
            dataField.textContent=`${data[0]}: ${user[data[1]]}`;
            singleUser.appendChild(dataField);
        });
        users.appendChild(singleUser);
    });
    document.body.appendChild(users);
}).catch((error)=>{
    console.log("Error Occured: ", error);
})