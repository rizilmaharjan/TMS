import { RefObject, useEffect, useRef } from "react"

type TProps={
    DropDown:boolean
    categoryValue: (val:string)=>void
    categoryDropdown: (val:boolean)=>void
}
export const Category = ({DropDown, categoryValue, categoryDropdown}:TProps) => {
  // const dropref:RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  // useEffect(()=>{
  //   let handler = (e:any)=>{
  //     console.log("dropref", dropref)
  //     console.log("e.target", e.target)
  //     if(!dropref.current?.contains(e.target)){
  //       categoryDropdown(false)
  //       console.log("i am inside the if block")

  //     }
  //   }
  //   document.addEventListener("mousedown", handler)
  //   return ()=>{
  //     document.removeEventListener("mousedown", handler)
  // }

  // },[categoryDropdown])


  const handleCategoryClick = (category:string)=>{
    categoryValue(category)
    categoryDropdown(!DropDown)


  }
  return (
    <>
        <div className={`w-40 h-32 absolute bg-white rounded-sm boxShadow3 top-[53px] z-10 ${DropDown ? "block" : "hidden"}`}>
          <p onClick={()=>handleCategoryClick("")} className="mt-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">All</p>
          <p onClick={()=>handleCategoryClick("pending")} className="my-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">Pending</p>
          <p onClick={()=>handleCategoryClick("completed")} className="hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">Completed</p>
        </div>
      
    </>
  )
}

