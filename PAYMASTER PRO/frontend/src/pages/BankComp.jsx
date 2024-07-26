import { useState } from "react"
import { InputBox, Header, Button } from "../components"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

export default function BankComp() {
    const [bankName, setBankName] = useState("pnb");
    const [regMobNo, setRegMobNo] = useState("");
    const [upi, setUpi] = useState("");
    const [confirmUpi, setConfirmUpi] = useState("")
    const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="bg-slate-100 shadow-md rounded-md w-1/3 p-4">
        <div className="text-blue-500 mb-4 flex justify-center"><Header label={"Link Bank"}/></div>
        <div className="flex gap-5 mb-2">
            <label className="font-semibold text-xl" htmlFor="cars">Choose a Bank:</label>

            <select name="banks" id="banks" onChangeCapture={(e) => {
                setBankName(e.target.value);
            }}>
            <option value="pnb">PNB</option>
            <option value="sbi">SBI</option>
            <option value="bob">Bank of Baroda</option>
            <option value="yes bank">Yes Bank</option>
            </select>
        </div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">registered mobile number</h4>
            <InputBox onChange={(e) => {
                setRegMobNo(e.target.value)
            }} placeholder={"Mobile Number"} type={"text"}/>
        </div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">create pin</h4>
            <InputBox onChange={(e) => {
                setUpi(e.target.value)
            }} placeholder={"create upi pin"} type={"password"}/>
        </div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">confirm pin</h4>
            <InputBox onChange={(e) => {
                setConfirmUpi(e.target.value)
            }} placeholder={"confirm upi pin"} type={"password"}/>
        </div>
        <Button onClick={() => {
            if(upi !== confirmUpi || !regMobNo || regMobNo.length < 10 || !bankName || bankName.length === 0) {
                window.alert("upi pin is not same/ invalid mob no/ bank not selected")
                return;
            }
            const token = Cookies.get("token");
            axios.post("http://localhost:8000/api/v1/bank/set",{
                bankName,
                mobNumber: regMobNo,
                upiPin: upi
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate("/dashboard")
            window.location.reload()
        }} label={"Link"}/>
    </div>
    </div>
  )
}
