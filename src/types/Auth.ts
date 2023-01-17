export interface AuthMethod {
  method: 'METHOD_TOKEN' | 'METHOD_OIDC';
  enabled: boolean;
  sessionCompatible: boolean;
  metadata: { [key: string]: any };
}

interface AuthMethodOIDCMetadataProvider {
  authorize_url: string;
  callback_url: string;
}

export interface AuthMethodOIDC extends AuthMethod {
  method: 'METHOD_OIDC';
  metadata: {
    providers: Record<string, AuthMethodOIDCMetadataProvider>;
  };
}

export interface AuthMetadata {
  'io.flipt.auth.oidc.email': string;
  'io.flipt.auth.oidc.email_verified': string;
  'io.flipt.auth.oidc.name': string;
  'io.flipt.auth.oidc.picture'?: string;
  'io.flipt.auth.oidc.provider': string;
}

export interface Auth {
  id: string;
  method: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata: AuthMetadata;
}
