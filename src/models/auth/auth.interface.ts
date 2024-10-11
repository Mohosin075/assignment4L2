import { USER_ROLE } from "./auth.constant"

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


export type TChangePassword = {
    currentPassword : string,
    newPassword : string
};

export type TUserRole = keyof typeof USER_ROLE