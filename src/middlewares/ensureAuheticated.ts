import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction
){
  const authtoken = request.headers.authorization;

  if(!authtoken){
    return response.status(401).end();
  }

  const [,token] = authtoken.split(" ");
  //console.log(token);

  try {
    const { sub } = verify(token, "bd429f8071406ed9de3d93b7bedd41ac") as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}

