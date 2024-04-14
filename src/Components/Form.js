function Form({handleSubmit,setInput,input}){
return(
        <form onSubmit={handleSubmit} className="flex cursor-pointer rounded-lg w-full max-w-60 shadow overflow-hidden h-full max-h-10 mt-5 mb-1">
            <input 
            className="p-2 w-full px-5 cursor-pointer" 
            type="text" 
            placeholder="Add cities "
            value={input} 
            onChange={(event)=>{
                setInput(event.target.value)
            }} 
            ></input>
            <button className="p-2 bg-blue-200 hover:bg-blue-400">Add</button>
        </form>
        );
}
export default Form;