import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    #broker = new quantum.EventBroker();

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        quantum.load(currentValue).then(options => this.load(options));
    }

    load(options) {
        const state = { options, broker: this.#broker };
        for (const [slot, elements] of this.slottedElements) {
            for (const element of elements) {
                element.plugin?.(state);
            }
        }

        this.onload?.();
    }
}

quantum.define('quantum-engine', Engine);