
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import '../App.css'

import {  FormControlLabel } from '@mui/material';

const Element = ({ valor, onChange, section, erase  }) => {

    return (
        <>
            {section === 'active' && !valor.state ? (
                <Box sx={{ justifyContent: 'left', display: 'flex' }}>
                    <FormControlLabel sx={{ ml: 1 }}
                        control={<input type="checkbox" onChange={onChange} checked={valor.state} />}
                        label={`${valor.value}`} />
                </Box>)
                : section === 'completed' && valor.state ? (
                    <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                        <FormControlLabel sx={{ ml: 1 }}
                            control={<input type="checkbox" onChange={onChange} checked={valor.state} />}
                            label={ <p style={{ textDecoration: 'line-through' }} >{valor.value}</p> } />
                        
                    <DeleteIcon onClick={erase} sx={{cursor: 'pointer'}} />
                    </Box>
                )
                    : section === 'all' &&  (
                        <Box sx={{ justifyContent: 'left', display: 'flex' }}>
                            <FormControlLabel sx={{ ml: 1 }}
                                control={<input type="checkbox" onChange={onChange} checked={valor.state} />}
                                label={`${valor.value}`} />
                        </Box>
                    )
            }
        </>
    )
}
export default Element