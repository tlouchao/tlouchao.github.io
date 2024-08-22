declare global {
    interface HTMLElementEventMap {
        [ModalEventType.OPEN] : ModalEvent;
        [ModalEventType.CLOSE] : ModalEvent;
    }
}

export class ModalEvent extends Event {
    src: string;
    label: string;
    constructor(eventType: string, src?: string, label?: string) {
        super(eventType);
        this.src = src ?? "";
        this.label = label ?? "";
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