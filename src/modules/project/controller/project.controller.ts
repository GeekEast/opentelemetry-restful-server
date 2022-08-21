import { Authorized, Get, JsonController, Param } from "routing-controllers"
import { Inject, Service } from "typedi"

import { ProjectService } from "../service/project.service"

@JsonController()
@Service()
export class ProjectController {
  @Inject()
  projectService: ProjectService

  @Get("/project/:id")
  @Authorized()
  async getProject(@Param("id") id: string) {
    return this.projectService.getOne(id)
  }
}
