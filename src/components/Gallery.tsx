import React from 'react';
import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { UserPhoto } from '../hooks/usePhotoGallery';

interface GalleryProps {
    savedPhotos: UserPhoto[];
}

const Gallery: React.FC<GalleryProps> = ({ savedPhotos }) => {
    return (
        <IonGrid>
            <IonRow>
                {savedPhotos.map((photo, index) => (
                    <IonCol size="6" key={index}>
                        <IonImg src={photo.webviewPath || ''} />
                    </IonCol>
                ))}
            </IonRow>
        </IonGrid>
    );
};

export default Gallery;
