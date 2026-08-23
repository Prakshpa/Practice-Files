interface User {
    id: string,
    name: string,
    phone: number,
    email: string
}

(()=>{
    const userData: User = {
        id: "abcd123",
        name: "Avishek",
        phone: 1233345567,
        email: "abc@gmail.com"
    };
    console.log("Normal User data: ", userData);

    const partialData: Partial<User> = {
        name: "Abinash Chettri"
    }
    console.log("Partial data: ", partialData);

    const userContact: Pick<User, "phone" | "email">= { phone: userData.phone, email: userData.email }
    console.log("Pick userContact data: ", userContact);

    const omitContact:Omit<User, "phone" | "email">={ id: userData.id, name: userData.name };
    console.log("Omit contact data: ", omitContact);
    
    const readOnly: Readonly<User>=userData;
    console.log("Created Readonly user: ", readOnly);
    //readOnly.name="Ram"
    console.log("Can't modify its properties\n");
    
    console.log("Adding users to record . . . ");
    const user1: User={
        id: "abcd124",
        name: "Bibek",
        phone: 12345678,
        email: "bibek@gmail.com"
    };
    const user2: User={
        id: "abcd125",
        name: "Chandra",
        phone: 123456789,
        email: "chandra@gmail.com"
    };
    const user3: User={
        id: "abcd126",
        name: "Dipesh",
        phone: 1234567890,
        email: "dipesh@gmail.com"
    };
    const userRecord: Record<number, User>={
        1: user1,
        2: user2,
        3: user3
    }
    console.log("User Record: ", userRecord);
})()