import { Component, Element, h, Prop, State } from '@stencil/core';

// import { DefaultApplicationController } from '../../../controllers';
import DefaultApplicationController from '../../../controllers/ApplicationController';

import { TableOfContentProperty } from "../../../decorators";
import { ControllerRegistryService } from "../../../services";

import { ExtendedHistoryType } from "../../../interfaces/ExtendedHistoryType";

@Component({
  tag: 'pskx-app-root',
  styleUrls: {
    default: '../../styles/psk-app-root/psk-app-root.scss'
  },
  shadow: true
})
export class PskxAppRoot {
  @TableOfContentProperty({
    isMandatory: false,
    description: [
      `This property is a string that will permit the developer to choose his own controller.`,
      `If no controller is provided, a default controller will be passed to the component.`,
      `It is recommended that each app to extend the provided default controller and adapt it to the application needs.`
    ],
    propertyType: `string`,
    defaultValue: `null`
  })
  @Prop() controller: any;

  @Prop() disableSidebar: boolean = false;

  @Element() host: HTMLElement;

  @State() historyType: ExtendedHistoryType;
  @State() htmlLoader: HTMLElement;
  @State() hasSlot: boolean = false;
  @State() disconnected: boolean = false;

  __createLoader() {
    const NR_CIRCLES = 12;
    let circles = "";

    for (let i = 1; i <= NR_CIRCLES; i++) {
      circles += `<div class="sk-circle${i} sk-circle"></div>`
    }

    let node = document.createElement("div");
    node.className = "app-loader";
    node.innerHTML = `<div class='sk-fading-circle'>${circles}</div>`;
    return node;
  }

  connectedCallback() {
    this.disconnected = false;
  }

  disconnectedCallback() {
    this.disconnected = true;
  }

  async componentWillLoad() {
    if (this.host.parentElement) {
      this.htmlLoader = this.__createLoader();
      this.host.parentElement.appendChild(this.htmlLoader);
    }

    let innerHTML = this.host.innerHTML;
    innerHTML = innerHTML.replace(/\s/g, '');
    if (innerHTML.length) {
      this.hasSlot = true;
    }

    if (typeof this.controller === 'string') {
      try {
        let Controller = await ControllerRegistryService.getController(this.controller);

        // Prevent javascript execution if the node has been removed from DOM
        if (!this.disconnected) {
          new Controller(this.host);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // load default controller
      new DefaultApplicationController(this.host);
    }
  }

  async componentDidLoad() {
    if (this.htmlLoader && this.htmlLoader.parentNode) {
      this.htmlLoader.parentNode.removeChild(this.htmlLoader);
    }
  }

  render() {
    if (!this.hasSlot) {
      this.host.innerHTML = `
        <pskx-app-menu></pskx-app-menu>
        <pskx-app-container></pskx-app-container>
      `;
    }

    return <slot/>;
  }
}
