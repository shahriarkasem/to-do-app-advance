import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from './Loading';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user || gUser) {
      navigate('/');
    }
  },[user, gUser, navigate])

  const onSubmit = async (data, e) => {
    const email = data.email;
    const password = data.password;
    await signInWithEmailAndPassword(email, password)
    e.target.reset()
  };

  if (loading || gLoading) {
    return <Loading></Loading>
  }

  return (
    <section className='text-center my-5 border-2 max-w-md rounded-xl mx-auto py-5'>
      <h1 className='text-lg text-info font-semibold'><i>Please login to continue</i></h1>
      <div>
        <form className='flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your
                email</span>
            </label>
            <input type="email" placeholder="Email" autoComplete='off' className="input input-bordered w-full max-w-xs"
              {...register("email", {
                required: {
                  value: true,
                  message: 'Email is required'
                },
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Please enter a valid email'
                }
              })}
            />
            <label className="label">
              {
                errors?.email?.type === 'required' && <p className='text-red-500'><small>{errors.email.message}</small></p>
              }
              {
                errors?.email?.type === 'pattern' && <p className='text-red-500'><small>{errors.email.message}</small></p>
              }
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your
                password</span>
            </label>
            <input type="password" placeholder="Password" autoComplete='off' className="input input-bordered w-full max-w-xs"
              {...register("password", {
                required: {
                  value: true,
                  message: 'Password is required'
                },
                minLength: {
                  value: 8,
                  message: 'Your password must contain 8 character'
                }
              })}
            />
            <label className="label">
              {
                errors?.password?.type === 'required' && <p className='text-red-500'><small>{errors.password.message}</small></p>
              }
              {
                errors?.password?.type === 'minLength' && <p className='text-red-500'><small>{errors.password.message}</small></p>
              }
            </label>
          </div>
          {
            error && <p className='text-red-500'><small>{error.message}</small></p>
          }
          <button className={`btn max-w-xs w-full btn-outline ${(errors.name || errors.email || errors.password) ? 'btn-disabled' : ''}`} type="submit">Login</button>
        </form>
      </div>
      <div>
        <p><small>Dont have an account? <Link className='text-info' to='/signup'>Create account</Link></small></p>
      </div>
      <div className="divider max-w-xs mx-auto  font-semibold">OR</div>
      <div>
        {
          gError && <p className='text-red-500'><small>{gError.message}</small></p>
        }
        <button onClick={() => signInWithGoogle()} className='btn max-w-xs w-full btn-outline' type="submit">Contine with Google</button>
      </div>
    </section>
  );
};

export default Login;