/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	ServerSideRender,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} from '@wordpress/editor';

/**
 * Internal dependencies.
 */
import './editor.scss';

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 100;

class LatestComments extends Component {
	constructor() {
		super( ...arguments );

		this.setAlignment = this.setAlignment.bind( this );
		this.setCommentsToShow = this.setCommentsToShow.bind( this );
		this.toggleAttribute = this.toggleAttribute.bind( this );
	}

	toggleAttribute( propName ) {
		return () => {
			const value = this.props.attributes[ propName ];
			const { setAttributes } = this.props;

			setAttributes( { [ propName ]: ! value } );
		};
	}

	setAlignment( nextAlign ) {
		const { setAttributes } = this.props;

		setAttributes( { align: nextAlign } );
	}

	setCommentsToShow( commentsToShow ) {
		const { setAttributes } = this.props;

		setAttributes( { commentsToShow: parseInt( commentsToShow, 10 ) || 0 } );
	}

	render() {
		const {
			align,
			commentsToShow,
			displayAvatar,
			displayExcerpt,
			displayTimestamp,
		} = this.props.attributes;

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ this.setAlignment }
					/>
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Latest Comments Settings' ) }>
						<ToggleControl
							label={ __( 'Display avatar' ) }
							checked={ displayAvatar }
							onChange={ this.toggleAttribute( 'displayAvatar' ) }
						/>
						<ToggleControl
							label={ __( 'Display date/time' ) }
							checked={ displayTimestamp }
							onChange={ this.toggleAttribute( 'displayTimestamp' ) }
						/>
						<ToggleControl
							label={ __( 'Display excerpt' ) }
							checked={ displayExcerpt }
							onChange={ this.toggleAttribute( 'displayExcerpt' ) }
						/>
						<RangeControl
							label={ __( 'Number of comments to show' ) }
							value={ commentsToShow }
							onChange={ ( value ) => this.setCommentsToShow( value ) }
							min={ MIN_COMMENTS }
							max={ MAX_COMMENTS }
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender
					block="core/latest-comments"
					attributes={ this.props.attributes }
				/>
			</Fragment>
		);
	}
}

export default LatestComments;
