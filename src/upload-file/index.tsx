// UploadFile Component
// This component provides functionality for file uploading and displays recently uploaded files.
// - It uses the `FileUploader` component for uploading files.
// - The `RecentFilesList` component is used to display a list of the most recent files that have been uploaded.
// - It fetches the list of recent files from the API using the `useHttp` custom hook.
// - The loading state is handled to show a loading message while fetching the recent files.
// - To modify, you can change the API endpoint in the `recentlyList` function to fetch different data or add additional features like error handling or file filtering.


import FileUploader from "@/upload-file/_components/FileUploader.tsx";
import { useEffect } from "react";
import useHttp from "@/lib/use-http.ts";
import RecentFilesList from "@/upload-file/_components/RecentFilesList.tsx";

export interface FileUploaderProps {
  id: string;
  filename: string;
  filetypeId: string;
  uploadtime: Date;
}

const UploadFile = () => {
  const { fetchData, loading, data } = useHttp<any, FileUploaderProps[]>();

  const recentlyList = async () => {
    await fetchData("file/recentlyFiles");
  };

  useEffect(() => {
    recentlyList();
  }, []);
  return (
    <div className="h-full  w-full flex flex-col items-center justify-center">
      <div className="w-3/5 space-y-4">
        <FileUploader />
        {loading ? <div>loading...</div> : <RecentFilesList files={data} />}
      </div>
    </div>
  );
};

export default UploadFile;
