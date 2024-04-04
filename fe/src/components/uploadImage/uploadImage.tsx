import { useEffect, useRef } from "react"
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setProfilePicture } from "../../redux/features/profile/profileSlice";

declare global {
    interface Window {
        cloudinary: any; 
    }
}

// type props={
//     profileImage: (value: React.SetStateAction<string>) => void
// }

const UploadWidget = ()=>{
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const dispatch = useAppDispatch()
    useEffect(()=>{
        cloudinaryRef.current = window.cloudinary;
        if(cloudinaryRef.current){

            widgetRef.current =  (cloudinaryRef.current as any).createUploadWidget({
                cloudName: import.meta.env.VITE_CLOUD_NAME,
                uploadPreset: import.meta.env.VITE_PRESET_NAME
                
            }, function(error:any,result:any){
                if(result && result.event === "success"){
                    // profileImage(result.info.secure_url)
                    dispatch(setProfilePicture(result.info.secure_url))
                }
                
                
            })
        }

    },[])

    return(
        <button type="button" onClick={()=>widgetRef.current && (widgetRef.current as any).open()}>edit</button>
    )

}

export default UploadWidget