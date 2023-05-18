import {Rating} from "./rating";
import {User} from "./user";
import {Entrie} from "./entrie";

export class RatingFactory {

  static empty() : Rating{
    return new Rating(new User(1,"Lisa", "Müller", "lisa@mueller.at", "secret", "url"),
      new Entrie(1,1,1,"Title","Content", [], []),4);
  }


  static fromObject(rawRating: any) : Rating{
    return new Rating(
      rawRating.user_id,
      rawRating.entrie_id,
      rawRating.rating
    );

  }
}
