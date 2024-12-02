import type { Struct, Schema } from '@strapi/strapi';

export interface TextLogo extends Struct.ComponentSchema {
  collectionName: 'components_text_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    logoimage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface TextAboutUsText extends Struct.ComponentSchema {
  collectionName: 'components_text_about_us_texts';
  info: {
    displayName: 'AboutUsText';
  };
  attributes: {};
}

export interface MenuSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_social_links';
  info: {
    displayName: 'social link';
  };
  attributes: {
    Facebook: Schema.Attribute.String;
    Logo: Schema.Attribute.Component<'text.logo', false>;
  };
}

export interface MenuRightContent extends Struct.ComponentSchema {
  collectionName: 'components_menu_right_contents';
  info: {
    displayName: 'Right_Content';
    description: '';
  };
  attributes: {
    contentTitle: Schema.Attribute.String;
    contentLink: Schema.Attribute.String;
  };
}

export interface MenuHeaderLeft extends Struct.ComponentSchema {
  collectionName: 'components_menu_header_lefts';
  info: {
    displayName: 'HeaderLeft';
    description: '';
  };
  attributes: {
    leftContent: Schema.Attribute.Blocks;
  };
}

export interface MenuHeaderBottom extends Struct.ComponentSchema {
  collectionName: 'components_menu_header_bottoms';
  info: {
    displayName: 'HeaderBottom';
    description: '';
  };
  attributes: {
    bottomContent: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface MenuFooter extends Struct.ComponentSchema {
  collectionName: 'components_menu_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    Footer: Schema.Attribute.Component<'menu.social-link', true>;
  };
}

export interface MenuContentLinks extends Struct.ComponentSchema {
  collectionName: 'components_menu_content_links';
  info: {
    displayName: 'ContentLinks';
    icon: '';
    description: '';
  };
  attributes: {
    contentMainTitle: Schema.Attribute.String;
    Right_Content: Schema.Attribute.Component<'menu.right-content', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'text.logo': TextLogo;
      'text.about-us-text': TextAboutUsText;
      'menu.social-link': MenuSocialLink;
      'menu.right-content': MenuRightContent;
      'menu.header-left': MenuHeaderLeft;
      'menu.header-bottom': MenuHeaderBottom;
      'menu.footer': MenuFooter;
      'menu.content-links': MenuContentLinks;
    }
  }
}
