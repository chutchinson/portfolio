import { ChildNode, h } from '@stencil/core'

interface Props {
    id: string
    title: string
}

export function Brand(props: { href: string, color: string, icon: string }, children: ChildNode | ChildNode[]) {
    const className = `button ${props.color}`
    return (
        <a class={className} href={props.href} target="_blank">
            <ui-icon kind="brand" glyph={props.icon} />
            {children}
        </a>
    )
}

export function Section(props: Props, children: ChildNode | ChildNode[]) {
    return [
        <section>
            <h2 id={props.id}>{props.title}</h2>
            {children}
        </section>,
        <hr />
    ]
}

export function List<T>(props: { items: T[], renderer: (item: T) => ChildNode | ChildNode[] }) {
    const items = props.items.map((item) => props.renderer(item))
    return (
        <ul class="list">
            {items}
        </ul>
    )
}

export function Cards<T>(props: { items: T[], renderer: (item: T) => ChildNode | ChildNode[] }) {
    const items = props.items.map((item) => props.renderer(item))
    return (
        <ul class="cards">
            {items}
        </ul>
    )
}