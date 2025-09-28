import { IService } from "./models";

export interface ISwerveServiceClient {
  install(request: SwerveInstallRequest): Promise<SwerveInstallResponse>;
  run(request: SwerveRunRequest): Promise<SwerveRunResponse>;
  stop(request: SwerveStopRequest): Promise<SwerveStopResponse>;
  getAllWebServices(
    request: SwerveGetAllWebServicesRequest,
  ): Promise<SwerveGetAllWebServicesResponse>;
}

export interface SwerveClientProps {
  serviceUrl?: string;
}

export class SwerveServiceClient implements ISwerveServiceClient {
  serviceUrl: string;
  constructor(props: SwerveClientProps) {
    this.serviceUrl = props.serviceUrl
      ? `${props.serviceUrl}${props.serviceUrl.endsWith("/") ? "" : "/"}`
      : "/";
  }

  async install(request: SwerveInstallRequest): Promise<SwerveInstallResponse> {
    const { packageName } = request;
    if (!packageName || packageName.length < 1) {
      // TODO: show alert
      this.handleError("Package name must be defined to install web service");
      return {};
    }

    if (!this.isValidPackageName(packageName)) {
      this.handleError(`Invalid package name`);
      // TODO: show alert
      return {};
    }

    const name = packageName;

    try {
      console.log(`Installing webservice ${packageName}`);
      let response = await fetch(
        `${this.serviceUrl}${this.serviceUrl.endsWith("/") ? "" : "/"}webservice/install?serviceName=${packageName}`,
      );
      if (response.status !== 200) {
        throw new Error(`Error installing web service`);
      }
      console.log(`Successful install of webservice ${packageName}`);
    } catch (e) {
      console.log(`Error installing web service`, e);
      this.handleError(`Error installing web service`);
    }
    return {};
  }

  handleError(message: string) {
    // TODO: implement alert
    console.error(message);
    throw new Error(message);
  }

  isValidPackageName(name: string) {
    // TODO: implement
    return true;
  }

  async run(request: SwerveRunRequest): Promise<SwerveRunResponse> {
    const { port, logLevel, services } = request;

    if (!port || !logLevel || !services) {
      this.handleError(`Invalid run request`);
      throw new Error(`Invalid run request`);
    }
    try {
      const response = await fetch(
        `${this.serviceUrl}${this.serviceUrl.endsWith("/") ? "" : "/"}webservice/run`,
        {
          method: "post",
          body: JSON.stringify({
            serviceConfig: {
              port,
              logLevel,
              services,
            },
          }),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      return await response.json();
    } catch (e) {
      this.handleError(`Error occurred fetching run endpoint with ${e}`);
      throw new Error(`Exception occurred running web service ${e}`);
    }
  }

  async stop(request: SwerveStopRequest): Promise<SwerveStopResponse> {
    const { instanceId, instanceType } = request;

    if (!instanceId || !instanceType) {
      this.handleError(`Invalid stop request`);
      return {};
    }
    try {
      const response = await fetch(
        `${this.serviceUrl}${this.serviceUrl.endsWith("/") ? "" : "/"}webservice/stop?instanceId=${instanceId}&instanceType=${instanceType}`,
      );
      return await response.json();
    } catch (e) {
      this.handleError(`Error occurred fetching stop endpoint with ${e}`);
    }
    return {};
  }

  async getAllWebServices(
    request: SwerveGetAllWebServicesRequest,
  ): Promise<SwerveGetAllWebServicesResponse> {
    const response = await fetch(`${this.serviceUrl}webservice/all`);

    return await response.json();
  }
}

export interface SwerveInstallRequest {
  packageName: string;
}
export interface SwerveInstallResponse {}
export interface SwerveRunRequest {
  port: string;
  services: string;
  logLevel: string;
}
export interface SwerveRunResponse {
  instances: { [instanceId: string]: IService };
}
export interface SwerveStopRequest {
  instanceId: string;
  instanceType: string;
}
export interface SwerveStopResponse {}

export interface SwerveGetAllWebServicesRequest {}

export interface SwerveGetAllWebServicesResponse {
  webServices: {
    [instanceId: string]: {
      webService: any;
      serviceConfig: any;
    };
  };
}
