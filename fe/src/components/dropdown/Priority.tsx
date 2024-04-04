type TProps={
    DropDown:boolean
    priorityValue: (val:string)=>void
    priorityDropdown: (val:boolean)=>void
}
export const Priority = ({DropDown, priorityValue, priorityDropdown}:TProps) => {

  const handleCategoryClick = (category:string)=>{
    priorityValue(category)
    priorityDropdown(false)


  }
  return (
    <>
        <div className={`w-40 absolute bg-white rounded-sm boxShadow3 top-[53px] left-40 z-10 ${DropDown ? "block" : "hidden"}`}>
          <p onClick={()=>handleCategoryClick("")} className="mt-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">All</p>
          <p onClick={()=>handleCategoryClick("high")} className="mt-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">High</p>
          <p onClick={()=>handleCategoryClick("medium")} className="my-2 hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">Medium</p>
          <p onClick={()=>handleCategoryClick("low")} className="hover:bg-[#f5f5f7] cursor-pointer py-1 px-3">Low</p>
        </div>
      
    </>
  )
}

