const fetchButton=document.getElementById("table-view");
const resetButton=document.getElementById("reset-button");
const main=document.querySelector("main");
const fetchURL="https://jsonplaceholder.typicode.com/users";
const searchOptions=[["username", "UserName"], ["name", "Name"], ["email", "Email"], ["phone", "Phone No"], 
                    ["website", "Website"]];
const sortOptions=[["asc", "Ascending Order"], ["des", "Descending Order"]];
let responseData=[];
let filteredData=[];

function createElement(tagName, attributes) {
    const element=document.createElement(tagName);
    attributes && attributes.forEach(attribute=>{
        element.setAttribute(...attribute);
    });
    return element;
}
function createElementWithText(tagName, textContent){
    const element=document.createElement(tagName);
    element.textContent=textContent;
    return element;
}
function removeElement(identifier) {
    const element=document.querySelector(identifier);
    if(element){
        const parent=element.parentNode;
        parent.removeChild(element);
        return parent;
        console.log(element);
    }
    return null;
}
function appendChild(parent, element){
    if(parent && (typeof parent) === string){
        const parent=document.querySelector(parent);
        parent.appendChild(element);
    }
    parent.appendChild(element);
}

function setMessageBox(){
    const parent=removeElement("p#message")
    const message=createElement("p", [["id", "message"]]);
    message.textContent="Click on fetch data button to fetch data";
    (parent || document.querySelector("main")).appendChild(message);
};
setMessageBox();

function fetchData(callback) {
    fetch(fetchURL)
    .then((response)=>{
        if(response.ok===true) return response.json();
        throw new Error("Failed to fetch data");
    }).then((data)=>{
        responseData=[...data];
        filteredData=[...data];
        callback(undefined, responseData);
        createSearchBar();
    }).catch((error)=>{
        callback(error, undefined);
    })
}
fetchButton.addEventListener("click", (e)=>{
    message.textContent="Loading . . ."
    setTimeout(() => {
        fetchData(callBack);
    }, 1000);
});
resetButton.addEventListener("click", ()=>{
    removeElement("section.search-items");
    removeElement("table.table-view");
    setMessageBox();
})

function callBack(error, response){
    if(error){
        message.textContent=error;
    }else{
        removeElement("p#message");
        console.log(response);
        removeElement("table.table-view");
        const TABLE_VIEW=createElement("table", [["class", "table-view"]]);
        const caption=createElement("caption", [["class", "caption"]]);
        TABLE_VIEW.appendChild(caption);
        const tableHeader=createElement("tr", [["class", "table-header"]]);
        const ID=createElementWithText("th", "ID")
        const UserName=createElementWithText("th", "UserName");
        const Name=createElementWithText("th", "Name");
        const Email=createElementWithText("th", "Email");
        const Phone=createElementWithText("th", "Phone No");
        const Website=createElementWithText("th", "Website");
        tableHeader.appendChild(ID);
        tableHeader.appendChild(UserName);
        tableHeader.appendChild(Name);
        tableHeader.appendChild(Email);
        tableHeader.appendChild(Phone);
        tableHeader.appendChild(Website);
        TABLE_VIEW.appendChild(tableHeader);

        filteredData.forEach(user => {
            const tableRow=createElement("tr", [["class", "user-table-row"]]);
            tableRow.appendChild(createElementWithText("td", user.id));
            tableRow.appendChild(createElementWithText("td", user.username));
            tableRow.appendChild(createElementWithText("td", user.name));
            tableRow.appendChild(createElementWithText("td", user.email));
            tableRow.appendChild(createElementWithText("td", user.phone));
            tableRow.appendChild(createElementWithText("td", user.website));
            TABLE_VIEW.appendChild(tableRow);
        });
        main.appendChild(TABLE_VIEW);
    }
}
function createSearchBar(){
    removeElement(".search-items");
    function searchUser() {
        const input=searchData.searchInput.toLowerCase();
        const searchBy=searchData.searchBy;
        filteredData=responseData.filter(user => {
            if(searchBy==="") {
                const objectString = (JSON.stringify(user)).toLowerCase();
                return objectString.indexOf(input) >= 0;
            } else {
                return user[searchBy].indexOf(input) >= 0;
            }
        });
        if(searchData.sortType === "asc" && searchBy !== ""){
            filteredData.sort((a, b)=> a[searchBy].localeCompare(b[searchBy]));
        }else if(searchData.sortType === "des" && searchBy === ""){
            filteredData.sort((a,b)=>-1)
        }else if(searchBy!==""){
            filteredData.sort((a,b)=>b[searchBy].localeCompare(a[searchBy]));
        }
        callBack(undefined, filteredData);
    }
    let searchData={
        searchBy: "",
        sortType: "",
        searchInput: ""
    }
    const searchSection=createElement("section", [["class", "search-items"]]);
    const searchForm=createElement("form", [["class", "search-form"]]);
    const searchType=createElement("select", [["class", "select-box"], ["id", "search-type"], ["title", "Search"]]);
    const defaultSearchOption=createElement("option", [["value", ""]]);
    defaultSearchOption.textContent="Search By";
    searchType.appendChild(defaultSearchOption);
    searchOptions.forEach(option => {
        const opt=createElement("option", [["value", option[0]]]);
        opt.textContent=option[1];
        searchType.appendChild(opt);
    });
    const sortType=createElement("select", [["class", "select-box"], ["id", "sort-type"], ["title", "Sort"]]);
    const defaultSortOption=createElement("option", [["value", ""]]);
    defaultSortOption.textContent="Sort By"
    sortType.appendChild(defaultSortOption)
    sortOptions.forEach(option => {
        const opt=createElement("option", [["value", option[0]]]);
        opt.textContent=option[1];
        sortType.appendChild(opt);
    });
    const searchInput=createElement("input",[["type", "search"],["class", "search-input"],["placeholder", "Search Users"]]);
    const searchButton=createElement("input", [["type", "submit"], ["class", "search-button"], ["value", "Search"]]);
    
    searchType.addEventListener("change", (e)=>{
        const value=e.target.value;
        searchData={...searchData, searchBy: value};
        setTimeout(() => {
            searchUser();
        }, 1000);
    });
    sortType.addEventListener("change", (e)=>{
        const value=e.target.value;
        searchData={...searchData, sortType:value};
        setTimeout(() => {
            searchUser();
        }, 1000);
    });
    searchInput.addEventListener("input", (e)=>{
        const value=e.target.value;
        searchData={...searchData, searchInput: value};
        // setTimeout(() => {
        //     if(e.target.value==value) searchUser();
        // }, 1000);
    });
    searchButton.addEventListener("click", (e)=>{
        e.preventDefault();
        setTimeout(()=>{
            searchUser();
        }, 1000)
    })

    searchForm.appendChild(searchType);
    searchForm.appendChild(sortType);
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    searchSection.appendChild(searchForm);
    main.insertBefore(searchSection, document.querySelector("table"));
}
