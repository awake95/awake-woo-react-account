// import {useState, useEffect} from 'react';
//
// interface IUseForm {
//     callback: any,
//     validate:
// }
//
// const useForm = (callback, validate, initialValues, setSelectedOptions, setIsValueChanged, isChecked) => {
//
//     const [values, setValues] = useState(initialValues);
//     const [errors, setErrors] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//
//     useEffect(() => {
//         if (Object.keys(errors).length === 0 && isSubmitting) {
//             callback();
//         }
//     }, [errors]);
//
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setErrors(validate(values, isChecked));
//         setIsSubmitting(true);
//     };
//
//     const handleChange = (event) => {
//         event.persist();
//         setValues(values => ({...values, [event.target.name]: event.target.value}));
//         setIsValueChanged(true);
//     };
//
//     return {
//         handleChange,
//         handleSubmit,
//         values,
//         errors,
//     }
// };
//
// export default useForm;
