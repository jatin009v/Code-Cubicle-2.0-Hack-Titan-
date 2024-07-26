import { useState, useEffect } from "react";
import { BottomWarning, Button, Header, InputBox } from "../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

export default function SignIn(){
    const [ email, setEmail ] = useState("");
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
        <div className="flex justify-center text-blue-500 mb-4"><Header label={"SignIn"}/></div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">Email</h4>
            <InputBox onChange={(e) => {
                setEmail(e.target.value)
            }} placeholder={"email"} type={"text"}/>
        </div>
        <div className="mb-2">
            <h4 className="font-semibold text-xl">Password</h4>
            <InputBox onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder={"password"} type={"password"}/>
        </div>
        <Button onClick={ async () => {
            const res = await axios.post("http://localhost:8000/api/v1/user/signin", {
                email,
                password
            });
            console.log(res)
            Cookies.set("token", res.data.token, { expires: 4 })
            navigate("/dashboard");
        }} label={"SignIn"}/>
        <div className="mt-3">
            <BottomWarning warning={"Don't have one"} label={"SignUp"} to={"/"}/>
        </div>
    </div>
    </div>
}