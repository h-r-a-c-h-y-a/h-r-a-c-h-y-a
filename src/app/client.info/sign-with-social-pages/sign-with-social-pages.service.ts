import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../Client';

@Injectable()
export class SignWithSocialPagesService {

  client: Client;
  constructor(private http: HttpClient) {
  }

  isValidData(client: Client): boolean {
    return (
      (client.name !== null || client.name !== '') &&
      (client.email !== null || client.email !== '') &&
      (client.phones[0] !== null)
    );
  }
}
