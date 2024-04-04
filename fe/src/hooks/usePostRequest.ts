import axios, {AxiosError, AxiosResponse} from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { TRegisterSchema } from "../Model/registerSchema";

type TResponseData = {
    message: string;
    token: string;
    data: TRegisterSchema

}
export const UsePostRequest = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [resData, setResData] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState<AxiosError | null>(null);

    const sendPostRequest = async(url:string,userData:any, includeToken = true)=>{
        setIsLoading(true)
        try {
            const headers = includeToken
            ?{
                Authorization: `Bearer ${Cookies.get("authToken")}`
            }:{}
            const response: AxiosResponse<TResponseData> = await axios.post(url, userData, {headers})
            setResData(response)
            setError(null)
            
        } catch (error: any) {
            setError(error)
            setResData(null)
            
        }finally{
            setIsLoading(false)
        }
        
    }
    return {resData,error,isLoading,setError, sendPostRequest}



}