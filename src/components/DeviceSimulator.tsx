import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { cn } from '../lib/utils';

export function DeviceSimulator({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className={cn("fixed inset-0 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500", isMobile ? "bg-gray-200 py-8" : "bg-white")}>
      <div 
        className={cn(
          "bg-white transition-all duration-300 ease-in-out relative flex flex-col overflow-hidden",
          isMobile 
            ? "w-[390px] h-[844px] max-h-[calc(100vh-4rem)] rounded-[2.5rem] shadow-2xl border-[12px] border-gray-800"
            : "w-full h-full"
        )}
      >
        {children}
      </div>
      
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-orange-600 text-white rounded-full shadow-xl hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        title={isMobile ? "Switch to Desktop View" : "Switch to Mobile View"}
      >
        {isMobile ? <Monitor className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
      </button>
    </div>
  );
}
