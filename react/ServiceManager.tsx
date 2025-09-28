import React from "react";
import { InstallServiceComponent } from "./InstallServiceComponent";
import { IService, Panel } from "./models";
import { ServiceList } from "./ServicesList";
import { AddServiceComponent } from "./AddService";
import { NewServiceComponent } from "./NewServiceComponent";
import {
  ISwerveServiceClient,
  SwerveServiceClient,
} from "./swerve-service-client";
import { IMessenger } from "./messenger";
export interface ServiceManagerProps {
  services: IService[];
  setServices: (service: IService[]) => void;
  addService: (service: IService) => void;
  addServices: (services: IService[]) => void;
  removeService: (service: IService) => void;
  panelToShow: Panel;
  swerveServiceClient: ISwerveServiceClient;
  getWebServices: () => void;
  alertMessenger: IMessenger;
}

export function ServiceManager(props: ServiceManagerProps) {
  const {
    addService,
    addServices,
    removeService,
    services,
    getWebServices,
    swerveServiceClient,
    panelToShow,
    alertMessenger,
  } = props;
  return (
    <div>
      {false && <button onClick={getWebServices}>Get Web Services</button>}
      {panelToShow === Panel.services && (
        <div>
          <ServiceList
            removeService={removeService}
            services={services}
            swerveServiceClient={swerveServiceClient}
            alertMessenger={alertMessenger}
          ></ServiceList>
        </div>
      )}
      {panelToShow === Panel.addService && (
        <div>
          <NewServiceComponent
            swerveServiceClient={swerveServiceClient}
            addNewService={addService}
            addNewServices={addServices}
            alertMessenger={alertMessenger}
          ></NewServiceComponent>
        </div>
      )}{" "}
      {panelToShow === Panel.install && (
        <div>
          <InstallServiceComponent></InstallServiceComponent>
        </div>
      )}
    </div>
  );
}
