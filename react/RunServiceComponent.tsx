import React, { useState } from "react";
import { IService } from "./models";

export interface RunServiceComponentProps {
  services: IService[];
}

export function RunServiceComponent(props: RunServiceComponentProps) {
  const { services } = props;
  const [packageName, setPackageName] = useState("");

  async function installWebService() {
    if (!packageName || packageName.length < 1) {
      // TODO: show alert
      handleError("Package name must be defined to install web service");
      return;
    }

    if (!isValidPackageName(packageName)) {
      handleError(`Invalid package name`);
      // TODO: show alert
      return;
    }

    const name = packageName;

    try {
      console.log(`Runing webservice ${packageName}`);
      await fetch(`/webservice/install?serviceName=${packageName}`);
      console.log(`Successful install of webservice ${packageName}`);
    } catch (e) {
      handleError(`Error installing web service`);
    }
  }
  const handleChange = (event) => {
    setPackageName(event.target.value);
  };
  function handleError(message: string) {
    // TODO: implement alert
    console.error(message);
  }

  function isValidPackageName(name: string) {
    // TODO: implement
    return true;
  }

  return (
    <div>
      <div>
        <label>PackageName</label>
      </div>
      <div>
        <input
          value={packageName}
          type="text"
          placeholder="Package name"
          onChange={handleChange}
        />
      </div>
      <button onClick={installWebService}>Run</button>
    </div>
  );
}
