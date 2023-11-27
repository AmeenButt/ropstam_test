import { Box, IconButton, Button, Typography } from "@mui/material";
import DataTableItem from '../dataTableItem'
import HeightIcon from '@mui/icons-material/Height';
import Loader from '../loader'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from "react";
export default function Default({ onEdit, onDelete,onView, data, showLoader, sortItem }) {
    const [paginatedData, setPaginatedData] = useState(data.slice(0, 10));
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 10;

    // Function to load more data
    const loadMoreData = () => {
        const endIndex = Math.min(startIndex + itemsPerPage * 2, data.length);
        console.log(startIndex)
        setPaginatedData(data.slice(startIndex + itemsPerPage, endIndex));
        setStartIndex(startIndex + itemsPerPage);
    };

    // Function to load previous data
    const loadPreviousData = () => {
        const newStartIndex = Math.max(startIndex - itemsPerPage, 0);
        setPaginatedData(data.slice(newStartIndex, startIndex));
        setStartIndex(newStartIndex);
    };
    useEffect(() => {
        setPaginatedData(data.slice(0, 10))
    }, [data])
    
    return (
        <>
            {paginatedData?.length > 0 ? <Box sx={{ overflow: 'auto' }}>
                <Box style={{
                    minWidth: '1080px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box style={{ width: '33%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '18px' }}>Name</Typography>
                    </Box>
                    <Box style={{ width: '33%', }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '18px', alignItems: 'center', display: 'flex' }}>Created at<HeightIcon
                            onClick={() => {
                                setPaginatedData(sortItem('dateAdded', paginatedData))
                            }}
                        /></Typography>
                    </Box>
                    <Box style={{ width: '33%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography sx={{ fontWeight: '600', fontSize: '18px' }}>Actions</Typography>
                    </Box>
                </Box><hr />
                <Box>
                    {showLoader ? paginatedData.map((item, index) => (
                        <DataTableItem
                            key={index}
                            item={item}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onView={onView}
                        />
                    )
                    ) : <Loader />}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    margin: '20px'
                }}>
                    <Button sx={{
                        padding: '10px 0px',
                        backgroundColor: '#06ABEB',
                        borderRadius: '10px',
                        color: 'white',
                        marginLeft: '20px',
                        '&: hover': {
                            backgroundColor: '#06ABEB',
                        }
                    }} onClick={loadMoreData} disabled={startIndex + itemsPerPage >= data.length}><KeyboardArrowRightIcon /></Button>
                    <Button sx={{
                        padding: '10px 0px',
                        backgroundColor: '#06ABEB',
                        borderRadius: '10px',
                        color: 'white',
                        '&: hover': {
                            backgroundColor: '#06ABEB',
                        }
                    }} onClick={loadPreviousData} disabled={startIndex === 0}><KeyboardArrowLeftIcon /></Button>

                </Box>
            </Box> : <center><Typography padding='60px 10px'>No item to display</Typography></center>}
        </>
    )
}
