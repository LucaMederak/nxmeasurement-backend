import { accessTokenTtl, refreshTokenTtl } from '../../../config/config';
import { Request, Response } from 'express';
import { CreateUserInput } from '../schema/user.schema';
import { createUser, getUser, validateEmail } from '../services/user.service';
import { createSession } from '../services/session.service';
import logger from '../utils/logger';
import { signJwt } from '../utils/jwt.utils';

export async function createUserController(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    //check existing user
    const email = req.body.email;

    const existingUserEmail = await validateEmail(email);
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ msg: 'There is already a user with this email address' });
    }

    const user = await createUser(req.body);

    // create a session
    const session = await createSession(user._id, req.get('user-agent') || '');

    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: accessTokenTtl } // 15 minutes
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: refreshTokenTtl } // 15 minutes
    );

    // return user & access & refresh tokens
    return res.send({ user, accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserController(req: Request, res: Response) {
  const userId = res.locals.user._id;
  const user = await getUser({ _id: userId });

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(user);
}
