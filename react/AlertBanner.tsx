import React, { useState } from "react";

export interface AlertBannerProps {
  message: string;
  label: string;
  destroy: () => void;
}

export function AlertBanner(props: AlertBannerProps) {
  const { message, label, destroy } = props;
  const [active, setActive] = useState(true);
  function hide() {
    setActive(false);
  }
  return (
    <div className="alert-section">
      <label onClick={destroy}>
        {" "}
        <svg
          class="w-5 h-5 text-blue-500 shrink-0"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4a2 2 0 00-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </label>

      <span>{message}</span>
    </div>
  );
}

export type ShowMessage = (message: string) => Promise<void>;
