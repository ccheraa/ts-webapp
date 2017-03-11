export type DialogButtonDef = {
  id?: string,
  text?: string,
  icon?: string,
  mini?: boolean;
};
export type DialogDef = {
  title?: string,
  message?: string;
  buttons?: (string | DialogButtonDef)[];
  modal?: boolean;
};
export class DialogButtonClass {
  constructor(text: string);
  constructor(id: string, text: string);
  constructor(id: string, text: string, icon: string);
  constructor(id: string, text: string, icon: string, mini: boolean);
  constructor(private id: string, private text?: string, private icon = '', private mini = false) {
    if (!this.text) {
      this.text = this.id;
      this.id = this.id.toLowerCase();
    }
  }
}
export class DialogClass {
  buttons: DialogButtonClass[];
  constructor(message: string);
  constructor(title: string, message: string);
  constructor(title: string, message: string, buttons: (string | DialogButtonDef)[]);
  constructor(private title: string, private message?: string, buttons: (string | DialogButtonDef)[] = ['ok']) {
    if (!this.message) {
      this.message = this.title;
      this.title = null;
    }
    this.buttons = <DialogButtonClass[]>buttons.map(button => (typeof button === 'string') ? new DialogButtonClass(button) : button);
  }
}
