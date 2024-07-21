const getDataAttr = function(elem: HTMLElement | SVGSVGElement, attrName : string) : boolean {
    return elem.dataset[attrName] != undefined;
}

const setDataAttr = function(elem: HTMLElement | SVGSVGElement, attrName : string, attrVal : boolean) : void {
    let dummy = (attrVal) ? elem.dataset[attrName] = '': delete elem.dataset[attrName];
}

const setBoolAttr = function(elem: HTMLElement, attrName: string, attrVal : boolean) : void {
    elem.setAttribute(attrName, Boolean(attrVal).toString());
}

export default { getDataAttr, setDataAttr, setBoolAttr };