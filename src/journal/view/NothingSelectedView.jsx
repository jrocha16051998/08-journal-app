import { StarOutline} from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'

export const NothingSelectedView = () => {
    return (
        <Grid 
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 2}}
            className=' animate__animated animate__fadeIn animate__faster'
        >
            <Grid item xs={12}>
                <StarOutline sx={{ fontSize:100, color: 'black'}}/>
            </Grid>
            <Grid item>
                <Typography color='white' variant='h5'> Selecciona o crea una nota </Typography>
            </Grid>

        </Grid>
    )
}
