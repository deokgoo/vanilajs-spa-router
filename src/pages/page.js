const Page = {
  innerHTML: '',
  setUp() {
    this.app = document.querySelector('.app');
  },
  render() {
    this.app.innerHTML = this.innerHTML;
  }
}

export default Page;
