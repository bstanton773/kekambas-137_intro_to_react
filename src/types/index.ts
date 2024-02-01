
export type UserFormDataType = {
    firstName:string,
    lastName:string,
    username:string,
    email:string,
    password:string,
    confirmPass:string
}

export type UserType = {
    id:number,
    firstName:string,
    lastName:string,
    username:string,
    email:string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light'

export type TokenType = {
    token: string,
    tokenExpiration: string
}

export type CommentType = {
    id:number,
    body:string,
    postId:number,
    user:UserType
}

export type PostType = {
    id:number,
    title:string,
    body:string,
    dateCreated:string,
    userId:number,
    author: UserType,
    comments: CommentType[]
}

export type PostFormDataType = {
    title:string,
    body:string
}
