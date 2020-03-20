import { Component, h, State, Host, Prop } from '@stencil/core'
import { CityService, WastePickup } from '../../services/city'

const Card = (props: { title: string, icon: string, state: boolean }) => {
    const className = {
        'card': true,
        'positive': props.state
    }
    return (
        <div class={className}>
            <ui-icon glyph={props.icon} />
            <p>{props.title}</p>
        </div>
    )
}

@Component({
    tag: 'ui-dashboard',
    styleUrl: 'dashboard.scss',
    shadow: true
})
export class Dashboard {

    @Prop({ reflect: true }) public loading = true

    @State() private state: WastePickup | null = {
        local: true,
        trash: false,
        recycling: false
    }

    public async componentDidLoad() {
        const service = new CityService()
        this.state = await service.wastePickup()
        this.loading = false
    }

    public render() {
        const { loading } = this
        const { trash, recycling } = this.state!
        return (
            <Host>
                <ul>
                    <Card title="trash" icon="trash" state={trash} />
                    <Card title="recycling" icon="recycle" state={recycling} />
                </ul>
                { loading 
                    ? 
                    <div class="loading">
                        <ui-icon glyph="spinner" />
                    </div> 
                    : null
                }
            </Host>
        )
    }

}