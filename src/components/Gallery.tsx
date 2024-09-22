import React from 'react';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonImg } from '@ionic/react';

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
                <p>No photos captured yet.</p>
            ) : (
                <IonGrid>
                    <IonRow>
                        {savedPhotos.map((photo, index) => (
                            <IonCol size="6" sizeMd="4" sizeLg="3" key={index}>
                                <IonCard>
                                    <IonImg src={photo.uri} alt={`Captured ${index}`} />
                                    <IonCardContent>
                                        <p>Tags: {photo.tags}</p>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            )}
        </div>
    );
};

export default Gallery;
