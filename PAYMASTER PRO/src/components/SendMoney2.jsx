import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Button, Header, InputBox } from "./"
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"


export default function SendMoney2(){
    const [serachParams] = useSearchParams();
    const id = serachParams.get("id");
    const name = serachParams.get("name");
    const [upi, setUpi] = useState("");
    const [amount, setAmount] = useState();
    const navigate = useNavigate();
    return <div className="bg-slate-100 shadow-md w-1/3 h-1/3 p-4">
        <div className="flex justify-center text-blue-500"><Header label={"Send Money"}/></div>
        <div className="flex gap-4 items-center mt-4">
            <div className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl">
               {name[0].toUpperCase()}
            </div>
            <h2 className="text-3xl font-bold">{name[0].toUpperCase()}{name.substring(1)}</h2>
        </div>
        <div className="mt-2">
            <h4 className="font-semibold text-xl mb-2">Amount in (₹)</h4>
            <InputBox onChange={(e) => setAmount(e.target.value)} placeholder={"amount"} type={"number"}/>
        </div>
        <div className="mt-2">
            <h4 className="font-semibold text-xl mb-2">UPI PIN</h4>
            <InputBox onChange={(e) => setUpi(e.target.value)} placeholder={"upi pin"} type={"password"}/>
        </div>
        <Button onClick={async (e) => {
            const token = Cookies.get("token");
            const res =  await axios.post("http://localhost:8000/api/v1/account/transfer", {
                amount,
                to: id,
                upipin: upi
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(!res.data.msg){
                navigate("/balancelow")
                return
            }
            navigate("/successful")
        }} label={"SendMoney"}/>
    </div>
}