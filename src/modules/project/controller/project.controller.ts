import opentelemetry from "@opentelemetry/api"
import { Authorized, Get, JsonController, Param } from "routing-controllers"
import { Inject, Service } from "typedi"

import { Logger } from "../../../utils/logger/logger.util"
import { ProjectService } from "../service/project.service"

@JsonController()
@Service()
export class ProjectController {
  @Inject()
  projectService: ProjectService

  @Get("/project/:id")
  @Authorized()
  async getProject(@Param("id") id: string) {
    // span is the part of traces
    const span = opentelemetry.trace.getSpan(opentelemetry.context.active())
    span.addEvent("James log here")
    const traceId = span.spanContext().traceId
    Logger.info(traceId)
    return this.projectService.getOne(id)
  }
}
