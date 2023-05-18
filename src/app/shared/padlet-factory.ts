import {Padlet, User} from "./padlet";

export class PadletFactory {

  static empty() : Padlet{
    return new Padlet(1,'Name von Padlet', true,
      new User(1,'Jasmin', 'Proier', 'test@test.at', 'secret', 'https://i.pinimg.com/originals/ba/d4/5a/bad45a40fa6e153ef8d1599ba875102c.png'));
  }


  static fromObject(rawPadlet: any) : Padlet{
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user_id
    );

  }
}
