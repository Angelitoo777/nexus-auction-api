export interface TokenDto {
  id: string;
  username: string;
  email: string;
  rol: string;
}

export interface AuthenticatedRequest extends Request {
  user: TokenDto;
}
