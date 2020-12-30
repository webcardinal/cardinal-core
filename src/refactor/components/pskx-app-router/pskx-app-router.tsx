import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { MenuItem } from '../../../interfaces/MenuItem';
import { ExtendedHistoryType } from '../../../interfaces/ExtendedHistoryType';
import { promisifyEventEmit } from '../../utils';

@Component({
  tag: 'pskx-app-router'
})
export class PskxAppRouter {

  @Prop() routes?: MenuItem[] = [];

  @Prop() historyType: ExtendedHistoryType;

  @Event({
    eventName: 'needRoutes',
    bubbles: true, cancelable: true, composed: true
  }) getRoutesEvent: EventEmitter;

  @Event({
    eventName: 'getHistoryType',
    bubbles: true, cancelable: true, composed: true
  }) getHistoryTypeEvent: EventEmitter;

  async componentWillLoad() {
    try {
      this.routes = await promisifyEventEmit(this.getRoutesEvent);
      this.historyType = await promisifyEventEmit(this.getHistoryTypeEvent);
    } catch (error) {
      console.error(error);
    }
  }

  private __getRouteProps = (route) => {
    const { path: url, component, componentProps } = route;
    return { url, component, componentProps };
  }

  private __renderRoutes = (routes) => {
    if (!Array.isArray(routes) || routes.length === 0) {
      return null;
    }
    return routes.map(route => {
      if (route.children) {
        return this.__renderRoutes(route.children.items);
      } else {
        return <stencil-route {...this.__getRouteProps(route)}/>;
      }
    })
  }

  render() {
    const routes = this.__renderRoutes(this.routes);

    return (
      <Host>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            { routes }
          </stencil-route-switch>
        </stencil-router>
      </Host>
    );
  }
}
