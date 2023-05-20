export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const EntrieFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Name muss angegeben werden'),
];
