/** use case for yup and react hook form */
// modules
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// components
import { Page } from '../../components/Page';

type UserSubmitForm = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	acceptTerms: boolean;
};

const validationSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is required')
		.min(4, 'Username must be at least 4 characters')
		.max(8, 'Username must not exceed 8 characters'),
	email: Yup.string().required('Email is required').email('Email is invalid'),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(10, 'Password must not exceed 10 characters'),
	confirmPassword: Yup.string()
		.required('Confirm Password is required')
		.oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
});

const Login: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserSubmitForm>({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = (data: UserSubmitForm) => {
		/* eslint-disable */
		console.log(data);
	};

	return (
		<Page withLayout={false}>
			<div className='register-form'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='form-group'>
						<label>Username</label>
						<input
							type='text'
							{...register('username')}
							className={`form-control ${errors.username ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors.username?.message}</div>
					</div>

					<div className='form-group'>
						<label>Email</label>
						<input
							type='text'
							{...register('email')}
							className={`form-control ${errors.email ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors.email?.message}</div>
					</div>

					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							{...register('password')}
							className={`form-control ${errors.password ? 'is-invalid' : ''}`}
						/>
						<div className='invalid-feedback'>{errors.password?.message}</div>
					</div>
					<div className='form-group'>
						<label>Confirm Password</label>
						<input
							type='password'
							{...register('confirmPassword')}
							className={`form-control ${
								errors.confirmPassword ? 'is-invalid' : ''
							}`}
						/>
						<div className='invalid-feedback'>
							{errors.confirmPassword?.message}
						</div>
					</div>

					<div className='form-group form-check'>
						<input
							type='checkbox'
							{...register('acceptTerms')}
							className={`form-check-input ${
								errors.acceptTerms ? 'is-invalid' : ''
							}`}
						/>
						<label htmlFor='acceptTerms' className='form-check-label'>
							I have read and agree to the Terms
						</label>
						<div className='invalid-feedback'>
							{errors.acceptTerms?.message}
						</div>
					</div>

					<div className='form-group'>
						<button type='submit' className='btn btn-primary'>
							Register
						</button>
						<button
							type='button'
							onClick={() => reset()}
							className='btn btn-warning float-right'
						>
							Reset
						</button>
					</div>
				</form>
			</div>
		</Page>
	);
};

export default Login;
