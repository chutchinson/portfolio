import { Config } from '@stencil/core'
import { sass } from '@stencil/sass'

const config: Config = {
    namespace: 'cshutchinson',
    outputTargets: [
        { type: 'www', baseUrl: 'https://www.cshutchinson.com' }
    ],
    globalStyle: 'src/style/index.scss',
    globalScript: 'src/index.ts',
    plugins: [
        sass()
    ]
}

export { config }