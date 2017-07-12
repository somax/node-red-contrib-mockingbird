
module.exports = function(RED) {
    "use strict";
    var dummyjson = require('dummy-json');

    function MockingbirdNode(n) {
        RED.nodes.createNode(this,n);
        this.field = n.field || "payload";
        this.template = n.template;
        this.fieldType = n.fieldType || "msg";
        this.optionField = n.optionField || "DGOption";
        this.optionFieldType = n.optionFieldType || "flow";
        this.syntax = n.syntax || "text";
        var node = this;
        node.on("input", function(msg) {
            if (msg.seed) { dummyjson.seed = msg.seed; }

            var option = {}
            try {

                if (node.optionFieldType === 'msg') {
                    option = msg[node.optionField];
                } else if (node.optionFieldType === 'flow') {
                    option = node.context().flow.get(node.optionField);
                } else if (node.optionFieldType === 'global') {
                    option = node.context().global.get(node.optionField);
                }

                if(typeof option === 'function'){
                    option = option(dummyjson.utils);
                }
                option.helpers = option.helpers || {}
                option.helpers.randomItem = function(...items){
                    items.splice(-1);
                    return dummyjson.utils.randomArrayItem(items);
                }


                var value = dummyjson.parse(node.template, option);
                if (node.syntax === "json") {
                    try { value = JSON.parse(value); }
                    catch(e) { node.error(RED._("mockingbird.errors.json-error")); }
                }
                if (node.fieldType === 'msg') {
                    RED.util.setMessageProperty(msg,node.field,value);
                } else if (node.fieldType === 'flow') {
                    node.context().flow.set(node.field,value);
                } else if (node.fieldType === 'global') {
                    node.context().global.set(node.field,value);
                }
                node.send(msg);
            } catch(err) {
                node.error(err.message);
            }
        });
    }
    RED.nodes.registerType("mockingbird",MockingbirdNode);
    RED.library.register("mockingbird");
}
