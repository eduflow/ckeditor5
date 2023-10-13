/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { type Editor } from '@ckeditor/ckeditor5-core';
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import '../theme/theme.css';
declare function EditorClassPlugin(editor: Editor): void;
declare function MoveSelectionToTextOnInit(editor: Editor): void;
export declare class BalloonEditor extends BalloonEditorBase {
    static builtinPlugins: any[];
}
export declare class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: any[];
}
declare const _default: {
    BalloonEditor: typeof BalloonEditor;
    ClassicEditor: typeof ClassicEditor;
    EditorClassPlugin: typeof EditorClassPlugin;
    MoveSelectionToTextOnInit: typeof MoveSelectionToTextOnInit;
};
export default _default;
