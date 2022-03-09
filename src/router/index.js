import Home from '../pages/home.js';

const route = (e) => {
  e = event || window.event;
  e.preventDefault();
  window.history.pushState({}, "", e.target.href);
  handleLocation();
}

const routes = {
  '/': Home,
  '/account': () => import('../pages/account.js'),
  '/account/:accountId': () => import('../pages/account.js'),
  'default': Home,
}

const router = () => {
  const setComponent = (path) => {
    const componentPaths = Object.keys(routes);
    const historyState = history.state;
    const filteredPaths = componentPaths.filter(x => {
      if(x === path) {
        return true;
      } else {
        const originPath = path.split('/');
        const travelPath = x.split('/');

        if(originPath.length !== travelPath.length) {
          return false;
        }

        for(let i=0;i<originPath.length;i++) {
          if(travelPath[i].startsWith(':')) {
            console.log(travelPath[i]);
            continue;
          }
          if(travelPath[i] !== originPath[i]) {
            return false;
          }
        }

        return true;
      }
    });

    if(!filteredPaths.length) {
      return routes['/'];
    }

    return routes[filteredPaths[0]];
  }

  const renderHTML = async (component) => {
    if(typeof component === 'function') {
      const dynamic = await component();
      dynamic.default.init();
      return;
    }
    component.init();
  }

  renderHTML(setComponent(window.location.pathname));
  console.log('renderHTML');
  window.onpopstate = () => renderHTML(setComponent(window.location.pathname));
  window.route = route;
}

export default router;
