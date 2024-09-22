import React, { useState } from 'react';
import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera as cameraIcon } from 'ionicons/icons';
import Camera from '../components/Camera';
import Gallery from '../components/Gallery';

const Home: React.FC = () => {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [savedPhotos, setSavedPhotos] = useState<{ uri: string; tags: string }[]>([]);

  const handleCameraOpen = () => {
    setShowCamera(true); // Show camera when FAB is clicked
  };

  const handlePhotoSaved = (newPhoto: { uri: string; tags: string }) => {
    setSavedPhotos((prevPhotos) => [...prevPhotos, newPhoto]); // Add the new photo to the savedPhotos array
    setShowCamera(false); // Close camera after saving
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
            setSavedPhotos={handlePhotoSaved} // Pass the correct function to setSavedPhotos
            savedPhotos={savedPhotos}
            closeCamera={() => setShowCamera(false)} // Close camera without saving
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
