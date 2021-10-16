import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentsRequest {
  user_sender : string;
  user_receiver : string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({user_sender, user_receiver, tag_id, message}: IComplimentsRequest){
    const complimentRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if(!userReceiverExists){
      throw new Error("User Receiver does not exist");
    }

    const compliment = complimentRepositories.create({
      user_sender,
      user_receiver,
      tag_id,
      message
    })


    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService }
