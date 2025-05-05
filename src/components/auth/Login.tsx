import React, { useState } from 'react'
import supabase from '../../supabase/supabase';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginErrors {
    email?: string;
    password?: string;
    supabase?: string;
}

type LoginInputs = {
    email: string;
    password: string;
}

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({});
    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        setIsSubmitting(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password
        })
        if (error) {
            console.error(error);
            alert("Error: " + error.message);
            return;
        }

        alert("Login successful!");
        setIsSubmitting(false);
        navigate("/");
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

  return (
    <div className='mt-8 flex flex-row justify-center items-center'>
        <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4'>
                <legend className='fieldset-legend text-lg'>Login</legend>

                <label className='label'>Email</label>
                <input type="email" placeholder='Email' className='input w-full' {...register("email", { required: "Please enter your email" })} />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}

                <label className='label'>Password</label>
                <input type="password" placeholder='Password' className='input w-full' {...register("password", { required: "Please enter your password" })} />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

                <button type='submit' disabled={isSubmitting} className='btn btn-neutral mt-4'>{isSubmitting ? (<span className='loading loading-spinner loading-xs'></span>) : 'Login' }</button>
                <p className='text-sm text-center mt-2'>Don't have an account? <a href="/register" className='link'>Register</a></p>
            </fieldset>
        </form>
    </div>
  )
}

export default Login