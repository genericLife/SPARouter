import abstractView from "./abstractView.js";

export default class extends abstractView {
    constructor(params) 
    {
        super(params);
        this.setTitle("Example 2");
    }

    async getHtml() 
    {
        const htmlString = ` <div>
                                <div class="middle_cs">
                                <h1>EXAMPLE PAGE 2</h1>
                                </div>
                            </div>`;

        return htmlString;
    }

    async runHandlers(document)
    {
        console.log('running handlers');
    }
}