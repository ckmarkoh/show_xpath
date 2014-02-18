function getXPath(node) {
    var comp, comps = [];
    var parent = null;
    var xpath = '';
    var getPos = function(node) {
        var position = 1, curNode;
        if (node.nodeType == Node.ATTRIBUTE_NODE) {
            return null;
        }
        for (curNode = node.previousSibling; curNode; curNode = curNode.previousSibling) {
            if (curNode.nodeName == node.nodeName) {
                ++position;
            }
        }
        return position;
     }

    if (node instanceof Document) {
        return '/';
    }
    for (; node && !(node instanceof Document);
             node = node.nodeType == Node.ATTRIBUTE_NODE ? node.ownerElement : node.parentNode) {
        comp = comps[comps.length] = {};
        comp.classname = "";
        comp.idname = "";
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                comp.name = 'text()';
                break;
            case Node.ATTRIBUTE_NODE:
                comp.name = '@' + node.nodeName.toLowerCase();
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                comp.name = 'processing-instruction()';
                break;
            case Node.COMMENT_NODE:
                comp.name = 'comment()';
                break;
            case Node.ELEMENT_NODE:
                comp.name = node.nodeName.toLowerCase();
                comp.classname = node.className;
                comp.idname = node.id;
                break;
        }
        comp.position = getPos(node);
    }
    for (var i = comps.length - 1; i >= 0; i--) {
        comp = comps[i];
        xpath += '/' + comp.name;
        if (comp.position != null) {
            if(comp.idname!=""){
                xpath += '[@id=\'' + comp.idname + '\']';
            }
            else if(comp.classname!=""){
                xpath += '[@class=\'' + comp.classname+ '\']';
            }
            else{
                xpath += '[' + comp.position + ']';
            }
        }
    }
    return xpath;
}

  // Handler for .ready() called.

$( document ).ready(function( ) {
    $("*").mousedown(function(e){ 
        if( e.button == 2 ) { 
            var xpath=getXPath(this);
            console.log(xpath);
            //copy(xpath);
            //$x(xpath);
            //copy(xpath);
            //if (window.clipboardData && clipboardData.setData) {
             //   clipboardData.setData("Text",xpath);
             //   console.log("Copied!");
            //}
          return false; 
        } 
        return true; 
    }); 
});

