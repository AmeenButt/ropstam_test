import React, { useState } from "react";
import { Grid } from "@mui/material";
import PopupClose from "components/popupClose";
import PopupBoxLarge from 'components/popupBoxLarge'
import CommonInput from 'components/commonTextField'
import CommonButton from 'components/commonButton'
import useCategories from "hooks/useCategories";
export default function Default(props) {
    const { editFormik, setEditcategories,isLoading } = props;
    let formFields = [
        {
            placeholder: 'Name',
            value: editFormik.values.name,
            onChange: editFormik.handleChange,
            type: 'text',
            name: 'name',
            icon: 'fas fa-folder',
            onBlur: editFormik.handleBlur,
            formik: editFormik
        }
    ]
    return (
        <PopupBoxLarge>
            <PopupClose text='Update Category' onClose={() => { setEditcategories(false) }} />
            <form onSubmit={editFormik.handleSubmit}>
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
                    <Grid item xs={12} sm={12} md={12} lg={12} align='center' sx={{ marginTop: '2%' }}>
                        <CommonButton
                            disabled={isLoading}
                            type='submit'
                            isLoading={isLoading}
                            text='Update'
                        />
                    </Grid>
                </Grid>
            </form>
        </PopupBoxLarge>
    )
}
