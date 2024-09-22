import React, { useState } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
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

  return (
    <IonPage>
      <IonContent fullscreen>
        <Gallery savedPhotos={savedPhotos} />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleCameraOpen}>
            <IonIcon icon={cameraIcon} />
          </IonFabButton>
        </IonFab>

        {showCamera && (
          <Camera
            setSavedPhotos={handlePhotoSaved} // Ensure this matches the signature
            savedPhotos={savedPhotos}
            closeCamera={() => setShowCamera(false)}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
