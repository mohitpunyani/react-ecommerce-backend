import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    let navigate=useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        if (user && user.token) {
            navigate('/');
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        }
        await sendPasswordResetEmail(auth, email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log("ERROR MSG IN FORGOT PASSWORD", error);
            });
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4 className='text-danger'>Loading</h4>
            ) : (
                <h4>Forgot Password</h4>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                    placeholder="type your email"
                    autoFocus
                />
                <br />
                <button className='btn btn-primary' disabled={!email}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword