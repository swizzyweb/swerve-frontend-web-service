import React, { useState } from "react";

export interface AddServiceProps {}

export function AddServiceComponent(props: AddServiceProps) {
  const [packageName, setPackageName] = useState("");

  function installWebService() {}
  return (
    <div>
      <div>
        <label>PackageName</label>
      </div>
      <div>
        <input value={packageName} type="text" placeholder="Package name" />
      </div>
      <button>Install</button>
    </div>
  );
}
