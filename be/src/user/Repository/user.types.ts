export type TUser={
    userId: string;
    username: string;
    iat: number
}

export type TResetPassword = {
    password: string,
    confirmPassword: string
}

export type TUserResetPassword = {
    email: string,
    id: string,
    iat: number
}