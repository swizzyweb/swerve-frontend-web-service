import React, { useState } from "react";
import { IService } from "./models";
import { ISwerveServiceClient } from "./swerve-service-client";
import { InputElement } from "./InputElement";
import { SwerveRequestValidator } from "./validator";
import {
  ExampleServiceConfiguration,
  ServiceConfiguration,
} from "./service-template";

export interface NewServiceComponentProps {
  addNewService: (service: IService) => void;
  addNewServices: (service: IService[]) => void;
  swerveServiceClient: ISwerveServiceClient;
}

const DEFAULT_PORT = 3005;

export function NewServiceComponent(props: NewServiceComponentProps) {
  const { addNewServices, swerveServiceClient, addNewService } = props;
  const requestValidator = new SwerveRequestValidator({});
  const [port, setPort] = useState(DEFAULT_PORT);
  const [serviceName, setServiceName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [configuration, setConfiguration] = useState(
    JSON.stringify(ExampleServiceConfiguration, null, 2),
  );
  function save() {
    //valid input
    console.error(`Save not implemented`);
  }

  async function installFromConfig() {
    const config: ServiceConfiguration = JSON.parse(configuration);
    requestValidator.validate(configuration);

    const packageNames = new Set(
      Object.values(config.services).map((service, index) => {
        return service.packageName;
      }),
    );

    const installedPackages: string[] = [];
    const failedPackages: string[] = [];
    for (const name of packageNames.values()) {
      try {
        const response = await installPackage(name);
        installedPackages.push(name);
      } catch (e) {
        console.log(`Failed to install package ${name}`);
        failedPackages.push(name);
      }
    }
    if (failedPackages.length == 0) {
      console.log(
        `Installed packages successfully: [${installedPackages.join(", ")}]`,
      );
    } else {
      console.error(
        `Failed to install packages [${failedPackages.join(", ")}] and successfully installed packages [${installedPackages.join(", ")}]`,
      );
    }
  }

  async function installPackage(name) {
    requestValidator.validate({ packageName: name });
    await swerveServiceClient.install({
      packageName: name,
    });
  }

  async function install() {
    await installPackage(packageName);
  }

  async function deploy() {
    const serviceConfiguration = JSON.parse(configuration);

    const request = serviceConfiguration; /*{
      port,
      logLevel: "info", // TODO: implement
      services: serviceConfiguration,
    };*/
    requestValidator.validate(request);
    const response = await swerveServiceClient.run(request);
    const newServices: IService[] = [];
    for (const instanceEntry of Object.entries(response.instances)) {
      const nextInstance: IService = {
        ...instanceEntry[1],
        serviceName,
        serviceConfig: serviceConfiguration,
        instanceId: instanceEntry[0],
      };
      newServices.push(nextInstance);
    }

    addNewServices(newServices);
  }

  return (
    <div className="new-service-component">
      <h2>Add Web Service</h2>
      {false && (
        <>
          <InputElement
            labelText="Port"
            inputPlaceholder="Port"
            inputType="number"
            value={port}
            setValue={setPort}
          ></InputElement>
          <InputElement
            labelText="Package Name"
            inputPlaceholder="Package Name"
            inputType="text"
            value={packageName}
            setValue={setPackageName}
          ></InputElement>
          <InputElement
            labelText="Service Name"
            inputPlaceholder="Service Name"
            inputType="text"
            value={serviceName}
            setValue={setServiceName}
          ></InputElement>
        </>
      )}
      <InputElement
        labelText="Service Configuration"
        inputPlaceholder="Service Configuration"
        inputType="textarea"
        value={configuration}
        setValue={setConfiguration}
        className="service-args"
      ></InputElement>
      <button className="outline m-2" onClick={save}>
        Save
      </button>
      <button className="primary m-2" onClick={installFromConfig}>
        Install
      </button>
      <button className="danger m-2" onClick={deploy}>
        Deploy
      </button>
    </div>
  );
}
