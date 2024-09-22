import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import Camera from '../components/Camera';

const Home: React.FC = () => {
  const [savedPhotos, setSavedPhotos] = useState<{ uri: string; tags: string }[]>([]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Camera setSavedPhotos={setSavedPhotos} savedPhotos={savedPhotos} />
        
        {/* Gallery Section */}
        {savedPhotos.length > 0 && (
          <div>
            <h2>Saved Photos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {savedPhotos.map((photo, index) => (
                <div key={index} style={{ margin: '10px' }}>
                  <img
                    src={photo.uri}
                    alt={`Captured ${index}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                  <p>Tags: {photo.tags}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
