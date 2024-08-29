declare global {
    interface HTMLElementEventMap {
        [ModalEventType.OPEN] : ModalEvent;
        [ModalEventType.CLOSE] : ModalEvent;
    }
}

export class ModalEvent extends Event {
    src: string;
    label: string;
    index: number;
    constructor(eventType: string, src?: string, label?: string, index?: number) {
        super(eventType);
        this.src = src ?? "";
        this.label = label ?? "";
        this.index = index ?? 0;
    }
}

export enum ModalEventType {
    OPEN = "openmodal",
    CLOSE = "closemodal",
}

export enum ToggleEventType {
    ON = "toggleon",
    OFF = "toggleoff",
}

export enum ExpandEventType {
    ENABLE = "enableautoexpand",
    DISABLE = "disableautoexpand",
}
