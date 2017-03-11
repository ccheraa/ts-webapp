"use strict";
var MenuItemClass = (function () {
    function MenuItemClass(id, text, icon, active) {
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
    return MenuItemClass;
}());
exports.MenuItemClass = MenuItemClass;
//# sourceMappingURL=menu-item.class.js.map