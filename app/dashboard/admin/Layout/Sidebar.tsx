'use client'
import { LayoutDashboard, Image, Folder, Settings   } from 'lucide-react';

interface SidebarProps {
  activeTab: 'hero' | 'about' | 'projects' | "skills" | 'testimonials' | 'contact_info';
  setActiveTab: (tab: 'hero' | 'about' | 'projects' | "skills" | 'testimonials' | 'contact_info') => void;
}

const menu = [
  { key: 'hero', label: 'Hero Section', icon: Image },
  { key: 'about', label: 'About Section', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', icon: Folder },
  { key: 'skills', label: 'Skills', icon: Settings  },
  { key: 'testimonials', label: 'Testimonials', icon: Settings  },
  { key: 'contact_info', label: 'Contact Info', icon: Settings  },
] as const;

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 px-4 py-6">
      <h1 className="mb-10 text-xl font-semibold tracking-wide">
        Admin Panel
      </h1>

      <nav className="space-y-1">
        {menu.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition
              ${
                activeTab === key
                  ? 'bg-red-500/10 text-red-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
          >
            <Icon className="h-5 w-5" />
            {label}
            {activeTab === key && (
              <span className="ml-auto h-2 w-2 rounded-full bg-red-400" />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
