import * as ResumeData from '../../data/resume.json'

export interface Skill {
    name: string,
    tag: string
}

export interface Education {
    organization: string
    start: number
    end: number
    credential: string
    description: string
}

export interface Experience {
    organization: string
    title: string
    start: number,
    end: number,
    duration: string
}

export interface Testimonial {
    author: string
    organization: string
    position?: string
    quote: string
}

export interface Resume {
    skills: Skill[]
    education: Education[]
    experience: Experience[]
    testimonials: Testimonial[]
    technology: Technology[]
}

export interface Technology {
    name: string
    proficiency: number
}

export const resume = ResumeData as Resume