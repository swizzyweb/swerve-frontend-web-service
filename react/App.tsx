import React, { useState } from "react"; // Keep this as it's the actual library import
import { ServiceManager } from "./ServiceManager";
import { IService, Panel } from "./models";
import { SwerveServiceClient } from "./swerve-service-client";

// Main App component
const App = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [panelToShow, setPanelToShow] = useState(Panel.install);
  const swerveServiceClient = new SwerveServiceClient({});
  function addService(service: IService) {
    setServices([service, ...services]);
  }

  function addServices(newServices: IService[]) {
    setServices([...newServices, ...services]);
  }

  function removeService(service: IService) {
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
  async function getWebServices() {
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
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 shadow-lg rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Swervice</h1>
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
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition duration-300 text-lg font-medium"
                >
                  Deploy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-blue-200 transition duration-300 text-lg font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto p-8 py-12">
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
          ></ServiceManager>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-6 mt-8 rounded-t-xl shadow-inner">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} My Awesome SwizzyWeb Site. All
            rights reserved.
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
