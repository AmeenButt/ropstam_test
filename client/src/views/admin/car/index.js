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
import useCar from "hooks/useCars";
import CommonButton from 'components/commonButton'
import AddCar from 'views/admin/car/component/addCar'
import UpdateCar from 'views/admin/car/component/updateCar'
import ViewCar from 'views/admin/car/component/view'
import DataTable from 'components/dataTable'
const Tables = () => {
    const {
        handleSort,
        onDelete,
        loader,
        setcarId,
        showLoader,
        addcar,
        setAddcar,
        editcar,
        setEditcar,
        car,
        getData,
        editFormik,
        formik,
        isLoading,
        setConfirmDelete,
        confirmDelete,
        carId,
        viewCar,
        setViewCar
    } = useCar()

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
            {addcar && <AddCar
                setAddcar={setAddcar}
                formik={formik}
                isLoading={isLoading}
            />}
            {viewCar && <ViewCar
                setViewCar={setViewCar}
                cars={car}
                carId={carId}
            />}
            {editcar && <UpdateCar
                setEditcar={setEditcar}
                formik={editFormik}
                isLoading={isLoading}
            />}
            {confirmDelete && <ConfirmDelete
                onDelete={onDelete}
                isLoading={isLoading}
                setConfirmDelete={setConfirmDelete}
            />}
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
                                <h1 className="mb-0">Cars</h1>
                                <Box>
                                    <CommonButton text='Add Car' onSubmit={() => { setAddcar(true) }} isLoading={false} />
                                </Box>
                            </CardHeader>
                            <DataTable
                                data={car}
                                sortItem={() => { handleSort('dateAdded') }}
                                showLoader={showLoader}
                                onDelete={(e, item) => {
                                    e.preventDefault();
                                    setcarId(item._id)
                                    setConfirmDelete(true)
                                }}
                                onView={(e, item) => {
                                    e.preventDefault();
                                    setcarId(item._id)
                                    setViewCar(true)
                                }}
                                onEdit={(e, item) => {
                                    e.preventDefault();
                                    console.log(item)
                                    editFormik.values.name = item.name
                                    editFormik.values.model = item.model
                                    editFormik.values.make = item.make
                                    editFormik.values.year = item.year
                                    editFormik.values.regNo = item.regNo
                                    editFormik.values.category = item.category?._id
                                    editFormik.values.color = item.color
                                    setcarId(item._id)
                                    setEditcar(true);
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
