// app/types/dataTypes.ts
export interface HeroButton {
  text: string;
  icon: string; // store icon name as string like "FaPlay"
}

export interface Hero {
  greeting: string;
  name: string;
  roles: string[];
  bgScrollingText: string;
  profileImg: string;
  bgImage: string;
  videoUrl: string;
  buttons: HeroButton[];
}

export interface AboutInterest {
  id: string;
  iconName: string;
  title: string;
  desc: string;
  points: AboutPoint[];
}

export interface AboutPoint {
  id: string;
  text: string;
}

export interface AboutParagraph {
  id: string;
  text: string;
}

export interface AboutSocial {
  platform: string;
  link: string;
}

export interface About {
  heading: string;
  subtitle: string;
  description: string;
  journeyTitle: string;
  journeyParagraphs: AboutParagraph[];
  socialLabel: string;
  socials: AboutSocial[];
  interests: AboutInterest[];
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface Skills {
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export interface ProjectLinks {
  live: string;
  github: string;
}

export interface Project {
  title: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
  links: ProjectLinks;
  images: string[];
}

export interface Projects {
  title: string;
  subtitle: string;
  list: Project[];
}

export interface Testimonials {
  title: string;
  subtitle: string;
  images: string[];
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  subtitle: string;
}

export interface ContactFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
  buttonText: string;
}

export interface ContactTitle {
  first: string;
  second: string;
}

export interface Contact {
  title: ContactTitle;
  subtitle: string;
  formAction: string;
  info: ContactInfo[];
  formFields: ContactFormFields;
}

export interface PortfolioData {
  _id: string;
  hero: Hero;
  about: About;
  skills: Skills;
  projects: Projects;
  testimonials: Testimonials;
  contact: Contact;
}
