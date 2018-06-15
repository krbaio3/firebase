import { Observable } from 'rxjs';

export interface User {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  contact: string;
  image?: string;
  imageURL?: Observable<string>;
}
