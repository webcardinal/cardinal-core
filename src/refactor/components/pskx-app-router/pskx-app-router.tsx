import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { MenuItem } from '../../../interfaces/MenuItem';
import { ExtendedHistoryType } from '../../../interfaces/ExtendedHistoryType';
import { promisifyEvent } from '../../utils';

@Component({
  tag: 'pskx-app-router'
})
export class PskxAppContainer {

  @Prop() menuItems?: MenuItem[] = [];

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
      this.menuItems = await promisifyEvent(this.getRoutesEvent);
      this.historyType = await promisifyEvent(this.getHistoryTypeEvent);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const host = {
      attributes: {
        class: 'psk-app-router'
      }
    }

    return (
      <Host {...host.attributes}>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>

          </stencil-route-switch>
        </stencil-router>
      </Host>
    );
  }
}
