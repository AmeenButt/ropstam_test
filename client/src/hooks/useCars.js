import { useContext, useState } from "react";
import { baseUrl, basePath } from "url"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default () => {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const [addcar, setAddcar] = useState(false)
    const [viewCar, setViewCar] = useState(false)
    const [editcar, setEditcar] = useState(false)
    const [car, setcar] = useState([]);
    const [carId, setcarId] = useState()
    const [sortOrder, setSortOrder] = useState('asc');
    const [loader, setloader] = useState(true)

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        color: Yup.string().required('Color is required'),
        make: Yup.string().required('Make is required'),
        year: Yup.number('Year can only contain numbers').required('Year is required'),
        model: Yup.string().required('Model is required'),
        regNo: Yup.string().required('Reg No is required'),
        category: Yup.string().required('Category is required'),
    });
    const initialValues = {
        name: "",
        color: "",
        make: "",
        year: "",
        model: "",
        regNo: "",
        category: ""
    };
    const initialValues1 = {
        name: "",
        color: "",
        make: "",
        year: "",
        model: "",
        regNo: "",
        category: ""
    };
    const formik = useFormik({
        initialValues: initialValues1,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
            submitcarForm(values)
        },
    });
    const editFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            submitEditcarForm(values)
        },
    });
    const submitcarForm = async (values) => {
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}car/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: values.name,
                    regNo: values.regNo,
                    make: values.make,
                    model: values.model,
                    year: values.year,
                    color: values.color,
                    category: values.category,
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success('Car Added', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    setAddcar(false)
                    getData()
                    formik.values.name = ''
                }
                else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }).catch(err => {
                navigator(`/${basePath}/error`);

            })
        } catch (err) {

        }
        setIsLoading(false)
    }
    const submitEditcarForm = async (values) => {
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}car/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    _id: carId,
                    name: values.name,
                    regNo: values.regNo,
                    make: values.make,
                    model: values.model,
                    year: values.year,
                    color: values.color,
                    category: values.category,
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success('Car Updated', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    setEditcar(false)
                    getData()
                    editFormik.values.name = ''
                }
                else {
                    toast.error(response.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }).catch(err => {
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            console.log(err)

        }
        setIsLoading(false)
    }
    const onDelete = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}car/delete?_id=${carId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(res => res.json())
                .then(response => {
                    if (response.status) {
                        getData()
                        toast.success(`Entry Deleted`, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                    else {
                        toast.error(response.error, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }).catch(err => {

                })
        } catch (err) {
            console.log(err)

        }
        setIsLoading(false);
        setConfirmDelete(false)
    }
    const getData = async () => {
        try {
            await fetch(`${baseUrl}car/get`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
            }).then(res => res.json()).then(response => {
                console.log(response)
                if (response.status) {
                    setcar(response.result);
                }
            }).catch(err => {
                toast.error(err, {
                    position: toast.POSITION.TOP_LEFT
                });
                navigator(`/${basePath}/error`);

            })
        } catch (err) {
            toast.error(err, {
                position: toast.POSITION.TOP_LEFT
            });

        }
        setloader(false);
    }
    const handleSort = (column) => {
        const sortedInstructors = [...car].sort((a, b) => {
            if (column === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (column === 'dateAdded') {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            // Handle other columns if needed
            return 0;
        });

        setcar(sortedInstructors);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
    };
    return {
        handleSort,
        getData,
        onDelete,
        submitEditcarForm,
        submitcarForm,
        loader,
        setloader,
        sortOrder,
        setSortOrder,
        carId,
        setcarId,
        showLoader,
        setShowLoader,
        addcar,
        setAddcar,
        editcar,
        setEditcar,
        car,
        setcar,
        validationSchema,
        initialValues,
        initialValues1,
        formik,
        editFormik,
        confirmDelete,
        setConfirmDelete,
        isLoading,
        setIsLoading,
        viewCar, 
        setViewCar
    }
}