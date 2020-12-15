/**
 * DraggableOption interface is used to define the options for a draggable list component.
 * It can be single selection.
 */
export interface DraggableOption {
    label: string;
    value: string;
    selected?: boolean;
};
