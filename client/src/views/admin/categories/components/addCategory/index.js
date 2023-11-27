
import { Grid } from "@mui/material";
import PopupClose from "components/popupClose";
import PopupBoxLarge from 'components/popupBoxLarge'
import CommonInput from 'components/commonTextField'
import CommonButton from 'components/commonButton'
export default function Default(props) {
    let { setAddcategories, formik, isLoading } = props
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
        }
    ]
    return (
        <PopupBoxLarge>
            <PopupClose text='Add Category' onClose={() => { setAddcategories(false) }} />
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

                    <Grid item xs={12} sm={12} md={12} lg={12} align='center' sx={{ marginTop: '2%' }}>
                        <CommonButton
                            disabled={isLoading}
                            type='submit'
                            isLoading={isLoading}
                            text='Add category'
                        />
                    </Grid>
                </Grid>
            </form>
        </PopupBoxLarge>
    )
}
