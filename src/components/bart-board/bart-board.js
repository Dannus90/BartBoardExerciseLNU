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
      cursor: pointer;
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

      this._intervalId = null
      this._letter = 0
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
      if(name === "text") {
        return this._text = newValue
      }

      if(name === "speed") {
        return this._speed = newValue
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener("mousedown", this._onWrite)
      this.addEventListener("mouseup", this.stopWriting)
      this.addEventListener("mouseleave", this.stopWriting)
      this.addEventListener("dblclick", this.clear)
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.removeEventListener("mousedown",this._onWrite)
      this.removeEventListener("mouseup", this.stopWriting)
      this.removeEventListener("mouseleave", this.stopWriting)
      this.removeEventListener("dblclick", this.clear)
      this.stopWriting()
    }

    /**
     * Stops the writing.
     *
     */
    stopWriting () {
      clearTimeout(this._intervalId)

      return this
    }

    /**
     * Wipes the board clean and resets the letter counter.
     */
    clear () {
      this._textElement.textContent = ''
      this._letter = 0

      return this
    }
    _onWrite (event) {
      this._intervalId = setInterval(() => {
        if(this._textElement.offsetHeight >= this.offsetHeight) {
          this.dispatchEvent(new window.CustomEvent('filled'))
          this.stopWriting()
          return
        }
        
        this._textElement.textContent += this._text.charAt(this._letter++)
        if(this._letter >= this._text.length) {
          this._textElement.textContent += ' '
          this._letter = 0
        }
      }, this._speed)
    }
  }
)
