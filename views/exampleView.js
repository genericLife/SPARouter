import abstractView from "./abstractView.js";
import { navigateTo } from "../index.js";

export default class extends abstractView {
    constructor(params) 
    {
        super(params);
        this.setTitle("Example 1");
    }

    async getHtml() 
    {
        const htmlString = ` <div>
                                <h1>EXAMPLE PAGE 1</h1>
                                <button id="goToExample2">Go to example 2</button>

                            </div>`;

        return htmlString;
    }

    async runHandlers(document)
    {
        $("#goToExample2").on('click', () => {
            navigateTo("/example2");
        });
    }
}