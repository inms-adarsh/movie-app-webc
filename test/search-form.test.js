import {
  html,
  fixture,
  expect,
} from '@open-wc/testing';

import sinon from 'sinon';
import '../src/components/search-form/search-form.js';

let el;
describe('<search-form>', async () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture('<search-form></search-form>');
  });

  it('has a form', async () => {
    //const el = await fixture('<search-form></search-form>');
    const forms = el.shadowRoot.querySelectorAll('form');

    expect(forms.length).to.equal(1);
  });

  it('has a input', async () => {
    //const el = await fixture('<search-form></search-form>');
    const inputs = el.shadowRoot.querySelectorAll('input');

    expect(inputs.length).to.equal(1);
  });

  it('has a search button', async () => {
    //const el = await fixture('<search-form></search-form>');
    const buttons = el.shadowRoot.querySelectorAll('button');
    expect(buttons.length).to.equal(1);
  });

  it('should submit form ', async () => {
    //const el = await fixture('<search-form></search-form>');
    const form = el.shadowRoot.querySelector('form');
    const formSubmitSpy = sinon.spy(form, 'addEventListener');
    el.setUpSearch();
    expect(formSubmitSpy.calledWith('submit')).to.equal(true);

  });

  it('should dispatch event', () => {   
    el.addEventListener('search', () => {});
    const formSubmitSpy = sinon.spy(el, 'addEventListener');
    el.dispatchSearchEvent();
    expect(formSubmitSpy.calledWith('search')).to.equal(true);
  })
});
