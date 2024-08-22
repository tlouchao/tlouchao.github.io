declare global {
    interface HTMLElementEventMap {
        [ModalEventType.OPEN] : ModalEvent;
        [ModalEventType.CLOSE] : ModalEvent;
    }
}

export class ModalEvent extends Event {
    src : string;
    constructor(eventType: string, src?: string) {
        super(eventType);
        this.src = src ?? "";
    }
}

export enum ExpandEventType {
    ENABLE = "enableautoexpand",
    DISABLE = "disableautoexpand",
}

export enum ModalEventType {
    OPEN = "openmodal",
    CLOSE = "closemodal",
}