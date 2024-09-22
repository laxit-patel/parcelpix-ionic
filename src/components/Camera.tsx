import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonInput, IonImg, IonAlert } from '@ionic/react';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';

interface CameraProps {
    setSavedPhotos: (newPhoto: { uri: string; tags?: string }) => void; // Make tags optional
    savedPhotos: { uri: string; tags?: string }[];
    closeCamera: () => void;
}

const Camera: React.FC<CameraProps> = ({ setSavedPhotos, closeCamera }) => {
    const [imageUri, setImageUri] = useState<string | undefined>();
    const [tags, setTags] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    useEffect(() => {
        const takePicture = async () => {
            try {
                const image = await CapacitorCamera.getPhoto({
                    resultType: CameraResultType.Uri,
                    source: CameraSource.Camera,
                    quality: 90,
                });
                setImageUri(image.webPath);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        };

        takePicture();
    }, []);

    const handleSave = () => {
        if (imageUri) {
            const newPhoto = { uri: imageUri, tags: tags || undefined }; // Use tags if provided
            setSavedPhotos(newPhoto);
            setImageUri(undefined);
            setTags('');
            setAlertMessage('Photo saved successfully!');
            setShowAlert(true);
            closeCamera();
        } else {
            setAlertMessage('No image captured. Please retake the photo.');
            setShowAlert(true);
        }
    };

    const handleRetake = () => {
        setImageUri(undefined);
        setTags('');
    };

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Camera</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {imageUri ? (
                    <>
                        <IonImg src={imageUri} alt="Captured" />
                        <IonInput
                            value={tags}
                            placeholder="Enter tags (optional)"
                            onIonChange={(e) => setTags(e.detail.value!)}
                        />
                        <IonButton expand="full" onClick={handleSave}>Save Photo</IonButton>
                        <IonButton expand="full" onClick={handleRetake} color="light">Retake Photo</IonButton>
                    </>
                ) : (
                    <p>No image captured yet.</p>
                )}
            </IonCardContent>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={'Notification'}
                message={alertMessage}
                buttons={['OK']}
            />
        </IonCard>
    );
};

export default Camera;
