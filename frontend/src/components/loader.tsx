import { Loader2 } from "lucide-react";

export const Loader = () => {
  return (
    <div className="grid place-items-center p-3">
      <Loader2 className="h-7 w-7 animate-spin" />
    </div>
  );
};
