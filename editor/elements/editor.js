import { define, shadow } from '../imports.js';
import { editor } from '../templates/editor.js';
import { clone } from '../utilities/elements.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        shadow(this).appendChild(clone(editor));
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }
}

define('editor', Editor); 