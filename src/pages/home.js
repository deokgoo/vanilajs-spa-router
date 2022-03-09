import Page from './page.js';

const Home = Object.create(Page);

Home.init = function() {
  this.setUp();
  this.innerHTML = `this page is Home`;
  
  this.render();
}

export default Home;
