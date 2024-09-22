import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/react';
import Placeholder from '../assets/placeholder.png';

interface Photo {
    uri: string;
    tags?: string;
}

interface GalleryProps {
    savedPhotos: Photo[];
}

const Gallery: React.FC<GalleryProps> = ({ savedPhotos }) => {
    return (
        <div>
            {savedPhotos.length === 0 ? (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>No Photos Found</IonCardTitle>
                        <IonCardSubtitle>Please take some photos</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonImg src={Placeholder} alt="Placeholder" />
                    </IonCardContent>
                </IonCard>
            ) : (
                <div>
                    {savedPhotos.map((photo, index) => (
                        <IonCard key={index}>
                            <IonImg src={photo.uri} alt={`Captured ${index}`} />
                            <IonCardContent>
                                <p>Tags: {photo.tags}</p>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
