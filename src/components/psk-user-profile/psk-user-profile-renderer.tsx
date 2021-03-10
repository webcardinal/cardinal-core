import { Component, h, Prop} from "@stencil/core";
import { BindModel, CustomTheme, TableOfContentProperty } from "@cardinal/internals";;

/**
 * @disable cheatsheet
 */
@Component({
  tag: 'psk-user-profile-renderer',
  styleUrl: "../../assets/css/bootstrap/bootstrap.css",
  shadow: true
})

export class PskUserProfileRenderer {
  @CustomTheme()

  @BindModel() modelHandler;

  @TableOfContentProperty({
    description: `This property is the user information that needs to be rendered for the user.`,
    isMandatory: false,
    propertyType: `any`
  })
  @Prop() userInfo: any;

  render() {
    const { avatar, username, email } = this.userInfo;

    return (
      <div class="profile">
        <div class="card-body text-center">
          <p><img src={avatar} alt="card image" /></p>
          <h5 class="card-title">{username}</h5>
          <p class="card-text">{email}</p>
        </div>
      </div>
    );
  }
}

