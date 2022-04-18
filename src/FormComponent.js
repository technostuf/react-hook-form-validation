import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = yup.object().shape({
    firstName: yup.string()
        .required('First Name is required'),
    lastName: yup.string()
        .required('Last name is required'),
    email: yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    mobile: yup.string().matches(phoneRegExp, 'Phone number is not valid')
});

const FormComponent = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = data => {
        console.log(JSON.stringify(data));
    };

    return (
        <div className="container">
            <div className="row register-form ">
                <h1>React hook form schema validation with yup - technostuf.com</h1>
                <div className="col-md-6" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className="control-label">First Name</label>
                            <input
                                name="firstName"
                                type="text"
                                {...register('firstName')}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                type="text"
                                {...register('lastName')}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                name="email"
                                type="text"
                                {...register('email')}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>

                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                name="mobile"
                                type="text"
                                {...register('mobile')}
                                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.mobile?.message}</div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                            <button type="button" onClick={() => reset()}
                                className="btn btn-warning float-right" >
                                Reset
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </div>
    )
}
export default FormComponent;