// -------------------------- Data Attributes ----------------------------- //

const getDataAttr = function(elem: HTMLElement | null, attrName : string) : boolean {
    return elem?.dataset[attrName] != undefined;
}

const setDataAttr = function(elem: HTMLElement | null, attrName : string, attrVal : boolean) : void {
    if (elem) {
        if (attrVal) {
            elem.dataset[attrName] = '';
        } else {
            delete elem.dataset[attrName];
        }
    }
}

// -------------------------- Bool Attributes ----------------------------- //

const setBoolAttr = function(elem: HTMLElement | null, attrName: string, attrVal : boolean) : void {
    elem?.setAttribute(attrName, Boolean(attrVal).toString());
}

// ---------------------- Capitalize Button Label ------------------------- //

export const getLabel = function(href: string | undefined) : string {
    let ret = href?.split('/').pop();
    ret = (ret == undefined) ? '' : ret;
    ret = ret.charAt(0).toUpperCase() + ret.slice(1);
    return ret;
}

// ------------------------------- Export --------------------------------- //

export default { getDataAttr, setDataAttr, setBoolAttr };