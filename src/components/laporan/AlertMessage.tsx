import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertMessageProps {
     type: "error" | "success" | "info";
     message: string;
}

export default function AlertMessage({ type, message }: AlertMessageProps) {
     const styles = {
          error: {
               bg: "bg-red-50",
               border: "border-red-500",
               text: "text-red-700",
               icon: <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 shrink-0" />,
          },
          success: {
               bg: "bg-green-50",
               border: "border-green-500",
               text: "text-green-700",
               icon: <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 shrink-0" />,
          },
          info: {
               bg: "bg-blue-50",
               border: "border-blue-500",
               text: "text-blue-700",
               icon: <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3 shrink-0" />,
          },
     };

     const currentStyle = styles[type];

     return (
          <div className={`${currentStyle.bg} border-l-4 ${currentStyle.border} p-4 rounded-md flex items-start`}>
               {currentStyle.icon}
               <div className={`text-sm ${currentStyle.text}`}>{message}</div>
          </div>
     );
}
