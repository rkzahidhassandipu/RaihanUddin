import React, { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Code2, Image } from 'lucide-react';

export default function SkillsEditor() {
  const [portfolioData, setPortfolioData] = useState({
    skills: {
      title: "Skills",
      subtitle: "The skills, tools and technologies I am really good at:",
      items: [
        { name: "Javascript", icon: "https://skillicons.dev/icons?i=js" },
        { name: "Typescript", icon: "https://skillicons.dev/icons?i=ts" },
        { name: "React", icon: "https://skillicons.dev/icons?i=react" },
        { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
        { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
        { name: "Express.js", icon: "https://skillicons.dev/icons?i=express" },
        { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
        { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
        { name: "Sass/Scss", icon: "https://skillicons.dev/icons?i=sass" },
        { name: "Tailwindcss", icon: "https://skillicons.dev/icons?i=tailwind" },
        { name: "Bootstrap", icon: "https://skillicons.dev/icons?i=bootstrap" },
        { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
        { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
        { name: "GitHub", icon: "https://skillicons.dev/icons?i=github" },
        { name: "JQuery", icon: "https://skillicons.dev/icons?i=jquery" },
        { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
        { name: "Redux", icon: "https://skillicons.dev/icons?i=redux" },
        { name: "Prisma", icon: "https://skillicons.dev/icons?i=prisma" },
        { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
        { name: "Ps", icon: "https://skillicons.dev/icons?i=ps" },
        { name: "Ai", icon: "https://skillicons.dev/icons?i=ai" },
        { name: "XD", icon: "https://skillicons.dev/icons?i=xd" },
        { name: "kali", icon: "https://skillicons.dev/icons?i=kali" },
        { name: "Flowbite", icon: "https://flowbite.com/images/logo.svg" },
        { name: "shadcn", icon: "https://ui.shadcn.com/apple-touch-icon.png" },
      ]
    }
  });

  const [activeSection, setActiveSection] = useState('header');
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const updateHeaderField = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: { ...prev.skills, [field]: value }
    }));
  };

  const updateSkillItem = (index, field, value) => {
    const newItems = [...portfolioData.skills.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setPortfolioData(prev => ({
      ...prev,
      skills: { ...prev.skills, items: newItems }
    }));
  };

  const addSkill = () => {
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: [
          { name: "New Skill", icon: "https://skillicons.dev/icons?i=vscode" },
          ...prev.skills.items
        ]
      }
    }));
  };

  const removeSkill = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: prev.skills.items.filter((_, i) => i !== index)
      }
    }));
  };

  const duplicateSkill = (index) => {
    const skillToDuplicate = { ...portfolioData.skills.items[index] };
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: [...prev.skills.items, { ...skillToDuplicate, name: `${skillToDuplicate.name} (Copy)` }]
      }
    }));
  };

  const bulkImport = () => {
    const skillsText = prompt('Paste skill names (one per line):');
    if (skillsText) {
      const skillNames = skillsText.split('\n').filter(name => name.trim());
      const newSkills = skillNames.map(name => ({
        name: name.trim(),
        icon: `https://skillicons.dev/icons?i=${name.trim().toLowerCase()}`
      }));
      setPortfolioData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          items: [...newSkills, ...prev.skills.items]
        }
      }));
    }
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    console.log('Skills Data:', dataStr);
    alert('Data saved! Check console for export code.');
  };

  const filteredSkills = portfolioData.skills.items.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Skills Editor</h1>
            <p className="text-purple-100">Manage your skills and technologies</p>
          </div>

          <div className="flex gap-2 p-4 bg-black/20 border-b border-white/10 flex-wrap">
            <button
              onClick={() => setActiveSection('header')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'header'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Header Info
            </button>
            <button
              onClick={() => setActiveSection('skills')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'skills'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Skills ({portfolioData.skills.items.length})
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="ml-auto px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
          </div>

          <div className="p-6">
            {activeSection === 'header' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Section Title</label>
                  <input
                    type="text"
                    value={portfolioData.skills.title}
                    onChange={(e) => updateHeaderField('title', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Subtitle</label>
                  <textarea
                    value={portfolioData.skills.subtitle}
                    onChange={(e) => updateHeaderField('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Quick Stats
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white/80">
                    <div>
                      <div className="text-2xl font-bold text-purple-300">{portfolioData.skills.items.length}</div>
                      <div className="text-sm">Total Skills</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-300">
                        {portfolioData.skills.items.filter(s => s.icon.includes('skillicons.dev')).length}
                      </div>
                      <div className="text-sm">SkillIcons</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-300">
                        {portfolioData.skills.items.filter(s => !s.icon.includes('skillicons.dev')).length}
                      </div>
                      <div className="text-sm">Custom Icons</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-6">
                {/* Action Bar */}
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-white/20 rounded-xl p-4">
                  <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={addSkill}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Plus className="w-5 h-5" /> Add New Skill
                      </button>
                      <button
                        onClick={bulkImport}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                      >
                        <Code2 className="w-5 h-5" /> Bulk Import Skills
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      placeholder="🔍 Search skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-72"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(searchTerm ? filteredSkills : portfolioData.skills.items).map((skill, index) => {
                    const actualIndex = portfolioData.skills.items.findIndex(s => s === skill);
                    return (
                      <div
                        key={actualIndex}
                        className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {skill.icon ? (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-12 h-12 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="hidden w-full h-full items-center justify-center">
                              <Image className="w-8 h-8 text-white/30" />
                            </div>
                          </div>

                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => updateSkillItem(actualIndex, 'name', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Skill name"
                            />
                            <input
                              type="url"
                              value={skill.icon}
                              onChange={(e) => updateSkillItem(actualIndex, 'icon', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Icon URL"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => duplicateSkill(actualIndex)}
                            className="flex-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs rounded-lg transition-all border border-blue-500/30"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => removeSkill(actualIndex)}
                            className="flex-1 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs rounded-lg transition-all border border-red-500/30 flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>

                        <div className="mt-2 text-xs text-white/40">
                          {skill.icon.includes('skillicons.dev') ? (
                            <span className="text-green-400">✓ Using SkillIcons</span>
                          ) : (
                            <span className="text-yellow-400">⚠ Custom Icon</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredSkills.length === 0 && (
                  <div className="text-center py-12 text-white/50">
                    <Code2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No skills found matching "{searchTerm}"</p>
                  </div>
                )}

                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">💡 Pro Tips:</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Use SkillIcons for consistent styling: <code className="bg-black/30 px-2 py-0.5 rounded">https://skillicons.dev/icons?i=js</code></li>
                    <li>• Bulk import: Click "Bulk Import" and paste skill names (one per line)</li>
                    <li>• Search to quickly find and edit specific skills</li>
                    <li>• Duplicate similar skills to save time</li>
                  </ul>
                </div>
              </div>
            )}

            {showPreview && (
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-white/20">
                <h3 className="text-white font-bold mb-3">Preview JSON:</h3>
                <pre className="text-green-400 text-sm overflow-auto max-h-96 bg-black/50 p-4 rounded">
                  {JSON.stringify(portfolioData, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}