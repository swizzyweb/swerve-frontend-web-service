import React, { useState } from "react";
import { IService } from "./models";

export interface StopButtonProps {
  service: IService;
  stopService(service: IService): void;
}

export function StopButton(props: StopButtonProps) {
  const { stopService, service } = props;

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  function showConfirmation() {
    setConfirmationVisible(true);
  }

  function hideConfirmation() {
    setConfirmationVisible(false);
  }

  return (
    <div className="inline-block stop-service-buttons">
      {!confirmationVisible && (
        <div>
          <button className="danger" onClick={showConfirmation}>
            Stop Service
          </button>
        </div>
      )}
      {confirmationVisible && (
        <div>
          <button className="outline" onClick={hideConfirmation}>
            Cancel Stop Service
          </button>
          <button className="danger" onClick={() => stopService(service)}>
            Confirm Stop Service
          </button>
        </div>
      )}
    </div>
  );
}
