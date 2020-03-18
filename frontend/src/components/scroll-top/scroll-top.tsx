import { Component, State, Listen, Host, Build, h } from '@stencil/core'

@Component({
    tag: 'scroll-top',
    styleUrl: 'scroll-top.scss',
    shadow: true
})
export class ScrollTop {

    @State() private visible = true

    public componentWillLoad() {
        // ensure component is always visible during prerendering or
        // if scripting is disabled
        if (Build.isBrowser) {
            this.visible = false
        }
    }

    public render() {
        const { visible } = this
        const style = {
            visibility: visible ? 'visible' : 'hidden'
        }
        return (
            <Host style={style}>
                <a href="#top" onClick={this.handleClick}>
                    <span>Back to Top</span>
                    <ui-icon glyph="chevron-up" />
                </a>
            </Host>
        )
    }

    @Listen('scroll', { target: 'window' })
    protected handleScroll(e: Event) {
        const ratio = window.scrollY / document.body.offsetHeight
        this.visible = ratio >= (1.0 / 4.0)
    }

    private handleClick(e: MouseEvent) {
        e.preventDefault()
        window.scroll({
            behavior: 'smooth',
            top: 0,
            left: 0
        })
    }

}