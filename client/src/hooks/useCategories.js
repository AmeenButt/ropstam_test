import { useContext, useState } from "react";
import { baseUrl, basePath } from "url"
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default () => {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showLoader, setShowLoader] = useState(true)
    const [addcategories, setAddcategories] = useState(false)
    const [editcategories, setEditcategories] = useState(false)
    const [editcategoriesId, setEditcategoriesId] = useState('')
    const [categoriess, setcategoriess] = useState([]);
    const [categoriesId, setcategoriesId] = useState()
    const [sortOrder, setSortOrder] = useState('asc');
    const [loader, setloader] = useState(true)
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
    });
    const initialValues = {
        name: '',
    };
    const initialValues1 = {
        name: '',
    };
    const formik = useFormik({
        initialValues: initialValues1,
        validationSchema,
        onSubmit: (values) => {
            submitcategoriesForm(values)
        },
    });
    const editFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            submitEditcategoriesForm(values)
        },
    });
    const submitcategoriesForm = async (values) => {
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}category/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    name: values.name,
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success('category Added', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    setAddcategories(false)
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
    const submitEditcategoriesForm = async (values) => {
        setIsLoading(true)
        try {
            await fetch(`${baseUrl}category/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    _id: editcategoriesId,
                    name: values.name
                })
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    toast.success('category Updated', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    setEditcategories(false)
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
            await fetch(`${baseUrl}category/delete?_id=${categoriesId}`, {
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
            await fetch(`${baseUrl}category/get`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
            }).then(res => res.json()).then(response => {
                if (response.status) {
                    setcategoriess(response.result);
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
    const handleSort = (column, data) => {
        const sortedData = [...data].sort((a, b) => {
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
        console.log(sortedData)
        // setcategoriess(sortedInstructors);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
        return sortedData;
    };
    return {
        handleSort,
        getData,
        onDelete,
        submitEditcategoriesForm,
        submitcategoriesForm,
        loader,
        setloader,
        sortOrder,
        setSortOrder,
        categoriesId,
        setcategoriesId,
        showLoader,
        setShowLoader,
        addcategories,
        setAddcategories,
        editcategories,
        setEditcategories,
        editcategoriesId,
        setEditcategoriesId,
        categoriess,
        setcategoriess,
        validationSchema,
        initialValues,
        initialValues1,
        formik,
        editFormik,
        confirmDelete,
        setConfirmDelete,
        isLoading,
        setIsLoading
    }
}