import React, { useState } from "react";

export interface InstallServiceProps {}

export function InstallServiceComponent(props: InstallServiceProps) {
  const [packageName, setPackageName] = useState("");
  const handleChange = (event) => {
    setPackageName(event.target.value);
  };
  function installWebService() {
    console.log(`installWebService in InstallComponent Not implemented`);
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
      <button onClick={installWebService}>Install</button>
    </div>
  );
}
