import { User } from "./user";
export { User } from "./user";
import {Entrie} from "./entrie";
export { Entrie } from "./entrie";
export class Rating {

  constructor(public user_id: User,
              public entrie_id: Entrie,
              public rating: number) {
  }
}
