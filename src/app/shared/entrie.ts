import { User } from "./user";
export { User } from "./user";
import { Padlet } from "./padlet";
export { Padlet } from "./padlet";

export class Entrie {

  constructor(public id: number,
              public user_id: User,
              public padlet_id: Padlet,
              public title: string,
              public content: string) {
  }
}
