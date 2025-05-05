import React, { useState } from 'react'
import supabase from '../../supabase/supabase';
import { SubmitHandler, useForm } from 'react-hook-form';


type RegisterInputs = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<RegisterInputs>({});
    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        setIsSubmitting(true);
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    username: data.username
                }
            }
        })
        if (error) {
            console.error(error);
            alert("Error: " + error.message);
        } else {
            alert("Check your email for the confirmation link!");
        }
        setIsSubmitting(false);
    }
    const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='mt-8 flex flex-row justify-center items-center'>
        <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4'>
                <legend className='fieldset-legend text-lg'>Register</legend>

                <label className='label'>Username</label>
                <input type="text" placeholder='e.g. PikachuLover93' className='input w-full' {...register("username", { required: "Please enter your username" })} />
                {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}

                <label className='label'>Email</label>
                <input type="email" placeholder='Email' className='input w-full' {...register("email", { required: "Please enter your email" })} />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}

                <label className='label'>Password</label>
                <input type="password" placeholder='Password' className='input w-full' {...register("password", { required: "Please enter your password", minLength: { value: 8, message: "Your password must be at least 8 characters long" } })} />
                {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}

                <label className='label'>Confirm Password</label>
                <input type="password" placeholder='Confirm Password' className='input w-full' {...register("confirmPassword", { required: "Please confirm your password", validate: value => value === watch('password') || "Passwords do not match" })} />
                {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}

                <button type='submit' disabled={isSubmitting} className='btn btn-neutral mt-4'>{isSubmitting ? (<span className='loading loading-spinner loading-xs'></span>) : 'Register' }</button>
                <p className='text-sm text-center mt-2'>Already have an account? <a href="/login" className='link'>Login</a></p>
            </fieldset>
        </form>
    </div>
  )
}

export default Register