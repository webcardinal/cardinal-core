import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { MenuItem } from '../../../interfaces/MenuItem';
import AppMenuGenerator from './helpers/AppMenuGenerator';

@Component({
  tag: 'pskx-app-menu',
  styleUrls: {
    vertical: '../../styles/psk-app-menu/psk-app-menu.css'
  }
})
export class PskxAppMenu {
  private generator = new AppMenuGenerator();
  private defaultMode = this.generator.modes[0];

  @Prop() mode = this.defaultMode;

  @Prop() items?: MenuItem[] = [];

  @Element() host: HTMLElement;

  @Event({
    eventName: 'needMenuItems',
    bubbles: true, composed: true, cancelable: true
  }) getItemsEvent: EventEmitter

  async componentWillLoad() {
    if (this.items.length === 0) {
      this.getItemsEvent.emit((error, items) => {
        if (error) {
          console.error(error);
          return;
        }
        this.items = items;
        this.generator.items = items;
      });
    }

    if (!this.generator.modes.includes(this.mode)) {
      console.warn('psk-app-menu', `You should use one of the following modes: ${this.generator.modes.join(', ')}`);
      this.mode = this.defaultMode;
    }

    this.host.parentElement.classList.add(this.mode);
  }

  render() {
    let host = {
      attributes: {
        class: `psk-app-menu ${this.mode}`
      },
      menu: this.generator.menu[this.mode]
    }

    return (
      <Host {...host.attributes}>
        {host.menu}
      </Host>
    );
  }
}

