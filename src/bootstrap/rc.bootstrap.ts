import { RoutingControllersOptions } from "routing-controllers"

import { CONSTANT } from "../enum"
import { AuthGuard } from "../guards/auth.guard"
import { ProjectController } from "../modules/project/controller/project.controller"
import { ErrorLogger } from "../utils/middlewares/error.logger"

export const generateRoutingControllerConfig = () => {
  const routingControllersOptions: RoutingControllersOptions = {
    routePrefix: CONSTANT.SERVICE_URL_SUFFIX,
    cors: false,
    validation: false,
    classTransformer: false,
    controllers: [ProjectController],
    middlewares: [ErrorLogger],
    authorizationChecker: AuthGuard,
    development: true
  }

  return routingControllersOptions
}
