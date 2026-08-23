const USER_TABLE=document.querySelector(".table-view>tbody");
const API="https://fakestoreapi.com/users";
const loadingBox=document.querySelector(".loading-box");
const userForm=document.getElementById("user-form");
const submitUser=document.getElementById("submit-user");
const cancelButton=document.getElementById("cancel-button");
const UserName=document.getElementById("username");
const Name=document.getElementById("name");
const Email=document.getElementById("email");
const Password=document.getElementById("password");
const Phone=document.getElementById("phone");
const formError=document.querySelector("form span.error");
const viewBox=document.querySelector(".view-box");
const validName=/^([a-z]+( [a-z]+)*){1}$/i;
const validPhone=/^[0-9]{7,10}$/;
const validEmail=/^([\w]+(\.[\w])*){1}(\@[a-z]+){1}([\w]+\.)*[a-z]+$/;
const validUserName=/^[\w]+$/;
const validPassword=/^[\w!@#$%^&]{6,12}/;
const invalidNumber=/[^0-9]/;
const [HOME, USERS] = document.querySelectorAll("nav>ul a");
let id=undefined;
let users=[];

function createId() {
    return Math.floor(Math.random()*1000);
}
async function fetchUsers(){
    try {
        console.log("Fetching");
        const response=await fetch(API);
        if(!response.ok) throw new Error("Failed to fetch data");
        users=await response.json();
        
        renderUsers();
    } catch (error) {
        formError.textContent=error;
    }finally {
        loadingBox.style.display="none";
    }
}
fetchUsers();

function renderUsers() {
    USER_TABLE.textContent="";
    userForm.style.display="none";
    users && users.map((user, index)=>{
        USER_TABLE.innerHTML+=`<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.name.firstname} ${user.name.lastname}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>
                <button class="action-button view-btn" onclick="viewUser(${user.id})">View</button>
                <button class="action-button edit-btn" onclick="editUser(${index})">Edit</button>
                <button class="action-button delete-btn" onclick="deleteUser(${user.id}, ${index})">Delete</button>
            </td>
        </tr>`;
    });
}

async function viewUser(id){
    const userResponse=await fetch(`${API}/${Math.floor(Math.random()*10)}`);
    if(userResponse.ok){
        const user=await userResponse.json();
        viewBox.textContent=user.toString();
    }
}
function createUser(){
    id=undefined;
    UserName.value="";
    Password.style.display="inline";
    Name.value="";
    Email.value="";
    Phone.value="";
    Password.value="";
    submitUser.value="Create user";

    userForm.style.display= (userForm.style.display==="block")? "none" : "block";
}
function editUser(index) {
    const user=users[index];
    id=user.id;
    console.log(user);
    UserName.value=user.username;
    Password.style.display="none";
    Name.value=((typeof user.name) === String)? user.name : `${user.name.firstname} ${user.name.lastname}` ;
    Email.value=user.email;
    Phone.value=(user.phone).replaceAll("-", "");
    submitUser.value="Edit user";
    console.log(UserName.value, Name.value, Email.value, Phone.value, submitUser.value);
    
    userForm.style.display="block";
}
async function deleteUser(id, index) {
    if(!confirm("Do You want to delete the user "+users[index].username)) {
        alert("Cancelled");
    }
    try {
        const response=await fetch(`${API}/${id}`, {
            method: "DELETE"
        });
        if(response.ok){
            alert("Deleted successfully");
            users.splice(users.find(user=>user.id===id), 1);

            renderUsers();
        }else throw new Error("Failed to fetch form Backend");
    } catch (error) {
        formError.textContent=error;
    }
}
HOME.addEventListener("click", (e)=>{
    e.preventDefault();
    loadingBox.style.display="grid";
    fetchUsers();
})
USERS.addEventListener("click", (e)=>{
    e.preventDefault();
    loadingBox.style.display="grid";
    fetchUsers();
})

submitUser.addEventListener("click", async (e)=>{
    e.preventDefault();
    submitUserData();
});
cancelButton.addEventListener("click", cancel);

async function submitUserData(){
    const [fullName,username,email,phone,password]=[Name.value,UserName.value,Email.value,Phone.value,Password.value];
    if(validName.test(fullName) && validUserName.test(username) && validEmail.test(email) && validPhone.test(phone)){
        if(id===undefined) {
            if(!validPassword.test(password)) {
                formError.textContent+"Password must be 6-12 characters long with only alphanumeric characters and _ ! @ # $ % ^ &";
                return;
            }
        }
        formError.textContent="";
        Password.value="";
        try {
            const RequestAPI= (id===undefined)? API : `${API}/${Math.floor(Math.random()*10)}`;
            const RequestMethod= (id===undefined)? "POST" : "PUT";
            console.log(RequestAPI);
            const name={
                firstName: (fullName.indexOf(" ")>0)? fullName.substring(0, fullName.indexOf(" ")-1) : fullName,
                lastName: (fullName.indexOf(' ')>0)? fullName.substring(fullName.indexOf(" ")+1, fullName.length) : ""
            }
            const userdata= { ...users[0], id: id || createId(), name, username, email, phone, password };
            console.log(userdata);
            const response= await fetch(RequestAPI, {
                method: RequestMethod,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userdata)
            });
            if(response.ok){
                console.log("Success: ",await response.json());
                fetchUsers();
            }else formError.textContent="Failed: "+response;
        } catch (error) {
            formError.textContent="Error: "+error;
        }
    }else formError.textContent="Error in validating your data";
}
function cancel() {
    UserName.value="";
    Name.value="";
    Email.value="";
    Phone.value="";
    Password.value="";
    id=undefined;
    userForm.style.display="none";

}