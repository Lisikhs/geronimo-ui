export class AppConfig {
  static readonly API_PORT: number = 8080;
  static readonly API_URL: string = `http://localhost:${AppConfig.API_PORT}`;

  static readonly TOKEN_KEY = 'token';
  static readonly EXPIRES_AT_KEY = 'token_expires_at';

  static readonly AUTH_SCHEME = 'Bearer';
}
