import { IAuth } from '../Auth';

export interface IAuthMethodTokenMetadata {
  'io.flipt.auth.token.name': string;
  'io.flipt.auth.token.description': string;
}

export interface IAuthToken extends IAuth {
  metadata: IAuthMethodTokenMetadata;
}

export interface IAuthTokenList {
  authentications: IAuthToken[];
}

export interface IAuthTokenBase {
  name: string;
  description: string;
  expiresAt?: string;
}

export interface IAuthTokenSecret {
  clientToken: string;
  authentication: IAuthToken;
}
