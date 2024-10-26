import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Toastbar = ({
  isToastVisible,
  setIsToastVisible,
  message,
}: any) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = () => {
    setIsAnimating(true); // Start animation on close
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      setIsToastVisible(!isToastVisible); // Hide the toast after the animation duration
    }, 300);
  };

  return (
    <div
      id="toast-default"
      className={`absolute right-6 top-4 mt-2 flex w-full max-w-xs items-center self-center rounded-lg bg-everyone_bg p-4 text-everyone shadow transition-opacity duration-300 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}
      role="alert"
    >
      <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-discord_button dark:bg-discord_button dark:text-blue-200">
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        {/* <span className="sr-only">Fire icon</span> */}
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-everyone_bg p-1.5 hover:bg-everyone hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
        aria-label="Close"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        onClick={handleClose} // Close handler
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};
