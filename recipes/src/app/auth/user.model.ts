export class User {

  constructor(
    public id: string,
    public email: string,
    private authToken: string,
    private authTokenExpirationDate: Date) {
  }

  get token(): string {
    if (!this.authTokenExpirationDate || this.authTokenExpirationDate <= new Date()) {
      return null;
    } else {
      return this.authToken;
    }
  }
}
