import { RangeControl,ColorPicker,PanelBody } from '@wordpress/components';

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
			<div style={{border: `1px dotted ${attributes.fntColor}`, backgroundColor:attributes.bgColor, textAlign: 'center', width: attributes.blockWd+'px', height: '75px',marginLeft:'auto',marginRight:'auto',display:'block'}} >
                 <p style={{ color:attributes.fntColor, backgroundColor:attributes.bgColor}}><span style={{textDecoration:'underline'}}>{__("Browse","wp-js-crop")}</span> <span>{__(" or  Drop image here","wp-js-crop")} </span></p>
			</div>



		</div>
		<div>

		<InspectorControls>
<PanelBody>

<RangeControl
				
				label= {__('Box Width in px',  "wp-js-crop")}
				min= {250}
				max= {600}
				onChange={ val => {
					setAttributes({blockWd: val })}}
				value= {attributes.blockWd}

				/>



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
