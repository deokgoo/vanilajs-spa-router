import Home from '../pages/home.js';

const routes = {
  '/': Home,
  '/account': () => import('../pages/account.js'),
  '/account/:accountId': () => import('../pages/account.js'),
  'default': Home,
}

const router = () => {
  const getMatchRoutePath = (pathName) => {
    let matchPath = 'default';
    const uriArr = pathName.split('/');
    const sameLengthPaths = Object.keys(routes).filter(x => x.split('/').length === uriArr.length);

    for(let i=0;i<sameLengthPaths.length;i++) {
      const a = sameLengthPaths[i].split('/');

      for(let j=0;j<uriArr.length;j++) {
        if(a[j].startsWith(':')) {
          if(j === uriArr.length-1) {
            matchPath = a.join('/');
          }
          continue;
        }
        if(a[j] !== uriArr[j]) {
          break;
        }
        if(j === uriArr.length-1) {
          matchPath = a.join('/');
        }
      }
    }

    return matchPath;
  }

  const setState = ({pathName, routePath}) => {
    const states = {};
    const pathNameSlice = pathName.split('/');

    routePath.split('/').forEach((x, idx) => {
      if(x.startsWith(':')) {
        states[x.slice(1)] = pathNameSlice[idx];
      }
    });

    // component에서 state를 사용하고 싶으면 window.history.state로 참조 할 수 있다.
    window.history.pushState(states, "", window.location.href);
  }

  const getComponent = (pathName) => {
    const matchRoutePath = getMatchRoutePath(pathName);
    setState({
      pathName,
      routePath: matchRoutePath,
    });

    return routes[matchRoutePath];
  }

  const renderComponent = async (component) => {
    // use dynamic component
    if(typeof component === 'function') {
      const dynamic = await component();
      dynamic.default.init();
      return;
    }
    // use loaded component 
    component.init();
  }

  renderComponent(getComponent(window.location.pathname));
  window.onpopstate = () => renderComponent(getComponent(window.location.pathname));
}

export default router;
