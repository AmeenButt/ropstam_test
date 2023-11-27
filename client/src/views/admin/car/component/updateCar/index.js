
import { Grid, MenuItem, Select } from "@mui/material";
import PopupClose from "components/popupClose";
import PopupBoxLarge from 'components/popupBoxLarge'
import CommonInput from 'components/commonTextField'
import CommonButton from 'components/commonButton'
import useCar from "hooks/useCars";
import useCategories from "hooks/useCategories";
import { useEffect } from "react";
export default function Default(props) {
    let { setEditcar, formik,isLoading } = props
    let formFields = [
        {
            placeholder: 'Name',
            value: formik.values.name,
            onChange: formik.handleChange,
            type: 'text',
            name: 'name',
            icon: 'fas fa-folder',
            onBlur: formik.handleBlur,
            formik: formik
        },
        {
            placeholder: 'Color',
            value: formik.values.color,
            onChange: formik.handleChange,
            type: 'text',
            name: 'color',
            icon: 'fas fa-folder',
            onBlur: formik.handleBlur,
            formik: formik
        }, {
            placeholder: 'Model',
            value: formik.values.model,
            onChange: formik.handleChange,
            type: 'text',
            name: 'model',
            icon: 'fas fa-folder',
            onBlur: formik.handleBlur,
            formik: formik
        }, {
            placeholder: 'Year',
            value: formik.values.year,
            onChange: formik.handleChange,
            type: 'number',
            name: 'year',
            icon: 'fas fa-folder',
            onBlur: formik.handleBlur,
            formik: formik
        }, {
            placeholder: 'Make',
            value: formik.values.make,
            onChange: formik.handleChange,
            type: 'text',
            name: 'make',
            icon: 'fas fa-folder',
            onBlur: formik.handleBlur,
            formik: formik
        },
        {
            placeholder: 'Reg No',
            value: formik.values.regNo,
            onChange: formik.handleChange,
            type: 'text',
            name: 'regNo',
            icon: 'fas fa-folder',
            onBlur: formik.handleBlur,
            formik: formik
        },
    ]
    const { getData, categoriess } = useCategories()
    useEffect(() => {
        getData()
    }, [])

    return (
        <PopupBoxLarge>
            <PopupClose text='Update Car' onClose={() => { setEditcar(false) }} />
            <form onSubmit={formik.handleSubmit}>
                <Grid container columnSpacing={5}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {formFields.map((item, index) =>
                            <CommonInput
                                key={index}
                                icon={item.icon}
                                type={item.type}
                                value={item.value}
                                onChange={item.onChange}
                                name={item.name}
                                placeholder={item.placeholder}
                                formik={item.formik}
                                onBlur={item.onBlur}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Select value={formik.values.category ? formik.values.category : 'category'}
                            name='category' onChange={formik.handleChange} style={{
                                width: '100%',
                                marginBottom: '10px',
                                borderRadius: '6px',
                                
                            }}>
                            <MenuItem value='category'>Select Category</MenuItem>
                            {categoriess.map((item, index) => (
                                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                            ))}
                        </Select>
                        {formik && ((formik.touched.category && formik.errors.category) &&
                            <div style={{
                                color: 'red',
                                fontSize: '12px',
                                padding: '10px'
                            }}>{formik.errors.category}</div>)}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} align='center' sx={{ marginTop: '2%' }}>
                        <CommonButton
                            disabled={isLoading}
                            type='submit'
                            isLoading={isLoading}
                            text='Update Car'
                        />
                    </Grid>
                </Grid>
            </form>
        </PopupBoxLarge>
    )
}
