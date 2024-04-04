import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const useGetRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resData, setResData] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

    const getData = async (url:string, includeToken=true) => {
      setIsLoading(true);
      try {
        const headers = includeToken
          ? {
              Authorization: `Bearer ${Cookies.get("authToken")} `,
            }
          : {};
        const response: AxiosResponse = await axios.get(url, { headers });
        setResData(response)
        setError(null)
      } catch (error:any) {
        setError(error)
        setResData(null)
      }finally{
        setIsLoading(false)
      }
    };
  return {isLoading, resData, error, getData}
};


export default useGetRequest;
