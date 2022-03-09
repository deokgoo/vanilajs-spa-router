import Page from './page.js';

const Account = Object.create(Page);

Account.init = function() {
  this.setUp();
  this.innerHTML = `this page is Account`;
  
  this.render();
}

export default Account;
