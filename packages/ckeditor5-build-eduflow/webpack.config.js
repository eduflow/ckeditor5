/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	performance: { hints: false },

	entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),

	output: {
		// The name under which the editor will be exported.
		library: 'CKEDITOR',

		path: path.resolve( __dirname, 'build' ),
		filename: 'ckeditor.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer: [
			new TerserPlugin( {
				sourceMap: true,
				terserOptions: {
					output: {
						// Preserve CKEditor 5 license comments.
						comments: /^!/
					}
				},
				extractComments: false
			} )
		]
	},

	plugins: [
		new webpack.NormalModuleReplacementPlugin(
			/pilcrow\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/pilcrow-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/bold\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/bold-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/italic\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/italic-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/underline\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/underline-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/strikethrough\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/strikethrough-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/bulletedlist\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/bulletedlist-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/numberedlist\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/numberedlist-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/\/link\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/link-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/\/unlink\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/unlink-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/horizontalline\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/horizontalline-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/quote\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/quote-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/table\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/table-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/check\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/check-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/cancel\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/cancel-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/object-left\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/object-left-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/object-right\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/object-right-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/object-center\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/object-center-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/formula\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/formula-eduflow.svg'
		),
		// Use formula-eduflow for math.svg (ckeditor5-math's .svg) too
		new webpack.NormalModuleReplacementPlugin(
			/math\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/formula-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/code\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/code-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/codeblock\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/code-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/media\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/media-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/image\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/image-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/eraser\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/eraser-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin(
			/marker\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/marker-eduflow.svg'
		),
		// Use this for pen too
		new webpack.NormalModuleReplacementPlugin(
			/pen\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/pen-eduflow.svg'
		),
		new webpack.NormalModuleReplacementPlugin( // img alt text
			/low-vision\.svg/,
			'@peergrade/ckeditor5-build-eduflow/theme/icons/low-vision-eduflow.svg'
		),
		new CKEditorWebpackPlugin( {
			// UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
			// When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
			language: 'en',
			additionalLanguages: 'all'
		} ),
		new webpack.BannerPlugin( {
			banner: bundler.getLicenseBanner(),
			raw: true
		} )
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve(
									'@ckeditor/ckeditor5-theme-lark'
								)
							},
							minify: true
						} )
					}
				]
			}
		]
	}
};
