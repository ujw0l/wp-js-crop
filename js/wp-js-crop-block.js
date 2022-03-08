
const { __ } = wp.i18n;
const wjcEl = wp.element.createElement;
wp.blocks.registerBlockType('wp-js-crop/js-crop-block', {
    title: __("Js Crop Block", 'wp-js-crop'),
    icon: 'image-crop',
    description: __("Gutenberg block to let user crop and upload image", "wp-js-crop"),
    category: 'media',
    keywords: [__('crop image', 'wp-js-crop'), __('upload image', 'wp-js-crop')],
    example: {},

    edit: () => {
        return wjcEl('div', { style: { 'border': '1px dotted rgba(0,0,0,0.5)', 'text-align': 'center', 'width': '100%', 'height': '100px', 'padding-top': '30px' } },
            wjcEl('p', { style: { 'text-decoration': 'underline' }, 'href': 'javascript:void(0)' }, __('Browse or  Drop image here', 'wp-js-crop')));

    },

    save: () => null,


});