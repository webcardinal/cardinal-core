import fetch from '../utils/fetch';
import defaultConfig from './default/cardinal.config';

const CONFIG_PATH = 'cardinal.json';
const PAGES_PATH = 'pages';

export default class ApplicationController {
  private readonly baseURL: URL;
  private readonly configURL: URL;
  // @ts-ignore
  private isConfigReady: boolean;

  private __getBaseURL() {
    const getBaseElementHref = () => {
      let baseElement = document.querySelector('base');
      if (!baseElement) {
        return null;
      }
      let href = baseElement.getAttribute('href');
      if (!href || href === '/') {
        return null
      }
      if (!href.endsWith('/')) {
        href += '/';
      }
      return href;
    };
    const getWindowLocation = () => {
      if (window && window.location && window.location.origin) {
        return window.location.origin;
      }
    };

    let windowLocation = getWindowLocation();
    let baseHref = getBaseElementHref();

    // always it ends with '/'
    return baseHref ? new URL(baseHref, windowLocation) : new URL(windowLocation);
  }

  private __getResourceURL(resource) {
    if (resource.startsWith('/')) {
      resource = resource.slice(1);
    }
    return new URL(this.baseURL.href + resource);
  }

  private __getConfiguration(callback) {
    const fetchJSON = async(path) => {
      let response = await fetch(path);
      return response.json();
    }

    const loadConfiguration = async() => {
      try {
        return fetchJSON(this.configURL.href);
      } catch (error) {
        return error;
      }
    }

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

    const getTrimmedPath = (path) => {
      if (path.startsWith('/')) {
        path = path.slice(1);
      }
      if (!path.endsWith('/')) {
        path += '/';
      }
      return path;
    }

    let config: {[key: string]: any} = {};

    // baseURL
    config.baseURL = this.baseURL.href;

    // identity
    config.identity = getConfigValue('identity');

    // version
    config.version  = getConfigValue('version');

    // TODO: menu

    // TODO: modals

    // pages pathname
    config.pagesPathname = getTrimmedPath(PAGES_PATH);

    // TODO: pages

    return config;
  }

  constructor(element) {
    this.baseURL = this.__getBaseURL();
    this.configURL = this.__getResourceURL(CONFIG_PATH);
    this.isConfigReady = false;

    this.__getConfiguration((error, config) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('rawConfig', config);

      console.log('config', this.__prepareConfiguration(config));

      this.isConfigReady = true;
    });

    console.log(element);
  }
}
