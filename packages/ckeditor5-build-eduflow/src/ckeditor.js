/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
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
import MediaEmbed from '@peergrade/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';

// Custom
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Mathematics from 'ckeditor5-math/src/math';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';

import '../theme/theme.css';

class BalloonEditor extends BalloonEditorBase {}
class ClassicEditor extends ClassicEditorBase {}

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
	Code,
	CodeBlock,
	HorizontalLine,
	Highlight,
	ImageResize,
	LinkImage,
	Mathematics,
	Mention,
	Strikethrough,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	Underline,
];

BalloonEditor.builtinPlugins = plugins;
ClassicEditor.builtinPlugins = plugins;

// Editor configuration.
const config = {
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en',

	toolbar: {
		items: [
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'highlight',
			'link',
			'code',
		],
	},

	image: {
		styles: ['alignLeft', 'alignCenter', 'alignRight'],
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'linkImage',
		],
	},

	// Custom
	math: {
		engine: 'katex', // or katex or function. E.g. (equation, element, display) => { ... }
		lazyLoad: undefined, // async () => { ... }, called once before render engine missing. After resolution, renders equation.
		outputType: 'script', // or span
		forceOutputType: false, // forces output to use outputType
		enablePreview: true, // Enable preview view
	},
};

BalloonEditor.defaultConfig = {
	...config,
	blockToolbar: [
		'heading',
		'|',
		'bulletedList',
		'numberedList',
		'horizontalLine',
		'blockQuote',
		'insertTable',
		'|',
		'uploadImage',
		'mediaEmbed',
		'math',
		'codeBlock',
	],
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties',
			'tableCellProperties',
		],
	},
};

ClassicEditor.defaultConfig = {
	...config,
	toolbar: {
		items: [
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'highlight',
			'link',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'uploadImage',
			'mediaEmbed',
			'math',
			'|',
			'codeBlock',
		],
	},
};

export default { BalloonEditor, ClassicEditor };