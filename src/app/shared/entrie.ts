import {User} from "./user";

export {User} from "./user";
import {Padlet} from "./padlet";
import {Rating} from "./rating";
import {Comment} from "./comment";

export {Padlet} from "./padlet";

export class Entrie {

  constructor(public id: number,
              public user_id: number,
              public padlet_id: number,
              public title: string,
              public content: string,
              public ratings: Rating[],
              public comments: Comment[]
  ) {
  }
}
