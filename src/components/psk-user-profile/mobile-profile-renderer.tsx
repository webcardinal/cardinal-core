import { Component, h,  Prop, } from "@stencil/core";
import { BindModel, CustomTheme, TableOfContentProperty } from "@cardinal/internals";;

/**
 * @disable cheatsheet
 */
@Component({
  tag: 'mobile-profile-renderer',
  shadow: true
})
export class MobileProfileRenderer {

  @BindModel() modelHandler;
  @CustomTheme()
  @TableOfContentProperty({
    description: `This property is the user information that needs to be rendered for the user.`,
    isMandatory: false,
    propertyType: `any`
  })
  @Prop() userInfo:any;

  render() {
    return (
      <div class="profile">
        <div class="card-body text-center">
          <img src={this.userInfo.avatar}  width="48" height="48" alt="card image"/>
          <span>{this.userInfo.username}</span>
        </div>
      </div>
    );
  }
}

