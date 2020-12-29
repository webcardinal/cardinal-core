import fetch from '../utils/fetch';
// import AppConfigurationHelper from "./AppConfigurationHelper";

// const CONFIG_PATH = 'cardinal.json';
const CONFIG_PATH = 'config.json';
const MENU_PATH = 'menu.json';

export default class ApplicationController {
  private readonly baseURL: URL;
  private readonly configURL: URL;
  private readonly menuURL: URL;

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
        let config = await fetchJSON(this.configURL.href);
        let menu = await fetchJSON(this.menuURL.href);
        return { config, menu };
      } catch (error) {
        return error;
      }
    }

    loadConfiguration()
      .then(data => callback(null, data))
      .catch(error => callback(error))
  }

  // private __prepareConfiguration(rawConfig) {
  //   const getIdentity = () => {
  //     if (rawConfig.identity) {
  //       return rawConfig.identity;
  //     }
  //   }
  //
  //   let config: {[key: string]: any} = {};
  //
  //   // baseURL
  //   config.baseURL = this.baseURL.href;
  //
  //   // TODO: menu
  //
  //   // identity
  //   config.identity = getIdentity()
  //   if (rawConfig.profile) {}
  //
  //   // TODO: modals
  //
  //   return config;
  // }

  constructor(element) {
    this.baseURL   = this.__getBaseURL();
    this.configURL = this.__getResourceURL(CONFIG_PATH);
    this.menuURL   = this.__getResourceURL(MENU_PATH);

    this.__getConfiguration((error, configuration) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(configuration);

      // const t = AppConfigurationHelper._prepareConfiguration(configuration, this.baseURL.href);
      // console.log(t);
      //
      // console.log(this.__prepareConfiguration(configuration));
    });

    console.log(element);
  }
}
