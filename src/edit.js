import { ColorPicker,PanelBody } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls,} from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes,setAttributes}) {

	console.log(attributes);

	return (
		<>
		<div { ...useBlockProps() }>
			<div style={{border: `1px dotted ${attributes.fntColor}`, backgroundColor:attributes.bgColor, textAlign: 'center', width: '100%', height: '100px', paddingTop: '30px'}} >
                 <p style={{textDecoration:'underline', color:attributes.fntColor, backgroundColor:attributes.bgColor}}> {__("Browse or  Drop image here","wp-js-crop")} </p>
			</div>



		</div>
		<div>

		<InspectorControls>
<PanelBody>

	<div style={{height:"500px"}}>
 <label>{__("Font Color","wp-js-crop").toUpperCase()}</label>
               <ColorPicker
			   	color={attributes.fntColor}
            	onChange={val=>setAttributes({fntColor:val})}
            	enableAlpha
            	defaultValue={attributes.fntColor}
			/>

</div>			

<div style={{height:"500px"}}>
 <label>{__("Background Color","wp-js-crop").toUpperCase()}</label>
               <ColorPicker
			   	color={attributes.bgColor}
            	onChange={val=>setAttributes({bgColor:val})}
            	enableAlpha
            	defaultValue={attributes.bgColor}
			/>
			</div>
 </PanelBody>
	</InspectorControls>


		</div>
	</>
	);
}
