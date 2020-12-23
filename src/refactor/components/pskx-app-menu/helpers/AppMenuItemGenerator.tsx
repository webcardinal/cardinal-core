// @ts-ignore
import { h } from '@stencil/core';

export default class AppMenuItemGenerator {
  // @ts-ignore
  private readonly __historyType: null;

  constructor(historyType = null) {
    this.__historyType = historyType
  }

  // render(item) {
  //   let href = item.path;
  //
  //   let children = [];
  //   if (item.children && item.children.type === 'known') {
  //     item.children.items.forEach(child => children.push(this.render(child)));
  //   }
  //
  //   let ItemRenderer = this.__historyType === 'query' ? 'query-page-link' : 'stencil-route-link';
  //   let ItemWrapperTag = item.type === 'abstract' ? 'dropdown-renderer' : ItemRenderer;
  //
  //   // return (
  //   //   <ItemWrapperTag url={href} activeClass="active" exact={false} somethingChanged={this.value} onClick={(evt)=>this.notifyItemClicked(evt)}>
  //   //     <div class="wrapper_container">
  //   //       <div class={`item_container ${item.children?"has-children":""}`}>
  //   //         <span class={`icon fa ${item.icon}`}></span>
  //   //         <a>
  //   //           {item.children ? <span class="item_name">{item.name}<span class="fa fa-caret-down"></span></span> :
  //   //             <span class="item_name">{item.name}</span>}
  //   //         </a>
  //   //       </div>
  //   //       {item.children ? <div class="children">
  //   //         {children}
  //   //       </div> : null}
  //   //     </div>
  //   //   </ItemWrapperTag>
  //   // )
  // }
}
