import AboutEditor from '../About/About';
import ContactEditor from '../ContactEditor/ContactEditor';
import Hero from '../Hero/Hero';
import ProjectsEditor from '../projects/Projects';
import SkillsEditor from '../Skills/Skills';
import Testimonials from '../testimonials/Testimonials';

interface ContentProps {
  activeTab: 'hero' | 'about' | 'projects' | 'skills' | 'testimonials' | 'contact_info';
}

const Content = ({ activeTab }: ContentProps) => {
  return (
    <main className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950 px-8 py-5">
        <h2 className="text-2xl font-semibold capitalize">
          {activeTab} Management
        </h2>

        <span className="rounded-md bg-red-500/10 px-4 py-1 text-sm text-red-400">
          Admin
        </span>
      </header>

      {/* Page Content */}
      <section className="p-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow">
          {activeTab === 'hero' && <Hero />}
          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'skills' && <SkillsEditor />}
          {activeTab === 'testimonials' && <Testimonials />}
          {activeTab === 'contact_info' && <ContactEditor />}
        </div>
      </section>
    </main>
  );
};

export default Content;
