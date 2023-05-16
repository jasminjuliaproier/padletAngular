import {User} from "./user";
export {User} from "./user";
import {Padlet} from "./padlet";
export {Padlet} from "./padlet";

export class Userright {

  constructor(
    public user_id: User,
    public padlet_id:Padlet,
    public read:boolean,
    public edit:boolean,
    public _delete:boolean,

  ) {
  }
}
