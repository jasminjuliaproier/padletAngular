import {Comment} from "./comment";
import {User} from "./user";
import {Entrie} from "./entrie";

export class CommentFactory {

  static empty() : Comment{
    return new Comment(1, new User(1,"Lisa", "Müller", "lisa@mueller.at", "secret", "url"),
      new Entrie(1,1,1,"Title","Content"),"Beispieltext für Kommentar");
  }


  static fromObject(rawComment: any) : Comment{
    return new Comment(
      rawComment.id,
      rawComment.user_id,
      rawComment.entrie_id,
      rawComment.comment
    );

  }
}
