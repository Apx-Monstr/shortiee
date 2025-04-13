import Login from "../../components/Login"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
export default function LoginPage () {
    return (
        <div className="flex min-h-screen flex-col">
            <Header/>
            <Login/>
            <Footer/>
        </div>           
    )
}