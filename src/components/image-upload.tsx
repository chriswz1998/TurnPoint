// image-upload.tsx
// The ImageUpload component provides functionality for uploading an image to ImageKit.
// It handles the image upload process, displays a loading spinner during the upload, 
// and provides a preview of the uploaded image once successful. It also includes an option
// to remove the uploaded image, triggered by the parent component via the onRemove callback.

import { FC, useRef, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import useHttp from "@/lib/use-http.ts";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import { ArrowPathIcon, PhotoIcon } from "@heroicons/react/24/outline";

// Props expected by the ImageUpload component
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

// Authentication response structure from the backend
interface authProps {
  token: string;
  expire: Date;
  signature: string;
}

// ImageKit public key and URL endpoint
// If you need to switch to a different ImageKit project, update these constants
const publicKey = "public_OU/b/e8OfeNbs4sISfhs20GjvRs=";
const urlEndpoint = "https://ik.imagekit.io/ilwabtrdhx";

export const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const { fetchData } = useHttp();
  const uploadRef = useRef<any>(null); // Reference to trigger hidden file input manually

  const [isUploading, setIsUploading] = useState(false); // Manage upload state

  // Function to authenticate upload requests
  // If backend endpoint changes, update the URL inside fetchData()
  const authenticator = async () => {
    return (await fetchData("image-auth")) as authProps;
  };

  // Called when upload fails
  const onError = (err: any) => {
    setIsUploading(false);
    toast.error("Upload failed");
    console.error(err);
  };

  // Called when upload succeeds
  const onSuccess = (res: any) => {
    setIsUploading(false);
    onChange(res.url); // Pass uploaded image URL back to parent
  };

  // Called when upload starts
  const onUploadStart = () => {
    setIsUploading(true);
  };

  // Trigger the hidden file input manually
  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  return (
    <div className="w-full">
       {/* Display uploaded image if value exists */}
      {value ? (
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
          <div className="absolute top-2 right-2 z-10">
            <Button
              type="button"
              onClick={() => onRemove(value)}
              variant="destructive"
              size="icon"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
          {/* Uploaded image preview */}
          <img
            src={value}
            alt="Uploaded"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        // Show upload box when no image uploaded
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          {/* Upload container - triggers hidden file input on click */}
          <div
            className="flex items-center justify-center mt-2 border-2 border-dashed p-6 rounded-lg cursor-pointer"
            onClick={handleUploadClick}
          >
            <IKUpload
              ref={uploadRef}
              fileName="upload.png"
              onError={onError}
              onSuccess={onSuccess}
              onUploadStart={onUploadStart}
              className="hidden"
            />
            {/* Show loading spinner if uploading */}
            {isUploading ? (
              <div className="flex flex-col items-center justify-center text-gray-500 animate-pulse">
                <ArrowPathIcon className="h-8 w-8 text-indigo-600 animate-spin" />
                <span className="mt-2 text-sm">Uploading...</span>
              </div>
            ) : (
               // Default state before upload
              <div className="flex flex-col items-center justify-center text-indigo-600">
                <PhotoIcon className="h-12 w-12 text-indigo-600" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload a photo
                </span>
              </div>
            )}
          </div>
        </IKContext>
      )}
    </div>
  );
};
