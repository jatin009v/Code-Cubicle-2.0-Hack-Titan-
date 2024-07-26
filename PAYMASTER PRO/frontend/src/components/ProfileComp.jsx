import { useEffect, useState } from "react"
import { Button, Header, InputBox } from "./"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

export default function ProfileComp(){
    const [username, setUsername] = useState("")
    const [ firstName, setFirstname ] = useState("");
    const [ lastName, setLastname ] = useState("");
    const [ mobNo, setMobNo ] = useState("");
    const [ address, setAddress ] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("token");
        axios.get("http://localhost:8000/api/v1/user/getinfo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const { username, firstName, lastName, address, mobNo } = res.data.userinfo;
            setUsername(username);
            setFirstname(firstName);
            setLastname(lastName);
            setAddress(address);
            setMobNo(mobNo);
        })
    }, [])
    return <div className="bg-slate-100 w-1/2 h-1/2 rounded-md shadow-md p-4">
        <div className="flex justify-center mb-7"><Header label={"Profile"}/> </div>
        <div className="flex justify-center flex-col items-center gap-1">
            <div className="w-16 h-16 bg-blue-400 text-white font-bold text-5xl flex justify-center items-center rounded-full">{username[0]}</div>
            <h2 className="text-xl font-semibold">{username?username:"username"}</h2>
        </div>
        <div className="mt-5">
            <div className="mb-2 flex gap-4">
                <div className="w-1/2">
                    <h4 className="font-semibold text-xl">Firstname</h4>
                    <InputBox onChange={(e) => setFirstname(e.target.value)} value={firstName} placeholder={"firstname"} type={"text"}/>
                </div>
                <div className="w-1/2">
                    <h4 className="font-semibold text-xl">Lastname</h4>
                    <InputBox onChange={(e) => setLastname(e.target.value)} value={lastName} placeholder={"lastname"} type={"text"}/>
                </div>
            </div>
            <div className="mb-2">
                <h4 className="font-semibold text-xl">Phone No</h4>
                <InputBox onChange={(e) => setMobNo(e.target.value)} value={mobNo} placeholder={"phone no"} type={"text"}/>
            </div>
            <div className="mb-2">
                <h4 className="font-semibold text-xl">Address</h4>
                <InputBox onChange={(e) => setAddress(e.target.value)} value={address} placeholder={"address"} type={"text"}/>
            </div>
            <div className="flex justify-center">
                <div className="w-1/4">
                    <Button label={"Save"} onClick={ async () => {
                        const token = Cookies.get("token");
                        await axios.post("http://localhost:8000/api/v1/user/update", {
                            firstName,
                            lastName,
                            address,
                            mobNo
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        navigate("/dashboard")
                    }}/>
                </div>
            </div>
        </div>
    </div>
}