export default function InputBox({placeholder, type, onChange, value}){
    return <div className="mb-4">
        <input onChange={onChange} type={type}placeholder={placeholder} value={value} className="rounded-md p-2 w-full outline-blue-500 border-slate-400 border-2"/>
    </div>
}