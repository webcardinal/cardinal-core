import { Config as StencilConfig } from '@stencil/core';
import { generator } from "@webcardinal/internals";

export interface WebCardinalConfig extends StencilConfig {
  readonly component: string
  readonly useBootstrap: boolean
}

export const config: WebCardinalConfig = {
  component: "@cardinal/core",
  namespace: 'webcardinal',
  globalScript: './src/globals/index.ts',
  globalStyle: './src/globals/main.css',
  outputTargets: [
    {
      type: 'dist',
      dir: 'build/dist'
    },
    {
      type: "docs-readme",
      dir: "docs/readme",
      // strict: true,
      footer: "*Made by [WebCardinal](https://github.com/webcardinal) contributors.*"
    },
    {
      type: "docs-custom",
      generator
    }
  ],
  useBootstrap: true
}
