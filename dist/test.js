"use strict";
var tools_1 = require("./src/tools");
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
console.log(tools_1.Tools.template(template, {
    name: "Krasimir Tsonev",
    profile: { age: 29 }
}));
//# sourceMappingURL=test.js.map