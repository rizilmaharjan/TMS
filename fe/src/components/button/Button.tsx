type TButton={
    children: React.ReactNode,
    isSubmitting?: boolean
}
const Button = ({children, isSubmitting}:TButton) => {
  if(isSubmitting){
    console.log("the form is being submitted")
  }
  return (
    <>
        <button disabled={isSubmitting} className={`w-full h-full ${isSubmitting ? "bg-red-400" : ""} `}>
            {children}
        </button >
      
    </>
  )
}

export default Button
