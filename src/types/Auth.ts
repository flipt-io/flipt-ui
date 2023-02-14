export interface IAuthMethod {
  method: 'METHOD_TOKEN' | 'METHOD_OIDC';
  enabled: boolean;
  sessionCompatible: boolean;
  metadata: { [key: string]: any };
}

export interface IAuthentication {
  id: string;
  method: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthMethodOIDCMetadataProvider {
  authorize_url: string;
  callback_url: string;
}

export interface IAuthMethodOIDC extends IAuthMethod {
  method: 'METHOD_OIDC';
  metadata: {
    providers: Record<string, AuthMethodOIDCMetadataProvider>;
  };
}

export interface IAuthMethodOIDCMetadata {
  'io.flipt.auth.oidc.email'?: string;
  'io.flipt.auth.oidc.email_verified'?: string;
  'io.flipt.auth.oidc.name'?: string;
  'io.flipt.auth.oidc.picture'?: string;
  'io.flipt.auth.oidc.provider': string;
}

export interface IAuthenticationOIDC extends IAuthentication {
  metadata: IAuthMethodOIDCMetadata;
}

export interface IAuthMethodTokenMetadata {
  'io.flipt.auth.token.name': string;
  'io.flipt.auth.token.description': string;
}

export interface IAuthenticationToken extends IAuthentication {
  metadata: IAuthMethodTokenMetadata;
}

export interface IAuthenticationTokenList {
  authentications: IAuthenticationToken[];
}

export interface ITokenBase {
  name: string;
  description: string;
  expiresAt?: string;
}

export interface IToken {
  clientToken: string;
  authentication: IAuthenticationToken;
}
