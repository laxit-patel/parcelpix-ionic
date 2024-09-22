import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { camera as cameraIcon } from 'ionicons/icons';
import Camera from '../components/Camera';
import Gallery from '../components/Gallery';

const Home: React.FC = () => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [savedPhotos, setSavedPhotos] = useState<{ uri: string; tags?: string }[]>([]);

  const handleCameraOpen = () => {
    setShowCamera(true);
  };

  const handlePhotoSaved = (newPhoto: { uri: string; tags?: string }) => {
    setSavedPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
    setShowCamera(false);
  };

  useEffect(() => {
    // Automatically open the camera when the app launches
    setShowCamera(true);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>ParcelPix</h1>
        <Gallery savedPhotos={savedPhotos} />

        {savedPhotos.length === 0 && !showCamera && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>No Photos Found</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <img src="path/to/your/placeholder-image.png" alt="Placeholder" style={{ width: '100%', height: 'auto' }} />
            </IonCardContent>
          </IonCard>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleCameraOpen}>
            <IonIcon icon={cameraIcon} />
          </IonFabButton>
        </IonFab>

        {showCamera && (
          <Camera
            setSavedPhotos={handlePhotoSaved}
            savedPhotos={savedPhotos}
            closeCamera={() => setShowCamera(false)}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
