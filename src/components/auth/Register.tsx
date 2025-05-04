import React, { useState } from 'react'
import supabase from '../../supabase/supabase';

interface RegisterErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    supabase?: string;
}

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<RegisterErrors>({
        username: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // TODO: Use React Hook Form for form handling and validation - this is just temporary
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({}); // Reset errors
        setIsSubmitting(true); // Set submitting state

        const newErrors: RegisterErrors = {};
        
        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';}
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username
                    }
                }
            });

            if (error) {
                setError({ supabase: error.message });
            } else {
                alert('Registration successful! Please check your email for a confirmation link.');
            }
        } catch (error) {
            setError({ supabase: 'An error occurred while creating your account. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <div className='mt-8 flex flex-row justify-center items-center'>
        <form className='w-full max-w-sm' onSubmit={handleSubmit}>
            <fieldset className='fieldset bg-base-100 border-base-300 rounded-box border p-4'>
                <legend className='fieldset-legend text-lg'>Register</legend>

                <label className='label'>Username</label>
                <input type="text" placeholder='e.g. PikachuLover93' className='input w-full' onChange={(e) => setUsername(e.target.value)} />
                {error.username && <p className='text-red-500 text-sm'>{error.username}</p>}

                <label className='label'>Email</label>
                <input type="email" placeholder='Email' className='input w-full' onChange={(e) => setEmail(e.target.value)} />
                {error.email && <p className='text-red-500 text-sm'>{error.email}</p>}

                <label className='label'>Password</label>
                <input type="password" placeholder='Password' className='input w-full' onChange={(e) => setPassword(e.target.value)} />
                {error.password && <p className='text-red-500 text-sm'>{error.password}</p>}

                <label className='label'>Confirm Password</label>
                <input type="password" placeholder='Confirm Password' className='input w-full' onChange={(e) => setConfirmPassword(e.target.value)} />
                {error.confirmPassword && <p className='text-red-500 text-sm'>{error.confirmPassword}</p>}

                <button type='submit' disabled={isSubmitting} className='btn btn-neutral mt-4'>{isSubmitting ? (<span className='loading loading-spinner loading-xs'></span>) : 'Register' }</button>
                <p className='text-sm text-center mt-2'>Already have an account? <a href="/login" className='link'>Login</a></p>
            </fieldset>
        </form>
    </div>
  )
}

export default Register