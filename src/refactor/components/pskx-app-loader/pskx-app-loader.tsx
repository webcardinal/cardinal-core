import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { TableOfContentProperty } from '../../../decorators';

const LOADER_TYPES = [
  'default',
  'iframe'
]

@Component({
  tag: 'pskx-app-loader',
  shadow: true
})
export class PskxAppLoader {
  private defaults = {
    type: LOADER_TYPES[0],
  };

  @Element() host: HTMLElement;

  @TableOfContentProperty({
    description: [
      `This property is the url for the page that needs to be loaded.`,
      `When this component loads a GET HTTP request will be issued and the content of that url will be rendered if it can be accessed.`
    ],
    isMandatory: true,
    propertyType: 'string'
  })
  @Prop() src: string = null;

  @TableOfContentProperty({
    description: [
      `This property indicates if the page should use an iframe or div to render the content retrieved.`,
      `Accepted values: ${LOADER_TYPES.join(', ')}.`
    ],
    isMandatory: false,
    propertyType: 'string',
    defaultValue: LOADER_TYPES[0]
  })
  @Prop({ mutable: true }) type: string = this.defaults.type;

  @State() content: string = null;
  private error: boolean = false;

  private async _getContent() {
    try {
      const response = await fetch(this.src);
      this.error = false;
      return await response.text();
    } catch (error) {
      this.error = true;
      throw error;
    }
  }

  async componentWillLoad() {
    console.log('pskx-app-loader componentWillLoad!', this.src);

    this.type = this.type.toLowerCase();
    if (!LOADER_TYPES.includes(this.type)) {
      this.type = this.defaults.type;
    }
  }

  async componentWillRender() {
    console.log('pskx-app-loader componentWillRender!', this.src);

    this._getContent()
      .then(data => this.content = data)
      .catch(error => console.error(error))
  }

  async componentDidRender() {
    console.log('pskx-app-loader componentDidRender!', this.src);
  }

  async componentDidLoad() {
    console.log('pskx-app-loader componentDidLoad!', this.src);
  }

  render() {
    if (this.error) {
      return <h4>{`Page ${this.src} could not be loaded!`}</h4>
    }

    switch (this.type) {
      case 'iframe': {
        const attributes = {
          frameBorder: 0,
          style: {
            overflow: 'hidden',
            width: '100%', height: '100%'
          },
          src: 'data:text/html;charset=utf-8, ' + escape(this.content)
        };
        return <iframe {...attributes}/>;
      }
      default: {
        const attributes = {
          style: {
            display: 'block',
            width: '100%', height: '100%'
          }
        }
        this.host.innerHTML = this.content;
        return (
          <Host {...attributes}>
            <slot/>
          </Host>
        )
      }
    }
  }
}
