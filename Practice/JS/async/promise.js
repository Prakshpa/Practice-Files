const fetch_button=document.getElementById("fetch-button");
fetch_button.addEventListener("click", ()=>{
    fetchUserData()
    // .then((data)=>{
    //     return data.json();
    // })
    .then(data=>{
        console.log(data);
    })
    .catch(error=>{
        console.log(error);
    })
})
function fetchUserData(){
    return new Promise((resolve, reject)=>{
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                reject("Sorry, There was a problem when fetching the data.");
            })
    });
}