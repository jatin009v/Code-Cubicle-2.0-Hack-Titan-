import { useEffect, useState } from "react"
import { Card } from "../components"
import axios from "axios"
import { useSearchParams } from "react-router-dom"
import Cookies from "js-cookie"

export default function History(){
    const [serachParams] = useSearchParams();
    const id = serachParams.get("id")
    const [historyArr, setHistoryArr] = useState([]);
    useEffect(() => {
        const token = Cookies.get("token");
        axios.post("http://localhost:8000/api/v1/account/history",{
            receiverId: id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setHistoryArr(res.data.history.amountHistory)
        })
    }, [])
    if(!historyArr || historyArr.length === 0){
        return <div className="h-screen w-screen flex justify-center items-center">
            <div className="bg-slate-100 rounded-md shadow-md p-2 flex flex-col gap-2 justify-center items-center w-fit">
            <svg className="w-25 h-25 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>
            <h1 className="font-bold text-4xl">No History Found</h1>
        </div>
        </div>
    }
    return <div className="w-full h-full flex flex-col items-center">
        {historyArr.map((e, idx) => {
            return <Card key={idx} amount={e.transferedAmount} date={e.Date} time={e.time}/>
        })}
    </div>
}