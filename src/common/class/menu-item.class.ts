export class MenuItemClass {
  id: string;
  text: string;
  icon: string;
  mini: boolean;
  active: boolean;
  constructor();
  constructor(text: string);
  constructor(id: string, text: string);
  constructor(id: string, text: string, icon: string);
  constructor(id: string, text: string, icon: string, active: boolean);
  constructor(id?: string, text?: string, icon?: string, active?: boolean) {
    if (id == null) {
      id = 'null';
    }
    if (text == null) {
      text = id;
      id = text.toLowerCase();
    }
    if (icon == null) {
      icon = id;
    }
    this.text = text;
    this.id = id;
    this.icon = icon;
    this.active = !!active;
  }
}
