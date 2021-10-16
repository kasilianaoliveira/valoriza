import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository()
class ComplimentsRepositories extends Repository<Compliment> {

}

export { ComplimentsRepositories }
