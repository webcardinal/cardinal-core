import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { MenuItem } from '../../../interfaces/MenuItem';
import { ExtendedHistoryType } from '../../../interfaces/ExtendedHistoryType';

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

  private __promisifyEvent(event): Promise<any> {
    return new Promise((resolve, reject) => {
      event.emit((error, data) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      });
    })
  }

  async componentWillLoad() {
    try {
      this.menuItems = await this.__promisifyEvent(this.getRoutesEvent);
      this.historyType = await this.__promisifyEvent(this.getHistoryTypeEvent);

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
        Router
      </Host>
    );
  }
}
