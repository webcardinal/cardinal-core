import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'pskx-app-menu-item'
})
export class PskxAppMenuItem {
  @Element() host: HTMLElement;

  @Prop() item;

  @Prop() href: string = '';

  @Prop() level: number = 0;

  private mode: string | null = null;

  private __setMode() {
    if (!this.mode) {
      let element = this.host.parentElement;
      while (element.tagName.toLowerCase() !== 'pskx-app-menu') {
        element = element.parentElement;
      }
      this.mode = element.getAttribute('mode');
    }
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.__setMode();

    if (this.mode === 'vertical') {
      const item = e.currentTarget as HTMLElement;
      const dropdown = item.parentElement;
      dropdown.toggleAttribute('active');
    }
  }

  render() {
    const dropdown = {
      attributes: {
        class: {
          'dropdown': true,
          [`level-${this.level}`]: true, // this.level > 0
        }
      },
      items: []
    };

    const { path: url, name, children } = this.item as any;

    if (children && children['type'] === 'known') {
      const { items } = children;
      for (let i = 0; i < items.length; i++) {
        dropdown.items.push(<pskx-app-menu-item item={items[i]} level={this.level + 1}/>)
      }
    }

    return (
        <Host>
        { !children
          ? <stencil-route-link class="item" url={url}>{name}</stencil-route-link>
          : (
            <div {...dropdown.attributes}>
              <div class="item" onClick={this.handleClick.bind(this)}>{name}</div>
              <div class="items">{dropdown.items}</div>
            </div>
          )
        }
      </Host>
    )
  }
}
