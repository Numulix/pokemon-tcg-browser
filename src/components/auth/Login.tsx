import React, { useState } from 'react'
import supabase from '../../supabase/supabase';
import { useNavigate } from 'react-router';

interface LoginErrors {
    email?: string;
    password?: string;
    supabase?: string;
}

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<LoginErrors>({
        email: undefined,
        password: undefined,
        supabase: undefined
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // TODO: Use React Hook Form for form handling and validation - this is just temporary... again...
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({}); // Reset errors
        setIsSubmitting(true); // Set submitting state
        const newErrors: LoginErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setIsSubmitting(false);
            return;
        }
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) {
                console.error('Error logging in:', error);
                newErrors.supabase = 'Invalid login credentials';
                setError(newErrors);
                return;
            }
            if (data) {
                console.log('Login successful:', data);
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            newErrors.supabase = 'An error occurred while logging in';
            setError(newErrors);
            return;
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    }

  return (
    <div className='mt-8 flex flex-row justify-center items-center'>
        <form className='w-full max-w-sm' onSubmit={handleSubmit}>
            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4'>
                <legend className='fieldset-legend text-lg'>Login</legend>
                {error.supabase && <p className='text-red-500 text-sm'>{error.supabase}</p>}

                <label className='label'>Email</label>
                <input type="email" placeholder='Email' className='input w-full' onChange={(e) => setEmail(e.target.value)} />
                {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}

                <label className='label'>Password</label>
                <input type="password" placeholder='Password' className='input w-full' onChange={(e) => setPassword(e.target.value)} />
                {error.password && <p className='text-red-500 text-sm'>{error.password}</p>}

                <button type='submit' disabled={isSubmitting} className='btn btn-neutral mt-4'>{isSubmitting ? (<span className='loading loading-spinner loading-xs'></span>) : 'Login' }</button>
                <p className='text-sm text-center mt-2'>Don't have an account? <a href="/register" className='link'>Register</a></p>
            </fieldset>
        </form>
    </div>
  )
}

export default Login