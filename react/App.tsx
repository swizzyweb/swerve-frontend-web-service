import React, { useState, useEffect } from "react"; // Keep this as it's the actual library import
import { ServiceManager } from "./ServiceManager";
import { IService, Panel } from "./models";
import { SwerveServiceClient } from "./swerve-service-client";
import { AlertBanner, AlertBannerProps } from "./AlertBanner";
import { AlertMessenger, IMessenger } from "./messenger";

// Main App component
const App = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [panelToShow, setPanelToShow] = useState(Panel.services);
  let [alertActive, setAlertActive] = useState(false);
  let [alertMessage, setAlertMessage] = useState("");
  let [alertStyle, setAlertStyle] = useState("info");
  const alertMessenger: IMessenger = new AlertMessenger(
    setAlertStyle,
    setAlertMessage,
    setAlertActive,
  );
  const swerveServiceClient = new SwerveServiceClient({});
  function addService(service: IService) {
    setServices([service, ...services]);
  }

  function addServices(newServices: IService[]) {
    console.log(JSON.stringify(newServices));
    setServices([...newServices, ...services]);
  }

  function removeService(service: IService) {
    getWebServices();
    return;
    const newServices: IService[] = [];
    for (let i = 0; i < services.length; i++) {
      const nextService = services[i];
      if (service.instanceId === nextService.instanceId) {
        continue;
      }
      newServices.push(service);
    }

    setServices(newServices);
  }
  /*
  async function showWarn(message: string) {
    await setAlertStyle("warn");
    await setAlertMessage(message);
    await setAlertActive(true);
  }

  async function showError(message: string) {
    await setAlertStyle("error");
    await setAlertMessage(message);
    await setAlertActive(true);
  }

  async function showInfo(message: string) {
    await setAlertStyle("info");
    await setAlertMessage(message);

    await setAlertActive(true);
  }

  async function hideError() {
    await setAlertActive(false);
  }
*/
  async function getWebServices() {
    try {
      const { webServices } = await swerveServiceClient.getAllWebServices({});

      const services: any[] = Object.entries(webServices).map((svc) => {
        return {
          instanceId: svc[0],

          ...svc[1].webService,
          serviceConfig: svc[1].serviceConfig,
        };
      });
      setServices(services);
      console.log(`webservices: ${webServices}`);
      //      alertMessenger.showSuccess(`Got web services`);
    } catch (e: unknown) {
      console.error(`Error getting web services`, e);
      await alertMessenger.showError("Error getting web services");
    }
  }

  useEffect(() => {
    return async () => {
      await getWebServices();
      return;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-lg rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex align-baseline">
            <img
              className="header-logo flex-1 content-center"
              src="/img/swerveS.png"
            ></img>
            <h1 className="text-4xl font-extrabold tracking-tight flex-1 content-center">
              Swerve Web Service
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition duration-300 text-lg font-medium"
                  onClick={() => {
                    getWebServices();
                    setPanelToShow(Panel.services);
                  }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition duration-300 text-lg font-medium"
                  onClick={() => setPanelToShow(Panel.addService)}
                >
                  Add Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto p-8 py-12">
        <section className={alertStyle}>
          {alertActive && (
            <AlertBanner
              message={alertMessage}
              label={"Error"}
              destroy={() => {
                setAlertActive(false);
              }}
            ></AlertBanner>
          )}
        </section>
        <section className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4"></h2>
          <ServiceManager
            services={services}
            panelToShow={panelToShow}
            swerveServiceClient={swerveServiceClient}
            addService={addService}
            addServices={addServices}
            setServices={setServices}
            removeService={removeService}
            getWebServices={getWebServices}
            alertMessenger={alertMessenger}
          ></ServiceManager>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-6 mt-8 rounded-t-xl shadow-inner">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} SwizzyWeb. All rights reserved.
          </p>
          <p className="text-gray-400 mt-2">
            Made with{" "}
            <span className="font-semibold text-white">@swizzyweb</span>
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
