export interface JwtSign {
  accessToken: string;
  refreshToken: string;
  accessExpired: number;
  refreshExpired: number;
}

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
}

export interface Payload {
  userId: number;
  username: string;
  role: string;
}

export interface JwtAccess {
  accessToken: string;
  accessExpired: number;
}
export interface JwtRefresh {
  refreshToken: string;
  refreshExpired: number;
}
