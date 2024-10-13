import React from 'react';
import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { UserPhoto } from '../hooks/usePhotoGallery';
import './Gallery.css'; // Import the custom CSS for masonry

interface GalleryProps {
    savedPhotos: UserPhoto[];
}

const Gallery: React.FC<GalleryProps> = ({ savedPhotos }) => {
    return (
        <IonGrid className="masonry-grid"> {/* Apply the masonry grid class */}
            <IonRow className="masonry-row">
                {savedPhotos.map((photo, index) => (
                    <IonCol size="6" key={index} className="masonry-col"> {/* Apply masonry column styling */}
                        <IonImg src={photo.webviewPath || ''} className="masonry-img" /> {/* Apply custom image styling */}
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    );
};

export default Gallery;
