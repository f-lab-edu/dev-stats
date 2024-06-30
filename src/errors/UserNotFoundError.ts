export class UserNotFoundError extends Error {
  username: string;

  constructor(username: string) {
    super(`User ${username} not found`);
    this.name = "UserNotFoundError";
    this.username = username;
  }
}
