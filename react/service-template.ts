export interface ServiceConfiguration {
  port: number;
  logLevel: string;
  services: IServices;
}

export interface IService {
  port: number;
  packageName: string;
  path: string;
  logLevel: string;
  [key: string]: any;
}

export type IServices = { [serviceName: string]: IService };

export const ExampleServiceConfiguration: ServiceConfiguration = {
  port: 3005,
  logLevel: "info",
  services: {
    ExampleService: {
      port: 3005,
      packageName: "@swizzyweb/swizzy-frontend-template-web-service",
      logLevel: "info",
      path: "/",
    },
  },
};
