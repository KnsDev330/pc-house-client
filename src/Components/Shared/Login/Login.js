import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle, useSignInWithTwitter } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosHeaders, URLS } from '../../../Constants/URLS';
import { auth } from '../../../firebase.init';
import { formatErrMsg } from '../../../Hooks/formatErrMsg';
import Loading from '../Loading/Loading';

import googleSvg from '../../../images/google.svg';
import twitterSvg from '../../../images/twitter.svg';

import './Login.css';

const Login = () => {
    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // handle email login
    const [signIn, , emailLoading, emailError] = useSignInWithEmailAndPassword(auth);
    const onSubmit = async (data) => {
        if (data.password.length < 6) return toast.error(`Password must be at least 6 characters long`);
        signIn(data.email, data.password);
    }

    // handle signinwith xxx
    const [signInWithGoogle, , googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithTwitter, , twitterLoading, twitterError] = useSignInWithTwitter(auth);

    // set JWT and navigate user on successfull login
    const [user, , error] = useAuthState(auth);
    useEffect(() => {
        if (!user) return; // abort if user is not signed in
        axios.post(`${URLS.serverRoot}/${URLS.getJwt}`, { uid: user.uid, name: user.displayName, email: user.email }, { headers: AxiosHeaders.auth })
            .then(res => {
                console.log(res.data);
                const { ok, text, token } = res.data;
                if (!ok) return toast.error(text);
                if (!token) { toast.error(`Error: Cannot get JWT`); signOut(auth); return; }
                // set JWT to localstorage and navigate user
                localStorage.setItem('jwt', token);
                navigate(JSON.parse(localStorage.getItem("toLocation"))?.pathname || '/');
                localStorage.removeItem("toLocation");
                toast.success(`Success`);
            })
            .catch(err => { console.log(err); toast.error(`Error: ${err?.response?.data?.text || err.message}`) })
    }, [user, navigate]);

    // showing error if any
    useEffect(() => { error && toast.error(formatErrMsg(error)) }, [error]);
    useEffect(() => { emailError && toast.error(formatErrMsg(emailError)) }, [emailError]);
    useEffect(() => { googleError && toast.error(formatErrMsg(googleError)) }, [googleError]);
    useEffect(() => { twitterError && toast.error(formatErrMsg(twitterError)) }, [twitterError]);


    // showing loading screen if registering
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => { setShowLoading(!!emailLoading || !!googleLoading || !!twitterLoading) }, [emailLoading, twitterLoading, googleLoading]);

    return (
        <div className='mx-auto w-[500px] max-w-full px-4 my-5 flex flex-col items-center grow-1'>
            <h2 className="text-2xl font-bold text-amber-400">Login</h2>
            <small>Login to your account</small>
            <div className='bg-white border-2 rounded-xl flex flex-col items-center my-4 py-4 lg:py-8 px-4 w-full'>
                {
                    showLoading ? <Loading></Loading> : <>

                        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>

                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Email: </span></label>
                                <input type="text" placeholder="Enter You Email" className="input input-bordered w-full max-w-xs" {...register('email', { required: true, })} />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.email && "Invalid Email Provided"}</span>
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label py-0"><span className="label-text">Password: </span></label>
                                <input type="text" placeholder="Enter You Password" className="input input-bordered w-full max-w-xs" {...register('password', { required: true, })} />
                                <label className="label pt-0">
                                    <span className="label-text-alt text-red-400">{errors.password && "Invalid Password Provided"}</span>
                                </label>
                            </div>

                            <input type="submit" value='Login' className='btn btn-primary my-4 px-8 text-white' />
                            <p>
                                New here? <Link to='/register' className='text-blue-400'>Register</Link><br />
                                Forgot Password? <Link to='/reset-password' className='text-blue-400'>Reset</Link>
                            </p>

                        </form>

                        {/* Social Logins */}
                        <div className="divider w-[80%] mx-auto">OR</div>

                        <button className='continue-with-button flex items-center border px-6 py-3 rounded-xl my-1' onClick={() => signInWithGoogle()}>
                            <img src={googleSvg} alt="Google" />
                            <p>Continue with Google</p>
                        </button>
                        <button className='continue-with-button flex items-center border px-6 py-3 rounded-xl my-1' onClick={() => signInWithTwitter()}>
                            <img src={twitterSvg} alt="Twitter" />
                            <p>Continue with Twitter</p>
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default Login;