export interface IService {
  port: number;
  name: string;
  serviceConfig?: any;
  packageName: string;
  instanceId: string;
}
export enum Panel {
  services,
  addService,
  install,
}
