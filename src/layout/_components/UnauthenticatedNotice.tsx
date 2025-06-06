// UnauthenticatedNotice.tsx
// This component displays a warning message when the user is unauthenticated or their session has expired.

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

// UnauthenticatedNotice component
const UnauthenticatedNotice = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg border border-red-200">
        <CardContent className="p-6 space-y-4 text-center">
          {/* Warning icon */}
          <div className="flex justify-center">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>

          {/* Warning message */}
          <h2 className="text-xl font-semibold text-red-600">
            Session Expired or Not Logged In
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 text-sm">
            Your session has expired or you are not authenticated. <br />
            Please login again to continue.
          </p>

          {/* Login button */}
          <Button onClick={() => navigate("/login")} className="w-full">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthenticatedNotice;
