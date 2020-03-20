import { Component, Host, h } from '@stencil/core'
import '@stencil/router'

@Component({
    tag: 'app-root'
})
export class App {
    
    public render() {
        return (
            <stencil-router>
                <stencil-route-switch>
                    <stencil-route url="/dashboard" component="ui-dashboard" exact />
                    <stencil-route url="/" component="resume-app" />
                </stencil-route-switch>
            </stencil-router>
        )
    }

}
