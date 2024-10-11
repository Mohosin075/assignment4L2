
export type UserRole = 'user' | 'admin'

export type TUser = {
    username : string,
    email : string,
    password : string,
    role : UserRole
}


export type TLoinUser = {
    username : string,
    password : string
}