import React from 'react'
import { ImageListItem, ImageList } from '@mui/material'


export const ImageGallery = ( {image}) => {

    return (
        <ImageList sx={{ width: '100%', height: 500, overflowY:'visible'}} cols={4} rowHeight={200} >
            { image?.map(value => (
                <ImageListItem key={value}>
                    <img
                        src={value}
                        
                        alt={'Imagen de la nota'}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

