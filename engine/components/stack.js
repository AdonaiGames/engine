import { Component } from '../extensions/component.js';
import { define, template } from '../utilities/elements.js';

export default class StackComponent extends Component {
    constructor() {
        super();
    }
}

define('stack', StackComponent);