import { User } from "./user";
export { User } from "./user";
import {Entrie} from "./entrie";
export { Entrie } from "./entrie";
export class Rating {

  constructor(public user_id: number,
              public entrie: Entrie,
              public user: User,
              public rating: number

  ) {
  }
}
