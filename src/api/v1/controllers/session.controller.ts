import { Request, Response } from 'express';
import { accessTokenTtl, refreshTokenTtl } from '../../../config/config';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionController(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).json({ msg: 'Invalid email address or password' });
  }

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

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsController(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteUserSessionController(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
