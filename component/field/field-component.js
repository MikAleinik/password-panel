export default function FieldComponent() {
    const element = document.createElement('div');
    const input = document.createElement('input');

    /**
     * @returns {HTMLDivElement}
     */
    this.createField = function () {
        return element;
    };
    /**
     * @returns {string}
     */
    this.getValue = function () {};
}
