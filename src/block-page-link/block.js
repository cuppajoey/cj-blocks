/**
 * BLOCK: Page Link
 *
 * Simple block displays a page title, excerpt that links to user-defined URL
 */

//  Import CSS.
// import './editor.scss';
// import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; 
const { RichText, URLInputButton } = wp.blockEditor;


registerBlockType( 'cgb/page-link', {
	title: __( 'Page Link' ),
	icon: 'shield', 
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
