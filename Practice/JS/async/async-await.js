const CARD_VIEW = document.querySelector(".card-view");
const main=document.querySelector("main");
const message=document.getElementById("message");
const initialMessage="Click on Fetch users button to fetch users";
const fetchURL="https://jsonplaceholder.typicode.com/users";
const search_input = document.getElementById("search-user");
const search_button=document.getElementById("search-button");
const search_option=document.getElementById("search-option");
const sort_option=document.getElementById("sort-option");
const search_section=document.querySelector(".search-items");
const fetch_button=document.getElementById("fetch-button");
const reset_button=document.getElementById("reset-button");
const footer=document.querySelector("footer");
const validInput=/^[a-zA-Z0-9_ \-,\.\(\)]*$/;
const invalidInput=/[^a-zA-Z0-9_ \-,\.\(\)]/;
let response=[];
let filteredUsers=[];
message.textContent=initialMessage;
message.style.display="block";
search_section.style.display="none";

async function fetchRequest(callback) {
    try {
        const fetchResponse=await fetch(fetchURL);
        footer.style.display="block";
        if(fetchResponse.ok===true){
            response=await fetchResponse.json();
            filteredUsers=await [...response];
            callback(undefined, filteredUsers);
        }else{
            throw new Error("Failed to fetch the responses");
        }
    } catch (error) {
        callback(error, response);
    }finally{
        message.removeAttribute("class", "loading-spinner");
    }
}
fetch_button.addEventListener("click", async (e)=>{
    footer.style.display="none";
    // message.textContent="Loading";
    message.textContent="";
    message.setAttribute("class", "loading-spinner");
    setTimeout(async () => {
        await fetchRequest(callBack);
    },0);
});
reset_button.addEventListener("click", ()=>{
    CARD_VIEW.replaceChildren();
    search_option.value="";
    sort_option.value="";
    search_input.value="";
    search_section.style.display="none";
    message.textContent=initialMessage;
    message.style.display="block";
})
function callBack(error, response){
    if(error){
        message.style.display="block";
        message.textContent=error;
    }else {
        message.style.display="none";
        search_section.style.display="block";
        response.forEach((item, index) => {
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

            const detailsButton=document.createElement("button");
            detailsButton.textContent="View Details";
            detailsButton.addEventListener("click", ()=>{
                viewDetails(index);
            });
            detailsButton.setAttribute("class", "details-button");
            cardElement.appendChild(detailsButton);

            CARD_VIEW.appendChild(cardElement);
        });
    }
};
function viewDetails(index) {
    const userObject=filteredUsers[index];
    const address=userObject.address;
    const detailsElement=document.createElement("div");
    detailsElement.innerText=`
        id: ${userObject.id}
        UserName: ${userObject.username}
        Name: ${userObject.name}
        Address: ${address.street}, ${address.suite}, ${address.city} (${address.zipcode})
        Company: ${userObject.company.name} (${userObject.company.catchPhrase})
        Email: ${userObject.email}
        Phone: ${userObject.phone}
        Website: ${userObject.website}
    `
    const backButton=document.createElement("button");
    backButton.textContent="Back";
    backButton.addEventListener("click", ()=>{
        main.removeChild(detailsElement);
        CARD_VIEW.style.display="grid";
    })
    detailsElement.appendChild(backButton);
    main.insertBefore(detailsElement, CARD_VIEW);
    CARD_VIEW.style.display="none";
}
search_input.addEventListener("input", changeInput);
search_option.addEventListener("change", changeInput);
sort_option.addEventListener("change", changeInput)
function changeInput(e) {
    const  inputValue=search_input.value;
    const sortBy=sort_option.value;
    const searchBy=search_option.value;
    let {id, value=""} =e.target;
    if(!validInput.test(value)){
        e.target.value=value.replace(invalidInput, "");
        return;
    }
    setTimeout(()=>{
        if(search_input.value===inputValue){
            console.log(value);
            CARD_VIEW.replaceChildren();
            filteredUsers=response.filter(object=>{
                if(searchBy==""){
                    return JSON.stringify(object).toString().toLowerCase().indexOf(inputValue.toLowerCase())>=0
                }else {
                    if(object[searchBy].toLowerCase().indexOf(inputValue.toLowerCase())<0) console.log(object[searchBy], inputValue);
                    else return true;
                }
            });
            if(filteredUsers.length > 0){
                if (sortBy==="") filteredUsers=filteredUsers.sort((a,b)=>a.id - b.id)
                else if (sortBy==="des" && searchBy==="") filteredUsers = filteredUsers.sort((a,b)=>-1);
                else if (sortBy==="des" && searchBy!=="") filteredUsers=filteredUsers.sort((a,b)=>b[searchBy].localeCompare(a[searchBy]));
                else if (sortBy==="asc" && searchBy==="") filteredUsers=filteredUsers.sort((a,b)=>a.id-b.id);
                else if(sortBy==="asc" && searchBy!=="") filteredUsers=filteredUsers.sort((a,b)=>a[searchBy].localeCompare(b[searchBy]));
                callBack(undefined, filteredUsers);
            }else callBack("No match found", undefined);
        }
    }, 1000);
}