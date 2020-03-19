import { Component, Host, State, Listen, h } from '@stencil/core'
import { Section, Cards, List, Brand } from './components'
import { resume } from './interface'

@Component({
    tag: 'resume-app',
    styleUrl: 'resume.scss'
})
export class Resume {

    @State() private menuCollapsed = true

    public render() {
        const linksClass = this.menuCollapsed ? 'collapsed' : undefined
        return (
            <Host>
                <scroll-top />
                <nav>
                    <header>
                        <div class="brand">
                            <h1>Chris Hutchinson</h1>
                            <p>Software Developer &amp; DevOps Engineer</p>
                        </div>
                        {/* <div class="actions">
                            <button>
                                <i class="fa fa-print"></i>
                                <span>Print</span>
                            </button>
                        </div> */}
                    </header>
                    <ul class={linksClass}>
                        <li class="toggle" onClick={this.handleToggleNav}>
                            <a><ui-icon glyph="chevron-down" /></a>
                        </li>
                        <li><a href="#about">About Me</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#tech">Technology</a></li>
                        <li><a href="#education">Education</a></li>
                        <li><a href="#experience">Experience</a></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
                <main>
                    <Section id="about" title="About Me">
                        <p>
                            I am an ambitious software &amp; web developer with a vicious compulsion 
                            to design software and push the limits of my knowledge. I enjoy exploring and learning 
                            new technologies and spend much of my spare time experimenting in various 
                            computing disciplines and domains.
                        </p>
                        <br />
                        <Brand href="https://stackoverflow.com/users/381708/chris-hutchinson"
                            color="stack-overflow"
                            icon="stack-overflow">
                            stack <strong>overflow</strong>
                        </Brand>
                        <Brand href="https://www.linkedin.com/in/cshutchinson/"
                            color="linkedin"
                            icon="linkedin">
                            LinkedIn
                        </Brand>
                        <Brand href="https://github.com/chutchinson"
                            color="github"
                            icon="github">
                            GitHub
                        </Brand>
                    </Section>
                    <Section id="skills" title="Skills">
                        {this.skills}
                    </Section>
                    <Section id="tech" title="Technology">
                        {this.technology}
                    </Section>
                    <Section id="education" title="Education">
                        {this.education}
                    </Section>
                    <Section id="experience" title="Experience">
                        {this.experience}
                    </Section> 
                    <Section id="testimonials" title="Testimonials">
                        {this.testimonials}
                    </Section> 
                    <Section id="contact" title="Contact">
                        <form method="post" action="//api.cshutchinson.com/api/contact">
                            <label>
                                <span>Email</span>
                                <input name="replyTo" type="email" required />
                            </label>
                            <label>
                                <span>Subject</span>
                                <select name="subject" required>
                                    <option selected>Request Contact</option>
                                    <option>Hire</option>
                                    <option>Other</option>
                                </select>
                            </label>
                            <label>
                                <span>Message</span>
                                <textarea name="message" rows={10} cols={100} required 
                                    minLength={10} maxLength={500} />
                            </label>
                            <input type="submit" value="Send" />
                        </form>
                    </Section>
                </main>
            </Host>
        )
    }

    private handleToggleNav = (e: MouseEvent) => {
        this.menuCollapsed = !this.menuCollapsed
    }

    @Listen('hashchange', { target: 'window'})
    protected handleHashChange(e: Event) {
        this.menuCollapsed = true
    }

    private get skills() {
        return (
            <Cards items={resume.skills} renderer={(item) => (
                <li>{item.name}</li>
            )} />
        )
    }

    private get technology() {
        const items = resume.technology
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
        return (
            <Cards items={items} renderer={(item) => {
                const percent = (item.proficiency / 3) * 100
                const names = ['Beginner', 'Proficient', 'Expert']
                const classes = ['beginner', 'proficient', 'expert']
                const proficiency = names[item.proficiency - 1]
                const className = classes[item.proficiency - 1]
                const style = {
                    width: `${percent}%`
                }
                return [
                    <li>
                        <span>{item.name}</span>
                        <span class="secondary">{proficiency}</span>
                        <div class={{ percent: true, [className]: true }} style={style}></div>
                    </li>
                ]
            }} />
        )
    }

    private get education() {
        return (
            <List items={resume.education} renderer={(item) => (
                <li>
                    <h3>{item.credential}</h3>
                    <p>{item.organization} {item.end}</p>
                    <p>{item.description}</p>
                </li>
            )} />
        )
    }

    private get experience() {
        return (
            <List items={resume.experience} renderer={(item) => (
                <li>
                    <h3>{item.organization}</h3>
                    <p>{item.title}</p>
                    <p>{item.start} - {item.end} ({item.duration})</p>
                </li>
            )} />
        )
    }

    private get testimonials() {
        return (
            <List items={resume.testimonials} renderer={(item) => (
                <li>
                    <h3>{item.author}</h3>
                    <span>{item.position}</span>
                    <span>{item.organization}</span>
                    <blockquote>{item.quote}</blockquote>
                </li>
            )} />
        )
    }

}