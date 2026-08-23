const submitButton=document.getElementById("submit");
const ID=document.getElementById("id");
const UserName=document.getElementById("username");
const Name=document.getElementById("name");
const Email=document.getElementById("email");
const Phone=document.getElementById("phone");
const Password=document.getElementById('password');
const validName=/^([a-z]+( [a-z]+)*){1}$/i;
const validPhone=/^[0-9]{7,10}$/;
const validEmail=/^([\w]+(\.[\w])*){1}(\@[a-z]+){1}([\w]+\.)*[a-z]+$/;
const validUserName=/^[\w]+$/;
const validPassword=/^[\w!@#$%&]{7,12}/;

submitButton.addEventListener("click", async (e)=>{
    e.preventDefault();
    const id=ID.value;
    const username=UserName.value?.trim();
    const name=Name.value?.trim();
    const email=Email.value?.trim();
    const phone=Phone.value?.trim();
    const password=Password.value;
    if(!id) alert("Id is required");
    else if(!validUserName.test(username)) alert("UserName can only contain alphanumeric characters and _: "+username);
    else if (!validName.test(name)) alert("Full name field can only contain alphabets and a space: "+name);
    else if (!validEmail.test(email)) alert("Invalid Email: "+email);
    else if (!validPhone.test(phone)) alert ("Phone number can only contain 7 to 10 digits: "+phone);
    else if (!validPassword.test(password)) alert("Only alphanumeric characters and ! @ # $ % & allowed in 7-12 character password: "+password);
    
    if(id && validUserName.test(username) && validName.test(name) && validEmail.test(email) && validPhone.test(phone) && validPassword.test(password)){
        try {
            const userData={ id, username, email, phone, name, password };
            const response=await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            if(response.ok){
                console.log(await response.json());
                alert("Registered Successfully");
                location.href="login.html";
            }else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
            console.log("Failed to get response");
        }
    }else console.log("Something went wrong");
})