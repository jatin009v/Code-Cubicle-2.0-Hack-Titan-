import { useEffect, useState } from "react";
import { AppBar, Button, InputBox, SendMoney } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"

export default function DashBoard(){
    const [users, setUsers] = useState([]);
    const [balance, setBalance] = useState([]);
    const [filter, setFilter] = useState("");
    const [isLinked, setIsLinked] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = Cookies.get("token");
        axios.get("http://localhost:8000/api/v1/bank/get", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            res.data.msg? setIsLinked(true): setIsLinked(false)
        })
    }, [])
    useEffect(() => {
        const token = Cookies.get("token");
        axios.get(`http://localhost:8000/api/v1/user/bulk?filter=${filter}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
       }).then((res) => {
        setUsers(res.data.users);
       })
    }, [filter])
    useEffect(() => {
        const token = Cookies.get("token");
        axios.get("http://localhost:8000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setBalance(res.data.balance);
        })
    }, [])
    return <div> 
        {isLinked? null:<div className="w-full bg-red-500 text-white p-2">Your Bank is not linked kindly link your bank <button className="bg-blue-500 p-1 rounded-md hover:bg-blue-700" onClick={() => {
            navigate("/bank")
        }}>Click Here</button></div>}
        <AppBar/>
        <div className="p-3">
            <div className="bg-blue-500 text-white w-fit p-4 rounded-md shadow-md">
                <h4 className="font-bold">You Balance</h4>
                <p className="text-5xl">₹{isLinked? balance.toLocaleString(): "--------"}</p>
            </div>
            <div className="mt-5">
                <h1 className="text-2xl font-semibold text-blue-500 mb-2">People</h1>
                <InputBox onChange={(e) => setFilter(e.target.value.toLowerCase())} placeholder={"Search By (eg. firstname, lastname or phone number)"}/>
                {users.map((e, idx) => {
                    return <SendMoney key={idx} label={e.username} toId={e.id} />
                })}
            </div>
        </div>
    </div>
}