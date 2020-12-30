import fetch from '../utils/fetch';
import defaultConfig from './default/cardinal.config';

const CONFIG_PATH = 'cardinal.json';
const PAGES_PATH = 'pages';

const EVENTS = {
  PLACEHOLDER: 'cardinal:config:',
  GET_ROUTING: 'getRouting'
}

export default class ApplicationController {
  private readonly baseURL: URL;
  private readonly configURL: URL;
  private config: {};
  private isConfigLoaded: boolean;
  private pendingRequests: [any?];

  private __trimPathname = (path) => {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  };

  private __getBaseURL() {
    const getBaseElementHref = () => {
      let baseElement = document.querySelector('base');
      if (!baseElement) { return null; }

      let href = baseElement.getAttribute('href');
      if (!href || href === '/') { return null; }

      return this.__trimPathname(href);
    };
    const getWindowLocation = () => {
      return this.__trimPathname(window.location.origin);
    };

    let windowLocation = getWindowLocation();
    let baseHref = getBaseElementHref();

    // always it ends with '/'
    return baseHref ? new URL(baseHref, windowLocation) : new URL(windowLocation);
  }

  private __getResourceURL(resource) {
    return new URL(this.baseURL.href + this.__trimPathname(resource));
  }

  private __getConfiguration(callback) {
    const fetchJSON = async(path) => {
      let response = await fetch(path);
      return response.json();
    };

    const loadConfiguration = async() => {
      try {
        return fetchJSON(this.configURL.href);
      } catch (error) {
        return error;
      }
    };

    loadConfiguration()
      .then(data => callback(null, data))
      .catch(error => callback(error))
  }

  private __prepareConfiguration(rawConfig) {
    const getConfigValue = (key) => {
      if (rawConfig[key]) {
        return rawConfig[key];
      }
      return defaultConfig[key];
    };

    const getRouting = (baseURL, rawPages) => {
      let pages = [];
      for (let rawPage of rawPages) {
        let page: any = {};

        // page name
        if (typeof rawPage.name !== 'string') {
          console.warn(rawPage, `is not a valid page (in "${CONFIG_PATH}")`)
          continue;
        }
        page.name = rawPage.name;
        let target = page.name.replace(/\s+/g, '-').toLowerCase();

        // page index
        if (typeof rawPage.indexed === 'boolean') {
          page.indexed = rawPage.indexed;
        } else {
          page.indexed = true;
        }

        // route path
        if (typeof rawPage.path === 'string') {
          page.path = rawPage.path;
        } else {
          let path = '/' + target;
          try {
            page.path = new URL(path, baseURL).pathname;
          } catch (error) {
            console.error(`"${path}" can not be converted in a pathname for an URL!\n`, error);
            continue;
          }
        }

        // route src
        if (Array.isArray(rawPage.children) && rawPage.children.length > 0) {
          const { pages } = getRouting(baseURL, rawPage.children);
          page.children = pages;
        } else {
          if (typeof rawPage.src === 'string') {
            page.src = rawPage.src;
          } else {
            page.src = target + '.html';
          }
        }

        pages.push(page);
      }
      return { pages };
    };

    let config: any = {};

    // identity
    config.identity = getConfigValue('identity');

    // version
    config.version = getConfigValue('version');

    // routing
    config.routing = {
      baseURL: this.__trimPathname(this.baseURL.href),
      pagesPathname: '/' + this.__trimPathname(PAGES_PATH),
      ...getRouting(
        this.baseURL.href,
        getConfigValue('pages')
      )
    }

    // TODO: modals

    // TODO: theme

    // TODO: and many more...

    return config;
  }

  private __provideConfiguration(key, callback) {
    if (typeof key === 'function' && typeof callback === 'undefined') {
      callback = key;
      key = undefined;
    }

    if (typeof callback !== 'function') {
      return;
    }

    if (typeof key === 'undefined') {
      return callback(undefined, this.config);
    }

    if (!this.config.hasOwnProperty(key)) {
      return callback(`Config "${key}" does not exists!`);
    }

    return callback(undefined, this.config[key]);
  }

  private __registerListener(key) {
    return event => {
      event.preventDefault();
      event.stopImmediatePropagation();

      let { callback } = event.detail;
      if (typeof callback !== 'function') {
        return;
      }

      if (this.isConfigLoaded) {
        return this.__provideConfiguration(key, callback);
      } else {
        this.pendingRequests.push({ configKey: key, callback });
      }
    }
  }

  constructor(element) {
    this.baseURL = this.__getBaseURL();
    this.configURL = this.__getResourceURL(CONFIG_PATH);
    this.config = {};
    this.pendingRequests = [];
    this.isConfigLoaded = false;

    this.__getConfiguration((error, rawConfig) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('rawConfig', rawConfig);

      this.config = this.__prepareConfiguration(rawConfig);
      this.isConfigLoaded = true;

      while (this.pendingRequests.length) {
        let request = this.pendingRequests.pop();
        this.__provideConfiguration(request.configKey, request.callback);
      }

      console.log('config', this.config);
    });

    const {
      PLACEHOLDER: CORE,
      GET_ROUTING
    } = EVENTS;

    element.addEventListener(CORE + GET_ROUTING, this.__registerListener('routing'));

    console.log(element);
  }
}
