// -------------------------- Data Attributes ----------------------------- //

export const getDataAttr = function(elem: HTMLElement | null, attrName : string) : boolean {
    return elem?.dataset[attrName] != undefined;
}

export const setDataAttr = function(elem: HTMLElement | null, attrName : string, attrVal : boolean) : void {
    if (elem) {
        if (attrVal) {
            elem.dataset[attrName] = '';
        } else {
            delete elem.dataset[attrName];
        }
    }
}

// -------------------------- Bool Attributes ----------------------------- //

export const getBoolAttr = function(elem: HTMLElement | null, attrName: string) : boolean {
    return elem?.getAttribute(attrName) == "true";
}

export const setBoolAttr = function(elem: HTMLElement | null, attrName: string, attrVal : boolean) : void {
    elem?.setAttribute(attrName, Boolean(attrVal).toString());
}

// -------------------------- Capitalize Label ---------------------------- //

export const getLabel = function(href: string | undefined) : string {
    
    let ret = href?.split('/').pop();
    ret = ret ?? '';
    ret = ret.charAt(0).toUpperCase() + ret.slice(1);
    
    return ret;
}

// ---------------------- Swap Visible Button Icon ------------------------ //

export const setButtonIcon = function(button: HTMLButtonElement | null,
                                       svg0: SVGSVGElement | null,
                                       svg1: SVGSVGElement | null,
                                       doSwap : boolean) : void {

    // if svg is hidden, remove it from document flow using absolute positioning
    let styleVisible = 'opacity: 1; width: 100%; height: 100%;'
    let styleHidden = 'opacity: 0; width: 0; height: 0;'
    styleHidden = styleHidden + ' position: absolute;'

    if (doSwap) {
        svg0?.setAttribute('style', styleHidden)
        svg1?.setAttribute('style', styleVisible)
    } else {
        svg0?.setAttribute('style', styleVisible)
        svg1?.setAttribute('style', styleHidden)
    }
}