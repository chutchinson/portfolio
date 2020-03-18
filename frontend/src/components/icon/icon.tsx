import { Component, Prop, Element, h } from '@stencil/core'
import { IconKind, IconKinds } from './interface'

@Component({
    tag: 'ui-icon',
    styleUrl: 'icon.scss',
    shadow: true
})
export class Icon {

    @Element() private el!: HTMLElement
    @Prop() public glyph: string = 'home'
    @Prop() public kind: IconKind = 'regular'

    connectedCallback() {
        // find reference to font-awesome stylesheet and clone into shadow root
        const link = document.querySelector('link[href*="font-awesome"]')
        this.el.shadowRoot?.appendChild(link!.cloneNode())
    }

    public render() {
        const { kind, glyph } = this
        const className = `${IconKinds[kind]} fa-${glyph}`
        return (
            <i class={className}></i>
        )
    }

}