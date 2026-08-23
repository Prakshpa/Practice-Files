const CARD_VIEW = document.querySelector(".card-view");
const errorMessage=document.getElementById("message");
const search_input = document.getElementById("search-user");
const search_button=document.getElementById("search-button");
const search_option=document.getElementById("search-option");
const sort_option=document.getElementById("sort-option");
const search_section=document.querySelector(".search-items");
const fetch_button=document.getElementById("fetch-button");
const reset_button=document.getElementById("reset-button");
const validInput=/^[a-zA-Z0-9_ \-,\.\(\)]*$/;
const invalidInput=/[^a-zA-Z0-9_ \-,\.\(\)]/;
let response=[];
let filteredUsers=[];
errorMessage.style.display="block";
search_section.style.display="none";

function fetchRequest(callback){
    try {
        const fetch=new XMLHttpRequest();
        fetch.open("GET", "https://jsonplaceholder.typicode.com/users");
        fetch.send();
        fetch.addEventListener("readystatechange", (e)=>{
            if(fetch.readyState == 4){
                if(fetch.status==200){
                    responseText=fetch.responseText;
                    const responseData=JSON.parse(responseText);
                    response=JSON.parse(responseText);
                    callback(undefined, responseData);
                }else{
                    callback("Sorry could not fetch data", undefined);
                }
            }
        });
    } catch (error) {
        callback("An error occured during ajax call", undefined);   
    }
}
fetch_button.addEventListener("click", ()=>{
    message.textContent="Loading . . ."
    setTimeout(()=>{
        fetchRequest(callBack);
    }, 2000);
});
reset_button.addEventListener("click", ()=>{
    message.textContent="Click on Fetch users button to fetch users";
    CARD_VIEW.replaceChildren();
    search_section.style.display="none";
    message.style.display="block";
})
search_button.addEventListener("click", (e)=>{
    e.preventDefault();
})

function callBack(error, responseData){
    console.log(error, responseData);
    if(error){
        errorMessage.style.display="block";
        errorMessage.textContent=error;
    }else if(responseData){
        errorMessage.style.display="none";
        search_section.style.display="block";
        responseData.forEach((item, index) => {
            const cardElement=document.createElement("div");
            cardElement.setAttribute("class", "card-element");
            cardElement.setAttribute("data-key", item.id);

            const username=document.createElement("p");
            const usernameLabel=document.createElement('span');
            usernameLabel.textContent="UserName: ";
            usernameLabel.setAttribute("class", "label");
            const usernameValue=document.createElement("span");
            usernameValue.setAttribute("class", "username");
            usernameValue.textContent=`${item.username}`;
            username.appendChild(usernameLabel);
            username.appendChild(usernameValue);
            cardElement.appendChild(username);

            const name=document.createElement("p");
            const nameLabel=document.createElement('span');
            nameLabel.textContent="Name: ";
            nameLabel.setAttribute("class", "label");
            const nameValue=document.createElement("span");
            nameValue.setAttribute("class", "name");
            nameValue.textContent=`${item.name}`;
            name.appendChild(nameLabel);
            name.appendChild(nameValue);
            cardElement.appendChild(name);
            
            const email=document.createElement("p");
            const emailLabel=document.createElement('span');
            emailLabel.textContent="Email: ";
            emailLabel.setAttribute("class", "label");
            const emailValue=document.createElement("span");
            emailValue.setAttribute("class", "email");
            emailValue.textContent=`${item.email}`;
            email.appendChild(emailLabel);
            email.appendChild(emailValue);
            cardElement.appendChild(email);

            const phone=document.createElement("p");
            const phoneLabel=document.createElement('span');
            phoneLabel.textContent="Phone-No: ";
            phoneLabel.setAttribute("class", "label");
            const phoneValue=document.createElement("span");
            phoneValue.setAttribute("class", "phone");
            phoneValue.textContent=`${item.phone}`;
            phone.appendChild(phoneLabel);
            phone.appendChild(phoneValue);
            cardElement.appendChild(phone);

            const website=document.createElement("p");
            website.setAttribute("class", "website");
            website.textContent=`Website: ${item.website}`;
            cardElement.appendChild(website);

            CARD_VIEW.appendChild(cardElement);
        });
    }else {
        errorMessage.style.display="block";
    }
}

search_input.addEventListener("input", changeInput);
search_option.addEventListener("change", changeInput);
function changeInput(e) {
    let {id, value=""} =e.target;
    if(!validInput.test(value)){
        e.target.value=value.replace(invalidInput, "");
        return;
    }
    setTimeout(()=>{
        if(id==="search-user" && e.target.value===value){
            console.log(value);
            CARD_VIEW.replaceChildren();
            let filteredUsers=response.filter(object=>{
                if(search_option.value==""){
                    return JSON.stringify(object).toString().toLowerCase().indexOf(value.toLowerCase())>=0
                }else {
                    if(object[search_option.value].toLowerCase().indexOf(value.toLowerCase())<0) console.log(object[search_option.value], value);
                    else return true;
                }
            });
            if(filteredUsers.length > 0) callBack(undefined, filteredUsers);
            else callBack("No match found", undefined);
        }
    }, 1000);
}