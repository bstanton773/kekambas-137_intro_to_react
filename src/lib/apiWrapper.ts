import axios from 'axios';
import { UserFormDataType, UserType } from '../types'


const baseURL: string = 'https://kekambas-137-api.onrender.com';
const userEndpoint: string = '/users';


const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

type APIResponse<T> = {
    error?: string,
    data?: T
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}


export {
    register
}
