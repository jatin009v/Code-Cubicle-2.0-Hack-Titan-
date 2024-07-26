import { Link } from "react-router-dom"

export default function BottomWarning({label, warning, to}){
    return <div className="flex gap-2 justify-center">{warning}<Link
    to={to} className="text-blue-500 underline">{label}</Link></div>
}