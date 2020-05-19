import { template } from '../utilities/elements.js';

export const editorTemplate = template(`
<style>
    #editor { 
        display: grid;
        grid-template-rows: min-content auto min-content;
        grid-template-columns: 50% 50%;
        overflow: hidden;
        height: 100%;
    }

    #editor * {
        user-select: none;
    }

    #engine {
        padding: 0 15px;
    }

    #viewport {
        box-shadow: 0px 0px 1px 1px var(--primary-highlight-color);
        justify-self: center;
        align-self: center;
        resize: both;
        overflow: hidden;
        max-width: calc(100% - 30px);
    }

    #menu {
        background: linear-gradient(var(--secondary-background-color), var(--primary-background-color));
    }
    
    #vitals {
        background: linear-gradient(var(--primary-background-color), var(--secondary-background-color));
    }

    #objects {
        grid-column: 1;
    }

    #properties {
        grid-column: 2;
        direction: rtl;
        justify-self: end;
    }

    #properties:after {
        direction: ltr;
    }

    #selection {
        position: absolute;
        border: 1px dashed var(--primary-highlight-color); 
        z-index: 2;
    }

    .control {
        display: flex;
        justify-content: space-between;
        grid-column-start: span 2;
        padding: 0 5px;
    }

    .view {
        grid-row: 2;
        grid-column: 1 / 3;
    }

    .panel {
        background-color: var(--secondary-background-color);
        white-space: nowrap;
        resize: horizontal;
        position: relative;
        max-width: 100%;
        overflow: auto;
        grid-row: 2;
        z-index: 1;
    }

    .selected {
        background-color: var(--primary-highlight-color);
    }

    input {
        background-color: var(--secondary-background-color);
        font-family: inherit;
        font-size: inherit;
        border: none;
    }
</style>
<div id="editor">
    <div id="menu" class="control">
        <span>
            <span class="icon">&#128190;</span>
            <span class="icon">&#128193;</span>
            <span class="icon">&#128194;</span>
        </span>
        <span>
            <span class="icon">&#9654;</span>
            <span class="icon">&#10074;&#10074;</span>
            <span class="icon">&#9209;</span>
        </span>
        <span>
            <span class="icon">&#10021;</span>
            <span class="icon">&#128472;</span>
            <span class="icon">&#9878;</span>
        </span>
    </div>
    <div id="engine" class="view"><slot></slot></div>
    <div id="viewport" class="view"></div>  
    <div id="objects" class="panel"></div>
    <div id="properties" class="panel"></div>
    <div id="vitals" class="control">
        <span>&#10004;&#9876;&#9874;&#128736;&#9935;&#128296;&#128295;</span>
    </div> 
</div>
`);