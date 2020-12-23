import { h } from '@stencil/core';

export default class AppMenuGenerator {
  private __items = [];

  set items(items) {
    this.__items = items;
  }

  get menu() {
    return {
      vertical: this.renderVerticalMenu(),
      horizontal: this.renderHorizontalMenu()
    }
  }

  get modes() {
    return Object.keys(this.menu);
  }

  private renderVerticalMenu() {
    if (this.__items.length === 0) {
      return;
    }

    console.log(this.__items);
    return this.__items.map(item => <a href="#">{item.name}</a>);
  }

  private renderHorizontalMenu() {
    if (this.__items.length === 0) {
      return;
    }

    console.log(this.__items);
    return this.__items.map(item => <a href="#">{item.name}</a>);
  }
}
