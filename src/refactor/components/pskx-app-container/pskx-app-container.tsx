import { Component, h } from '@stencil/core';

@Component({
  tag: 'pskx-app-container'
})
export class PskxAppContainer {

  render() {
    return [
      <div class="container before">
        <slot name="before"/>
      </div>,
      <div class="container app-container">
        <pskx-app-router/>
      </div>,
      <div class="container after">
        <slot name="after"/>
      </div>
    ];
  }
}
