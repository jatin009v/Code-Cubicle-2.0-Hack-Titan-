import { SignUp, SignIn, Profile, DashBoard, Successful, History, BankComp, TransferMoney, BalanceLow } from "./pages/index"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/bank" element={<BankComp/>}/>
        <Route path="/send" element={<TransferMoney/>}/>
        <Route path="/successful" element={<Successful/>}/>
        <Route path="/balancelow" element={<BalanceLow/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
