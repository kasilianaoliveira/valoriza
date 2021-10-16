
import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AutheticateUserService";

class AuthenticateUserController {
  async handle (request: Request, response: Response) {
    const {email, password} =  request.body;
    const authenticateUserController = new AuthenticateUserService();

    const token = await authenticateUserController.execute({
      email, password
    });

    return response.json(token);
  }
}


export { AuthenticateUserController }
