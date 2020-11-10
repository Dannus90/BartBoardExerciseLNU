/**
 * The bart-board web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Daniel Persson <dp222jd@lnu.se>
 * @version 2.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      background:#002418;
      font-size: 1.2em;
      color:white;
      width:500px;
      height:200px;
      padding:10px;
      border:6px solid #9b3b00;
      border-bottom:12px solid #9b3b00;
      overflow:hidden;
      margin:10px;
      float:left;
      border-radius: 3px;
    }
    p {
      margin: 0;
      padding: 0;
    }
  </style>

  <p part="text"></p>
`

/**
 * Define custom element.
 */
customElements.define('bart-board',
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the p-element in which we add the text.
      this._textElement = this.shadowRoot.querySelector('p')

      this._speed = 50
      this._text = 'I will never ever skip the line in the task queue again.'
    }

    /**
     * Watches the attributes "text" and "speed" for changes on the element.
     *
     */
    static get observedAttributes () {
      return ["text", "speed"]
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      // TODO: Add your code for handling updates and creation of the observed attributes.
      name === "text" ? this._text = newValue : name === "speed" ? this._speed = newValue : ""
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // TODO: Add your eventlisteners for mousedown, mouseup here. You also need to add mouseleave to stop writing
      //       when the mouse pointer leavs the bart board. This should stop the printing.
      this.addEventListener("mousedown", () => {

      })

      this.addEventListener("mouseup", this.stopWriting())

      this.addEventListener("mouseleave", this.stopWriting())
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      // TODO: Remove your eventlisterners here.
    }

    /**
     * Stops the writing.
     *
     */
    stopWriting () {
      // TODO: Implement the method
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      // TODO: Implement the method
    }
    // TODO: Add methods at will. The solution file will use the aditional: "_onWrite"
  }
)
