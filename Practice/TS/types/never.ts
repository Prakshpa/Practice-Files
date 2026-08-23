function throwMessage(message:string): never {
    throw new Error(message);    
}
throwMessage("ErrorMessage");