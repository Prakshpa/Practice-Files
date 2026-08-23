const submitButton=document.getElementById("submit");
const UserName=document.getElementById("username");
const Password=document.getElementById('password');
const validUserName=/^[\w]+$/;
const validPassword=/^[\w!@#$%&]{7,12}/;

submitButton.addEventListener("click", async (e)=>{
    e.preventDefault();
    const username=UserName.value?.trim();
    const password=Password.value;
    if(!validUserName.test(username)) alert("UserName can only contain alphanumeric characters and _: "+username);
    else if (!validPassword.test(password)) alert("Only alphanumeric characters and ! @ # $ % & allowed in 7-12 character password: "+password);
    
    if(validUserName.test(username) && validPassword.test(password)){
        try {
            // const userData={ username, email, phone, name, password };
            const response=await fetch("https://fakestoreapi.com/users")
            if(response.ok){
                const users=await response.json();
                console.log(users);
                const user=users && users.find((value)=> value.username===username && value.password===password);
                console.log(user)
                if(user && user.email!==""){
                    alert("Logged in Successfully");
                    location.href="home.html";
                }else alert("Invalid Username or password");
            }else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
            console.log("Failed to get response");
        }
    }else console.log("Something went wrong");
})