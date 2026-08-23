"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
(() => {
    const userData = {
        id: "abcd123",
        name: "Avishek",
        phone: 1233345567,
        email: "abc@gmail.com"
    };
    console.log("Normal User data: ", userData);
    const partialData = {
        name: "Abinash Chettri"
    };
    console.log("Partial data: ", partialData);
    const userContact = { phone: userData.phone, email: userData.email };
    console.log("Pick userContact data: ", userContact);
    const omitContact = { id: userData.id, name: userData.name };
    console.log("Omit contact data: ", omitContact);
    const readOnly = userData;
    console.log("Created Readonly user: ", readOnly);
    //readOnly.name="Ram"
    console.log("Can't modify its properties\n");
    console.log("Adding users to record . . . ");
    const user1 = {
        id: "abcd124",
        name: "Bibek",
        phone: 12345678,
        email: "bibek@gmail.com"
    };
    const user2 = {
        id: "abcd125",
        name: "Chandra",
        phone: 123456789,
        email: "chandra@gmail.com"
    };
    const user3 = {
        id: "abcd126",
        name: "Dipesh",
        phone: 1234567890,
        email: "dipesh@gmail.com"
    };
    const userRecord = {
        1: user1,
        2: user2,
        3: user3
    };
    console.log("User Record: ", userRecord);
})();
//# sourceMappingURL=utilityTypes.js.map