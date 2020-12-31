import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'pskx-app-container'
})
export class PskxAppContainer {
  @Element() host: HTMLElement;

  private slots = {
    before: false,
    after: false
  }

  async componentWillLoad() {
    // manage slots
    for (const key of Object.keys(this.slots)) {
      if (this.host.querySelector(`[slot=${key}]`)) {
        this.slots[key] = true;
        this.host.classList.add(`slot-${key}`);
      } else {
        this.host.classList.remove(`slot-${key}`);
      }
    }
  }

  render() {
    return [
      ( this.slots.before
        ? <div class="container before">
            <slot name="before"/>
          </div>
        : null
      ),
      <div class="container app-container">
        <pskx-app-router/>
      </div>,
      ( this.slots.after
        ? <div class="container after">
            <slot name="after"/>
          </div>
        : null
      )
    ];
  }
}
