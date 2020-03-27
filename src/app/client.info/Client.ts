export class Client {
  public id?: string;
  public name: string;
  public email: string;
  public password: string;
  public phones: string[];

  constructor(name: string, email: string,
              password: string, phones: string[]) {
    this.name = name;
    this.email = email;
    this.phones = phones;
    this.password = password;
  }

  setId(value: string) {
    this.id = value;
  }
}
