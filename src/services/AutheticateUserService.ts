import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    const usersReposiories = getCustomRepository(UserRepositories);

    const user = await usersReposiories.findOne({email});

    if(!user){
      throw new Error("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorrect");
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
