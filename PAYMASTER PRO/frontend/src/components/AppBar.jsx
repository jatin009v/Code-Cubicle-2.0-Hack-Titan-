import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import axios from "axios";
import Cookies from "js-cookie"
import Button from "./Button";

export default function AppBar() {
  const [username, setUsername] = useState("user");
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    axios.get("http://localhost:8000/api/v1/user/getinfo", {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }).then((res) => setUsername(res.data.userinfo.username))
  })
  return <div className="p-3 flex justify-between shadow-md items-center">
    <h1 className="font-bold text-2xl text-blue-500">Payments App</h1>
    <div>
        <h2 className="flex justify-between items-center gap-5 text-xl">Hello, {username} <Link to="/profile" className="rounded-full bg-blue-400 w-10 h-10 flex justify-center items-center text-white">{username[0].toUpperCase()}</Link><div>
        <Button onClick={() => {
          Cookies.remove("token");
          navigate("/signin")
        }} label={"Logout"}/>
        </div></h2>
    </div>
  </div>
}
