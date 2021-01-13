import { Config as StencilConfig } from '@stencil/core';

export interface CardinalConfig extends StencilConfig {
  readonly useBootstrap: boolean
}

export const config: CardinalConfig = {
  namespace: 'webcardinal',
  globalScript: './src/globals/index.ts',
  globalStyle: './src/globals/main.css',
  outputTargets: [
    {
      type: 'dist',
      dir: 'build/dist',
      // esmLoaderPath: '../loader',
      // copy: [
      //   {
      //     src: 'controllers/defaultApplicationConfig.json',
      //     warn: true
      //   },
      //   {
      //     src: 'controllers/AppConfigurationHelper.js',
      //     warn: true
      //   },
      //   {
      //     src: 'controllers/base-controllers',
      //     warn: true
      //   },
      //   {
      //     src: 'events/*.js',
      //     warn: true
      //   },
      //   {
      //     src: 'libs/*.js',
      //     warn: true
      //   },
      //   {
      //     src: 'utils/fetch.js',
      //     warn: true
      //   },
      // ]
    },
    // {
    //   type: 'dist-custom-elements-bundle',
    //   dir: 'build/elements-bundle'
    // },
    // {
    //   type: 'www',
    //   dir: 'build/www',
    //   serviceWorker: null
    // }
  ],
  useBootstrap: true
}
