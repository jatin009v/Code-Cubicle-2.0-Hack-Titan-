import { useEffect, useState } from "react";
import axios from "axios"
import { Button, Header, InputBox, BottomWarning } from "../components";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function SignUp(){
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("token");
        axios.post("http://localhost:8000/api/v1/user/me", {
            token
        }).then((res) => {
            if(res.data.msg){
                navigate("/dashboard")
            }
        })
    })
    return <div className="h-screen flex justify-center items-center">
        <div className="bg-slate-100 w-1/4 rounded-md p-3 shadow-md">
        <div className="flex justify-center text-blue-500 mb-4"><Header label={"SignUp"}/></div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">Email</h4>
            <InputBox onChange={(e) => {
               setEmail(e.target.value) 
            }} placeholder={"email"} type={"text"}/>
        </div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">Username</h4>
            <InputBox onChange={(e) => {
                setUsername(e.target.value)
            }} placeholder={"username"} type={"text"}/>
        </div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">Password</h4>
            <InputBox onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder={"password"} type={"text"}/>
        </div>
        <Button onClick={ async () => {
            const res = await axios.post("http://localhost:8000/api/v1/user/signup", {
                email,
                username,
                password
            })
            Cookies.set("token", res.data.token, { expires: 4 });
            navigate("/profile");
        }} label={"SignUp"}/>
        <div className="mt-3">
            <BottomWarning warning={"Already have one"} label={"SignIn"} to={"/signin"}/>
        </div>
    </div>
    </div>
}