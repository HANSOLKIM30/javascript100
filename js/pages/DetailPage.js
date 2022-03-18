import { html } from "lit";
import View from "../view";

export default class DeatilPage extends View {

    constructor() {
        super();
    }

    static get properties() {
        return {

        }
    }

    render() {
        return html `
            <h1>상세페이지</h1>
        `;
    }
}