import { Service } from "typedi"

@Service()
export class ProjectService {
  async getOne(_id: string) {
    return true
  }
}
