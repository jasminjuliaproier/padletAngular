export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const PadletFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Ein Name muss angegeben werden'),
];
