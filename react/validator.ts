import { IService } from "./models";

export interface RequestValidatorProps {}

export interface IRequestValidator<ARGS> {
  /**
   * throws on invalid input.
   */
  validate(args: ARGS): void;
}

export class SwerveRequestValidator
  implements IRequestValidator<SwerveRequestValidatorArgs>
{
  constructor(props: RequestValidatorProps) {}

  validate(args: SwerveRequestValidatorArgs) {
    for (const entry of Object.entries(args)) {
      if (!this[entry[0]]) {
        continue;
        //        throw new Error(`Invalid property could not be validated ${entry[0]}`);
      }
      this[entry[0]](entry[1]);
    }
  }

  protected port(port: number) {
    if (typeof port !== "number") {
      throw new Error(`Port must be defined`);
    }

    if (port < 1) {
      throw new Error(`Invalid port value must be > 0`);
    }

    if (port > 65_535) {
      throw new Error(`Port must be less that 65535`);
    }
  }

  protected logLevel(logLevel: string) {
    if (!LOG_LEVELS.includes(logLevel)) {
      throw new Error(`Invalid log level specified ${logLevel}`);
    }
  }

  protected service(service: IService) {
    if (!service) {
      throw new Error(`Service cannot be undefined`);
    }

    if (!service.packageName) {
    }
  }

  protected services(services: { [serviceName: string]: IService }) {
    for (const service of Object.entries(services)) {
      if (!service[0]) {
        throw new Error(`Invalid service name`);
      }
      this.service(service[1]);
    }
  }

  protected packageName(packageName: string) {}
}

const LOG_LEVELS = ["info", "debug", "warn", "error"];

export type SwerveRequestValidatorArgs =
  | Port
  | LogLevel
  | Service
  | Services
  | PackageName;

export interface Port {
  port: number;
}

export interface LogLevel {
  logLeve: string;
}

export interface Service {
  service: IService;
}

export interface Services {
  services: { [serviceName: string]: IService };
}

export interface PackageName {
  packageName: string;
}
