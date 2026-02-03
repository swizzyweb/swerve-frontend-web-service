import React, { useState } from "react";
import { IService } from "./models";
import { ISwerveServiceClient } from "./swerve-service-client";
import { IMessenger } from "./messenger";
import { StopButton } from "./StopButton";

export interface ServiceListProps {
  services: IService[];
  swerveServiceClient: ISwerveServiceClient;
  removeService: (service: IService) => void;
  alertMessenger: IMessenger;
}

export function ServiceList(props: ServiceListProps) {
  const { services, swerveServiceClient, removeService, alertMessenger } =
    props;

  const [serviceConfigText, setServiceConfigText] = useState("");
  const [serviceText, setServiceText] = useState("");
  const [instanceIds, setInstanceIds] = useState(new Set<string>());
  const [showServiceConfigDropdown, setShowServiceConfigDropdown] =
    useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
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
    setShowServiceConfigDropdown(false);
    setServiceConfigText("");
  }

  function editService(service: IService) {
    if (showServiceConfigDropdown && service == currentService) {
      setShowServiceConfigDropdown(false);
      return;
    }
    if (showServiceDropdown) {
      hideService();
    }
    setServiceConfigText(JSON.stringify(service.serviceConfig ?? {}, null, 2));
    setCurrentService(service);
    setShowServiceConfigDropdown(true);
  }

  function hideService() {
    setShowServiceDropdown(false);
    setServiceText("");
  }
  function viewService(service: IService) {
    if (showServiceDropdown && service == currentService) {
      setShowServiceDropdown(false);
      return;
    }
    if (showServiceConfigDropdown) {
      editService(service);
    }
    setServiceText(JSON.stringify(service ?? {}, null, 2));
    setCurrentService(service);
    setShowServiceDropdown(true);
  }

  async function stopService(service: IService) {
    const instanceId = service.instanceId;
    try {
      const response = await swerveServiceClient.stop({
        instanceId,
        instanceType: "webservice",
      });
      removeService(service);
      alertMessenger.showSuccess(
        `Stopped service with instanceId: ${instanceId}`,
      );
    } catch (e) {
      console.error(
        `Error occurred while stopping web service from service list ${e}`,
      );
      alertMessenger.showError(
        `Error occurred stopping service with instanceId: ${instanceId}`,
      );
      return;
    }
  }
  return (
    <div>
      <h2>Services</h2>
      {services.map((service) => {
        return (
          <div className="service-list-item" key={service.instanceId}>
            <div>
              <div>
                <label>Service Name: </label>
                <span>{service.name}</span>
              </div>

              <div>
                <label>Package Name: </label>
                <span>{service.packageName}</span>
              </div>

              <div>
                <label>Instance Id: </label>
                <span>{service.instanceId}</span>
              </div>

              <div>
                <label>Port: </label>
                <span>
                  <a
                    href={`http://${window.location.hostname}:${service.port}`}
                    target="_blank"
                  >
                    {service.port}
                  </a>
                </span>
              </div>

              <div className="service-management-buttons">
                {(!showServiceConfigDropdown ||
                  currentService.instanceId !== service.instanceId) && (
                  <button onClick={() => editService(service)}>
                    Show Config
                  </button>
                )}

                {showServiceConfigDropdown &&
                  service.instanceId == currentService?.instanceId && (
                    <button onClick={() => editService(service)}>Hide</button>
                  )}

                {(!showServiceDropdown ||
                  currentService.instanceId !== service.instanceId) && (
                  <button onClick={() => viewService(service)}>
                    Show Service
                  </button>
                )}

                {showServiceDropdown &&
                  service.instanceId == currentService?.instanceId && (
                    <button onClick={() => hideService()}>Hide</button>
                  )}
                <StopButton
                  service={service}
                  stopService={stopService}
                ></StopButton>
              </div>

              {showServiceConfigDropdown &&
                currentService?.instanceId == service.instanceId && (
                  <div className="service-config-drop-down">
                    <textarea
                      value={JSON.stringify(
                        service.serviceConfig ?? {},
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

              {showServiceDropdown &&
                currentService?.instanceId == service.instanceId && (
                  <div className="service-config-drop-down">
                    <textarea
                      value={JSON.stringify(service, null, 2)}
                      className="service-args"
                      readOnly
                      //                    onChange={onServiceConfigTextChange}
                    ></textarea>
                  </div>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
