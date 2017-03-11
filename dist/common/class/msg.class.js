"use strict";
var DialogButtonClass = (function () {
    function DialogButtonClass(id, text, icon, mini) {
        if (icon === void 0) { icon = ''; }
        if (mini === void 0) { mini = false; }
        this.id = id;
        this.text = text;
        this.icon = icon;
        this.mini = mini;
        if (!this.text) {
            this.text = this.id;
            this.id = this.id.toLowerCase();
        }
    }
    return DialogButtonClass;
}());
exports.DialogButtonClass = DialogButtonClass;
var DialogClass = (function () {
    function DialogClass(title, message, buttons) {
        if (buttons === void 0) { buttons = ['ok']; }
        this.title = title;
        this.message = message;
        if (!this.message) {
            this.message = this.title;
            this.title = null;
        }
        this.buttons = buttons.map(function (button) { return (typeof button === 'string') ? new DialogButtonClass(button) : button; });
    }
    return DialogClass;
}());
exports.DialogClass = DialogClass;
//# sourceMappingURL=msg.class.js.map