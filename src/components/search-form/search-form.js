class SearchForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `  
    <style>
      form {
        grid-template-columns: 4fr 1fr;
        grid-column-gap: 12px;
        padding-bottom: 18px;
        padding-top: 6px;
        display: grid;
        width: 100%;
      }

      input, button, select  {
        border-radius: 50px;
        padding: 0px 16px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 6px 0px;
        height: 36px;
      }

      select {
        -webkit-appearance: none;
                appearance: none;
        background: #FFFFFF;
      }

      input:focus, button:focus, select:focus {
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
        outline: none;
      }

      button {
        text-transform: uppercase;
        background: #fc461f;
        color: #FFFFFF;
        font-size: 14px;
      }

      button:hover {
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }

      .awesomplete > input { width: calc(100% - 32px); }

      @media screen and (max-width: 600px) {
        form { grid-template-columns: 1fr; }
      }
    </style>

  <form>
    <input type="text" class="form-control" placeholder="Search Term">
    <button type="submit">Search</button>
  </form>
`;

    const searchInput = this.shadowRoot.querySelectorAll('input')[0];

    this.shadowRoot.querySelector('form').addEventListener('submit', (ev) => {
      ev.preventDefault();

      this.dispatchEvent(new CustomEvent('search', {
        detail: {
          searchTerm: searchInput.value
        }
      }));
      return false;
    });
  }
}

customElements.define('search-form', SearchForm);
