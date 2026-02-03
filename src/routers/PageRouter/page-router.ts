import {
  IWebRouterProps,
  RequestIdMiddleware,
  RequestLoggerMiddleware,
  StateConverter,
  StateConverterProps,
  SwizzyMiddlewareFunction,
  SwizzyMiddlewareProps,
  SwizzyRequestMiddleware,
  WebRouter,
  SwizzyStatic,
} from "@swizzyweb/swizzy-web-service";
import { SampleFrontendWebServiceState } from "../../web-service.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export interface PageRouterState {}

export interface PageRouterProps
  extends IWebRouterProps<SampleFrontendWebServiceState, PageRouterState> {}
export class PageWebRouter extends WebRouter<
  SampleFrontendWebServiceState,
  PageRouterState
> {
  constructor(props: PageRouterProps) {
    super({
      ...props,
      name: "PageWebRouter",
      path: "",
      stateConverter: PageRouterStateConverter,
      webControllerClasses: [],
      middleware: [
        SwizzyRequestMiddleware,
        RequestIdMiddleware,
        RequestLoggerMiddleware,
        SwizzyStatic({
          staticAssetsPath: path.join(__dirname, "../../../bundle"),
        }),
      ],
    });
  }
}

const PageRouterStateConverter: StateConverter<
  SampleFrontendWebServiceState,
  PageRouterState
> = async function (
  props: StateConverterProps<SampleFrontendWebServiceState>,
): Promise<PageRouterState> {
  return { ...props.state };
};
