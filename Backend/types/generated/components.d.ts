import type { Schema, Struct } from '@strapi/strapi';

export interface HotelComponentAmenity extends Struct.ComponentSchema {
  collectionName: 'components_hotel_component_amenities';
  info: {
    displayName: 'Amenity';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
  };
}

export interface HotelComponentAminity extends Struct.ComponentSchema {
  collectionName: 'components_hotel_component_aminities';
  info: {
    displayName: 'Aminity';
    icon: 'car';
  };
  attributes: {};
}

export interface PackageComponentsIncludeItem extends Struct.ComponentSchema {
  collectionName: 'components_package_components_include_items';
  info: {
    displayName: 'IncludeItem';
    icon: 'apps';
  };
  attributes: {};
}

export interface SharedAmenity extends Struct.ComponentSchema {
  collectionName: 'components_shared_amenities';
  info: {
    displayName: 'Amenity';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
  };
}

export interface SharedGalleryimage extends Struct.ComponentSchema {
  collectionName: 'components_shared_galleryimages';
  info: {
    displayName: 'Galleryimage';
  };
  attributes: {
    Caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedIncludeItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_include_items';
  info: {
    displayName: 'IncludeItem';
  };
  attributes: {
    Text: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hotel-component.amenity': HotelComponentAmenity;
      'hotel-component.aminity': HotelComponentAminity;
      'package-components.include-item': PackageComponentsIncludeItem;
      'shared.amenity': SharedAmenity;
      'shared.galleryimage': SharedGalleryimage;
      'shared.include-item': SharedIncludeItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
