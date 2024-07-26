export default function Button({label, onClick}){
    return <button onClick={onClick} className="bg-blue-500 text-white p-3 rounded-md w-full font-bold text-xl hover:bg-blue-700">{label}</button>
}