import { USER_ROLE } from "./auth.constant"

export type UserRole = 'user' | 'admin'

export type TPasswordHistory = {
    password : string;
    changeAt : Date;
}

export type TUser = {
    username : string,
    email : string,
    password : string,
    role : UserRole,
    passwordHistory ?: TPasswordHistory[];
    checkPasswordReduce(newPassword : string) : Promise<boolean>
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