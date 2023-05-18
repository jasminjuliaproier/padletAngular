import {Padlet, User} from "./padlet";

export class PadletFactory {

  static empty() : Padlet{

    return new Padlet(1,'Name von Padlet', true, 2, []);
  }

  static fromObject(rawPadlet: any) : Padlet{
    return new Padlet(
      rawPadlet.id,
      rawPadlet.name,
      rawPadlet.is_public,
      rawPadlet.user_id,
      rawPadlet.entries
    );
  }
}
