import React, { useState } from "react";
import { IService } from "./models";
import { ISwerveServiceClient } from "./swerve-service-client";

export interface ServiceListProps {
  services: IService[];
  swerveServiceClient: ISwerveServiceClient;
  removeService: (service: IService) => void;
}

export function ServiceList(props: ServiceListProps) {
  const { services, swerveServiceClient, removeService } = props;

  const [serviceConfigText, setServiceConfigText] = useState("");
  const [instanceIds, setInstanceIds] = useState(new Set<string>());
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentService, setCurrentService] = useState();

  function onServiceConfigTextChange(event) {
    if (event.target.value !== serviceConfigText) {
      setServiceConfigText(event.target.value);
    }
  }
  function saveServiceConfiguration() {
    //    validate
    if (!currentService) {
      console.error(`No current service set to save configuration`);
      return;
    }
    currentService.serviceConfig = JSON.parse(serviceConfigText);
  }

  function cancelEditServiceConfiguration() {
    setShowDropdown(false);
    setServiceConfigText("");
  }
  function editService(service: IService) {
    if (showDropdown && service == currentService) {
      setShowDropdown(false);
      return;
    }
    setServiceConfigText(JSON.stringify(service.serviceConfig, null, 2));
    setCurrentService(service);
    setShowDropdown(true);
  }
  async function stopService(service: IService) {
    const instanceId = service.instanceId;
    try {
      const response = await swerveServiceClient.stop({
        instanceId,
        instanceType: "webservice",
      });
    } catch (e) {
      console.error(
        `Error occurred while stopping web service from service list ${e}`,
      );
      return;
    }
    removeService(service);
  }
  return (
    <div>
      <h2>Services</h2>
      {services.map((service) => {
        return (
          <div key={service.instanceId}>
            <div>
              <div>{service.serviceName}</div> <div>{service.packageName}</div>
              <div>{service.instanceId}</div> <div>{service.port}</div>
              <div>
                <button className="danger" onClick={() => stopService(service)}>
                  Stop Service
                </button>
              </div>
              <div>
                {(!showDropdown ||
                  currentService.instanceId !== service.instanceId) && (
                  <button onClick={() => editService(service)}>
                    Show Config
                  </button>
                )}

                {showDropdown &&
                  service.instanceId == currentService?.instanceId && (
                    <button onClick={() => editService(service)}>Hide</button>
                  )}
              </div>
            </div>
            {showDropdown &&
              currentService?.instanceId == service.instanceId && (
                <div className="service-drop-down">
                  <textarea
                    value={JSON.stringify(
                      service.serviceConfig ?? service,
                      null,
                      2,
                    )}
                    className="service-args"
                    readOnly
                    //                    onChange={onServiceConfigTextChange}
                  ></textarea>
                  {false && (
                    <>
                      <button onClick={saveServiceConfiguration}>save</button>
                      <button onClick={cancelEditServiceConfiguration}>
                        cancel
                      </button>
                    </>
                  )}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
}
