import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function Default({ item, onEdit, onDelete,onView }) {
    return (
        <Box style={{
            minWidth: '1080px',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(0,0,0,0.5)',
            padding: '10px 0px',
            alignItems: 'center'
        }}>
            <Box style={{ width: '33%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Typography>{`${item.name?.substring(0, 30)}${item.name?.length > 30 ? '...' : ''}`}</Typography>
            </Box>
            <Box style={{ width: '33%' }}>
                <Typography>{item.created_at?.substring(0, 10)}</Typography>
            </Box>
            <Box style={{ width: '33%', display: 'flex', justifyContent: 'flex-end' }}>
                {onView && <Tooltip title="View" style={{ color: 'black', align: 'right', cursor: 'pointer', zIndex: '1111111' }}>
                    <IconButton style={{ color: 'blue' }} onClick={(e) => {
                        onView(e, item)
                    }}><VisibilityIcon /></IconButton>
                </Tooltip>}
                {onEdit && <Tooltip title="Edit" style={{ color: 'black', align: 'right', cursor: 'pointer', zIndex: '1111111' }}>
                    <IconButton style={{ color: 'blue' }} onClick={(e) => {
                        onEdit(e, item)
                    }}><EditIcon /></IconButton>
                </Tooltip>}
                {onDelete && <Tooltip title="Delete" style={{ color: 'black', align: 'right', cursor: 'pointer', zIndex: '1111111' }}>
                    <IconButton style={{ color: 'red' }} onClick={(e) => {
                        onDelete(e, item)
                    }}><DeleteIcon /></IconButton>
                </Tooltip>}
            </Box>
        </Box>
    )
}
