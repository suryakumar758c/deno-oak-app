interface RegisterFormData {
    email?:string,
    password?:string
}

interface RegisterUserData {
    email:string,
    password:string
}

export type {
    RegisterFormData,
    RegisterUserData
}