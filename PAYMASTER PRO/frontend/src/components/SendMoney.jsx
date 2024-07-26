import { useNavigate } from "react-router-dom"

export default function SendMoney({isLinked, label, toId}) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between m-2">
        <div className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex justify-center items-center text-white text-xl">
                {label[0].toUpperCase()}
            </div>
            <p className="text-xl">{label}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={()=>{
            navigate(`/history?id=${toId}`)
          }} className="rounded-md bg-blue-500 text-white p-2 px-5 hover:bg-blue-700">History</button>
          <button onClick={()=>{
            if(!isLinked){
              navigate("/dashboard")
            }
            else navigate(`/send?id=${toId}&name=${label}`)
          }} className="rounded-md bg-blue-500 text-white p-2 hover:bg-blue-700">Send Money</button>
        </div>
    </div>
  )
}