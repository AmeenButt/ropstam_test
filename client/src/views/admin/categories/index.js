import {
    Card,
    CardHeader,
    Container,
    Row,
} from "reactstrap";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import ConfirmDelete from 'components/deleteConfirmation'
import './index.css'
import useCategories from "hooks/useCategories";
import CommonButton from 'components/commonButton'
import AddCategory from 'views/admin/categories/components/addCategory'
import UpdateCategory from 'views/admin/categories/components/updateCategory'
import DataTable from 'components/dataTable'
const Tables = () => {
    const {
        confirmDelete, setConfirmDelete,
        handleSort,
        onDelete,
        loader,
        setcategoriesId,
        showLoader,
        addcategories,
        setAddcategories,
        editcategories,
        setEditcategories,
        setEditcategoriesId,
        categoriess,
        getData,
        editFormik,
        formik,
        isLoading
    } = useCategories()

    useEffect(() => {
        getData()
    }, [])
    if (loader) {
        return <div style={{ marginTop: '120px' }}>
            <ClipLoader
                color={'#2a62ff'}
                loading={true}
                cssOverride={{
                    display: "block",
                    margin: "5% auto",
                    borderColor: "red",
                }}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></div>
    }
    return (
        <div style={{ postion: 'relative', marginTop: '120px' }}>
            {addcategories && <AddCategory setAddcategories={setAddcategories} formik={formik} isLoading={isLoading} />}
            {editcategories && <UpdateCategory setEditcategories={setEditcategories} editFormik={editFormik} isLoading={isLoading} />}
            {confirmDelete && <ConfirmDelete onDelete={onDelete} isLoading={isLoading} setConfirmDelete={setConfirmDelete} />}
            {/* Page content */}
            <Container fluid style={{ 'marginBottom': '60px' }}>
                {/* Table */}
                <Row>
                    <div>
                        <Card className="shadow">
                            <CardHeader style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h1 className="mb-0">Categories</h1>
                                <Box>
                                    <CommonButton text='Add Category' onSubmit={() => { setAddcategories(true) }} isLoading={false} />
                                </Box>
                            </CardHeader>
                            <DataTable
                                data={categoriess}
                                sortItem={handleSort}
                                showLoader={showLoader}
                                onDelete={(e, item) => {
                                    e.preventDefault();
                                    setcategoriesId(item._id)
                                    setConfirmDelete(true)
                                }}
                                onEdit={(e, item) => {
                                    e.preventDefault();
                                    editFormik.values.name = item.name
                                    setEditcategoriesId(item._id)
                                    setEditcategories(true);
                                }}
                            />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Tables;
