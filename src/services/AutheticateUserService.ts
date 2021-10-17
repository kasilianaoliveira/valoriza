import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    const usersReposiories = getCustomRepository(UsersRepositories);

    const user = await usersReposiories.findOne({email});

    if(!user){
      throw new Error("Email or Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email or Password incorrect");
    }

    const token = sign(
      {
      email: user.email,
      }, "bd429f8071406ed9de3d93b7bedd41ac",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export {AuthenticateUserService}
