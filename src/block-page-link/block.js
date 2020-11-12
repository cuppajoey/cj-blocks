/**
 * BLOCK: Page Link
 *
 * Simple block displays a page title, excerpt that links to user-defined URL
 */

//  Import CSS.
// import './editor.scss';
// import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { createElement } = wp.element;
const { registerBlockType } = wp.blocks; 
const { RichText, URLInputButton } = wp.blockEditor;

const cjIcon = createElement('svg', { width: 20, height: 20 },
  createElement('path', { d: "M12.5,12H12v-0.5c0-0.3-0.2-0.5-0.5-0.5H11V6h1l1-2c-1,0.1-2,0.1-3,0C9.2,3.4,8.6,2.8,8,2V1.5C8,1.2,7.8,1,7.5,1 S7,1.2,7,1.5V2C6.4,2.8,5.8,3.4,5,4C4,4.1,3,4.1,2,4l1,2h1v5c0,0-0.5,0-0.5,0C3.2,11,3,11.2,3,11.5V12H2.5C2.2,12,2,12.2,2,12.5V13 h11v-0.5C13,12.2,12.8,12,12.5,12z M7,11H5V6h2V11z M10,11H8V6h2V11z" } )
);


registerBlockType( 'cgb/page-link', {
	title: __( 'Page Link' ),
	icon: cjIcon, 
	category: 'common',
	keywords: [
		__( 'cj-blocks' ),
		__( 'Page Link' ),
    ],
    attributes: {
        heading: {
            type: 'array',
            source: 'children',
            selector: 'h2'
        },
        excerpt: {
            type: 'array',
            source: 'children',
            selector: 'p'
        },
        linkURL: {
            type: 'string'
        }
    },

	
	edit: ( props ) => {
        const {
			className,
			attributes: { heading, excerpt, linkURL },
			setAttributes,
        } = props;

        const updateHeading = ( value ) => {
			setAttributes( { heading: value } );
        };
        
        const updateExcerpt = ( value ) => {
			setAttributes( { excerpt: value } );
        };
        
        const updateLink = ( value ) => {
			setAttributes( { linkURL: value } );
		};
        
		return (
			<div className={ className }>
				<RichText
                    tagName="h2"
                    value={ heading }
                    placeholder={ __("Write heading...") }
                    onChange={ updateHeading }
                />
                <RichText
                    tagName="p"
                    value={ excerpt }
                    placeholder={ __("Write a description...") }
                    onChange={ updateExcerpt }
                />
                <URLInputButton
                    url={ linkURL }
                    label={ __("Edit Link") }
                    onChange={ updateLink }
                />
			</div>
		);
	},

	save: ( props ) => {
        const {
			className,
			attributes: { heading, excerpt, linkURL },
        } = props;

		return (
			<div className={ className }>
				<RichText.Content
                    tagName="h2"
                    value={ heading }
                />
                <RichText.Content
                    tagName="p"
                    value={ excerpt }
                />
                <a href={ linkURL }>{ __( "View More" ) }</a>
			</div>
		);
	},
} );
