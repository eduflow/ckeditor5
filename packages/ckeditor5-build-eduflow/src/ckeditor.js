/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator(s) to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'; // custom

// Default
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

// Custom
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Mathematics from '@isaul32/ckeditor5-math/src/math';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import { Accordion } from '@peergrade/ckeditor5-accordion';
import { FileUpload } from '@tony/ckeditor5-fileupload';

import '../theme/theme.css';

class BalloonEditor extends BalloonEditorBase {}
class ClassicEditor extends ClassicEditorBase {}

//
// Add CSS class to the editor upon initialiation
// Support ticket(s): #68240
//
function EditorClassPlugin( editor ) {
	const className = editor.config.get( 'editorClass' );

	editor.ui.on( 'ready', () => {
		// For all balloons and popups to inherit from.
		editor.ui.view.body._bodyCollectionContainer.classList.add( className );

		// Note: Balloon editor doesn't have one.
		if ( editor.ui.view.element ) {
			editor.ui.view.element.classList.add( className );
		}
	} );

	// For the editing root. In the Classic editor, it slightly duplicates with the class set on
	// editor.ui.view.element because editor.ui.view.element contains the editing root. In the alloon editor,
	// which does not have the UI container (view), this makes perfect sense, though.
	editor.editing.view.change( writer => {
		writer.addClass( className, editor.editing.view.document.getRoot() );
	} );
}

function MoveSelectionToTextOnInit( editor ) {
	const model = editor.model;
	const selection = model.document.selection;
	const schema = model.schema;

	//
	// Widget Workaround (no focus on load): Single widget in content area, avoid selecting by default by insert a newline after
	// This will briefly focus the image initially, but add a new line and defocus.
	// Support ticket(s): #70627
	//
	editor.data.on( 'init', () => {
		const selectedElement = selection.getSelectedElement();

		if ( selectedElement && schema.isObject( selectedElement ) ) {
			const newSelection = model.createSelection( selection.getLastPosition() );

			model.change( writer => {
				const root = editor.model.document.getRoot();
				// covers 2 cases - single widget in content area; two widgets one under the other
				if ( root.childCount == 1 ) {
					writer.appendElement( 'paragraph', root );
				} else if ( selectedElement.nextSibling && schema.isObject( selectedElement.nextSibling ) ) {
					writer.insertElement( 'paragraph', selectedElement, 'after' );
				}
			} );

			model.modifySelection( newSelection, { direction: 'forward' } );
			model.change( writer => {
				writer.setSelection( newSelection.focus );
			} );
		}
	} );

	//
	// Widget Workaround part 2 (delection edgecase): Allow image to be defocused when clicking on the right side
	// Support ticket(s): #70796 + #73702
	//
	editor.ui.view.editable.on( 'change:isFocused', ( evt, name, isFocused ) => {
		const model = editor.model;
		const selection = model.document.selection;
		const schema = model.schema;

		if ( !isFocused ) {
			const selectedElement = selection.getSelectedElement();
			if ( selectedElement && schema.isObject( selectedElement ) ) {
				const newSelection = model.createSelection( selection.getLastPosition() );

				model.change( writer => {
					const root = editor.model.document.getRoot();

					// covers 2 cases - single widget in content area; two widgets one under the other
					if ( root.childCount == 1 ) {
						writer.appendElement( 'paragraph', root );
					} else if ( selectedElement.nextSibling && schema.isObject( selectedElement.nextSibling ) ) {
						writer.insertElement( 'paragraph', selectedElement, 'after' );
					}
				} );

				model.modifySelection( newSelection, { direction: 'forward' } );
				model.change( writer => {
					writer.setSelection( newSelection.focus );
				} );
			}
		}
	}, { priority: 'lowest' } );
}

// Plugins to include in the build.
const plugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	BlockToolbar,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	CloudServices,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	TextTransformation,

	// ADDED
	Accordion,
	Code,
	CodeBlock,
	FileUpload,
	HorizontalLine,
	Highlight,
	ImageResize,
	LinkImage,
	Mathematics,
	Mention,
	Strikethrough,
	Table,
	TableColumnResize,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	Underline
];

BalloonEditor.builtinPlugins = plugins;
ClassicEditor.builtinPlugins = plugins;

export default {
	BalloonEditor,
	ClassicEditor,

	// Custom plugins
	EditorClassPlugin,
	MoveSelectionToTextOnInit
};
