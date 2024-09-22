import React, { useEffect, useState } from 'react';
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from '@capacitor/camera';

interface CameraProps {
    setSavedPhotos: React.Dispatch<React.SetStateAction<{ uri: string; tags: string }[]>>;
    savedPhotos: { uri: string; tags: string }[];
}

const Camera: React.FC<CameraProps> = ({ setSavedPhotos, savedPhotos }) => {
    const [imageUri, setImageUri] = useState<string | undefined>();
    const [tags, setTags] = useState<string>('');

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
        if (imageUri && tags) {
            const newPhoto = { uri: imageUri, tags };
            setSavedPhotos([...savedPhotos, newPhoto]);

            // Reset fields after saving
            setTags('');
            setImageUri(undefined);
            alert('Photo saved successfully!');
        } else {
            alert('Please enter tags to save the photo.');
        }
    };

    const handleRetake = () => {
        setImageUri(undefined);
        setTags('');
    };

    return (
        <div>
            <h1>Camera</h1>
            {imageUri ? (
                <div>
                    <img src={imageUri} alt="Captured" />
                    <div>
                        <input
                            type="text"
                            placeholder="Enter tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <button onClick={handleSave}>Save Photo</button>
                        <button onClick={handleRetake}>Retake Photo</button>
                    </div>
                </div>
            ) : (
                <p>No image captured yet.</p>
            )}
        </div>
    );
};

export default Camera;
