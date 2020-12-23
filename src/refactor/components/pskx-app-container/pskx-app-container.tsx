import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'pskx-app-container'
})
export class PskxAppContainer {

  render() {
    const host = {
      attributes: {
        class: 'psk-app-container'
      }
    }

    return (
      <Host {...host.attributes}>
        Container
      </Host>
    );
  }
}
