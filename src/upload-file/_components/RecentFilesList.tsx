/**
 * RecentFilesList Component
 *
 * This component displays a list of recently uploaded files with their filename, upload time,
 * and provides an option to view the report for each file. It utilizes the `formatDate` function
 * to format the upload time and includes an icon next to each file name.
 *
 * Props:
 * - `files`: An array of files to display, each containing an `id`, `filename`, and `uploadtime`.
 *
 * Note:
 * - The `formatDate` function is used to format the `uploadtime` for each file.
 * - The link "View Report" currently does not navigate anywhere; it should be updated to point to the correct URL or route.
 */

import { PaperClipIcon } from "@heroicons/react/16/solid";
import { formatDate } from "@/lib/utils.ts";
import { FileUploaderProps } from "@/upload-file";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

const RecentFilesList = ({ files }: { files: FileUploaderProps[] | null }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full space-y-4">
      <dl className="text-md/6 font-medium text-gray-900">5 recently upload</dl>
      <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        <ul
          role="list"
          className="divide-y divide-gray-100 rounded-md border border-gray-200"
        >
          {files?.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-4 pr-5 pl-4 text-sm/6"
            >
              <div className="flex w-0 flex-1 items-center">
                <PaperClipIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-gray-400"
                />
                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                  <span className="truncate font-medium">{item.filename}</span>
                  <span className="shrink-0 text-gray-400">
                    {formatDate(item.uploadtime)}
                  </span>
                </div>
              </div>
              <div className="ml-4 shrink-0">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => navigate(`/report/flow-through/${item.id}`)}
                >
                  View Report
                </Button>
                {/* <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View Report
                </a> */}
              </div>
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
};

export default RecentFilesList;
