export interface IService {
  port: number;
  serviceName: string;
  serviceConfig?: any;
  packageName: string;
  instanceId: string;
}
export enum Panel {
  services,
  addService,
  install,
}
