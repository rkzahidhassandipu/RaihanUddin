// app/types/dataTypes.ts

/**
 * UTILITY TYPES
 */
export interface MongoId {
  $oid: string;
}

/**
 * HERO SECTION
 */
export interface HeroButton {
  text: string;
  icon: string; // e.g., "FaPlay"
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

/**
 * ABOUT SECTION
 */
export interface AboutSocial {
  platform: string;
  link: string;
  icon?: string; // Optional because some entries in your JSON have it, others don't
}

export interface AboutParagraph {
  id: string;
  text: string;
}

export interface AboutPoint {
  id: string;
  text: string;
}

export interface AboutInterest {
  id: string;
  iconName: string;
  title: string;
  desc: string;
  points: AboutPoint[];
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


/**
 * SKILLS SECTION
 */
export interface SkillItem {
  name: string;
  icon: string;
}

export interface Skills {
  title: string;
  subtitle: string;
  items: SkillItem[];
}

/**
 * PROJECTS SECTION
 */
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

/**
 * TESTIMONIALS SECTION
 */
export interface Testimonials {
  title: string;
  subtitle: string;
  images: string[];
}

/**
 * CONTACT SECTION
 */
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

/**
 * ROOT DATA STRUCTURE
 */
export interface PortfolioData {
  _id: string | MongoId; // Supports both raw string and MongoDB object format
  hero: Hero;
  about: About;
  skills: Skills;
  projects: Projects;
  testimonials: Testimonials;
  contact: Contact;
}

// Alias for convenience if you use "HeroData" in some components
export type HeroData = PortfolioData;