/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// Typings
import { type Editor } from '@ckeditor/ckeditor5-core';
import { type RootElement } from '@ckeditor/ckeditor5-engine';
import type RootEditableElement from '@ckeditor/ckeditor5-engine/src/view/rooteditableelement';

// The editor creator(s) to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'; // custom

// Default
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockToolbar, type BodyCollection } from '@ckeditor/ckeditor5-ui';
import { Bold, Code, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageResize, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableCellProperties, TableToolbar, TableColumnResize, TableProperties } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';

// Custom
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { Math as Mathematics } from '@isaul32/ckeditor5-math';
import { Accordion } from '@peergrade/ckeditor5-accordion';
import { FileUpload } from '@peergrade/ckeditor5-fileupload';

import '../theme/theme.css';

//
// Add CSS class to the editor upon initialiation
// Support ticket(s): #68240
//
function EditorClassPlugin( editor: Editor ): void {
	const className = editor.config.get( 'editorClass' ) as string;

	editor.ui.on( 'ready', () => {
		if ( !editor.ui.view ) {
			return;
		}
		// For all balloons and popups to inherit from.
		// @ts-expect-error This is a private variable
		( editor.ui.view.body as unknown as BodyCollection )._bodyCollectionContainer.classList.add( className );

		// Note: Balloon editor doesn't have one.
		if ( editor.ui.view.element ) {
			editor.ui.view.element.classList.add( className );
		}
	} );

	// For the editing root. In the Classic editor, it slightly duplicates with the class set on
	// editor.ui.view.element because editor.ui.view.element contains the editing root. In the alloon editor,
	// which does not have the UI container (view), this makes perfect sense, though.
	editor.editing.view.change( writer => {
		writer.addClass( className, editor.editing.view.document.getRoot() as RootEditableElement );
	} );
}

function MoveSelectionToTextOnInit( editor: Editor ): void {
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
				const root = editor.model.document.getRoot() as RootElement;
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
					const root = editor.model.document.getRoot() as RootElement;

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
	CKFinderUploadAdapter,
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

export class BalloonEditor extends BalloonEditorBase {
	public static override builtinPlugins = plugins;
}

export class ClassicEditor extends ClassicEditorBase {
	public static override builtinPlugins = plugins;
}

export default {
	BalloonEditor,
	ClassicEditor,

	// Custom plugins
	EditorClassPlugin,
	MoveSelectionToTextOnInit
};
