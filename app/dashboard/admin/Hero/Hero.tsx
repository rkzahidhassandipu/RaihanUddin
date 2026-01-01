import React, { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

export default function Hero() {
  const [portfolioData, setPortfolioData] = useState({
    hero: {
      greeting: "HELLO, I am",
      name: "Raihan Uddin",
      roles: [
        "Full Stack Developer", 2000,
        "MERN Stack Developer", 2000,
        "React Enthusiast", 2000,
        "Node.js Backend Builder", 2000,
        "Graphic Designer", 2000,
        "Printing design and social design", 2000,
      ],
      bgScrollingText: "Full Stack Developer",
      profileImg: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=900&fit=crop&crop=faces",
      bgImage: "https://i.postimg.cc/htkH77KF/banner-background-one.jpg",
      videoUrl: "https://www.youtube.com/embed/qzxW7iMQbKQ",
      buttons: [
        { text: "Watch Intro", icon: "FaPlay" },
      ]
    },
    about: {
      heading: "About Me.",
      description: "A personal portfolio is a collection of your work, that is achievements, and skills that web design highlights in your growth",
      socialLabel: "Find me on",
      socials: [
        { icon: "Instagram", link: "#" },
        { icon: "Linkedin", link: "#" },
        { icon: "Twitter", link: "#" },
        { icon: "Facebook", link: "#" },
      ]
    }
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [showPreview, setShowPreview] = useState(false);

  // Update hero fields
  const updateHeroField = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  // Update roles (paired text-delay)
  const updateRole = (index, value) => {
    const newRoles = [...portfolioData.hero.roles];
    newRoles[index] = value;
    setPortfolioData(prev => ({
      ...prev,
      hero: { ...prev.hero, roles: newRoles }
    }));
  };

  const addRole = () => {
    setPortfolioData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        roles: [...prev.hero.roles, "New Role", 2000]
      }
    }));
  };

  const removeRole = (index) => {
    const newRoles = portfolioData.hero.roles.filter((_, i) => 
      i !== index && i !== index + 1
    );
    setPortfolioData(prev => ({
      ...prev,
      hero: { ...prev.hero, roles: newRoles }
    }));
  };

  // Update about fields
  const updateAboutField = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  // Update socials
  const updateSocial = (index, field, value) => {
    const newSocials = [...portfolioData.about.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, socials: newSocials }
    }));
  };

  const addSocial = () => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        socials: [...prev.about.socials, { icon: "NewIcon", link: "#" }]
      }
    }));
  };

  const removeSocial = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        socials: prev.about.socials.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    console.log('Portfolio Data:', dataStr);
    alert('Data saved! Check console for export code.');
  };

  const roles = [];
  for (let i = 0; i < portfolioData.hero.roles.length; i += 2) {
    roles.push({
      text: portfolioData.hero.roles[i],
      delay: portfolioData.hero.roles[i + 1]
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio Data Editor</h1>
            <p className="text-purple-100">Manage your portfolio content with ease</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 p-4 bg-black/20 border-b border-white/10">
            <button
              onClick={() => setActiveSection('hero')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'hero'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Hero Section
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'about'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              About Section
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
            {/* Hero Section Editor */}
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Greeting</label>
                    <input
                      type="text"
                      value={portfolioData.hero.greeting}
                      onChange={(e) => updateHeroField('greeting', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={portfolioData.hero.name}
                      onChange={(e) => updateHeroField('name', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Background Scrolling Text</label>
                  <input
                    type="text"
                    value={portfolioData.hero.bgScrollingText}
                    onChange={(e) => updateHeroField('bgScrollingText', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Profile Image URL</label>
                    <input
                      type="url"
                      value={portfolioData.hero.profileImg}
                      onChange={(e) => updateHeroField('profileImg', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Background Image URL</label>
                    <input
                      type="url"
                      value={portfolioData.hero.bgImage}
                      onChange={(e) => updateHeroField('bgImage', e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Video URL</label>
                  <input
                    type="url"
                    value={portfolioData.hero.videoUrl}
                    onChange={(e) => updateHeroField('videoUrl', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-white font-medium">Roles & Delays</label>
                    <button
                      onClick={addRole}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Role
                    </button>
                  </div>
                  <div className="space-y-3">
                    {roles.map((role, index) => (
                      <div key={index} className="flex gap-3 items-center bg-white/5 p-3 rounded-lg">
                        <input
                          type="text"
                          value={role.text}
                          onChange={(e) => updateRole(index * 2, e.target.value)}
                          placeholder="Role title"
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="number"
                          value={role.delay}
                          onChange={(e) => updateRole(index * 2 + 1, parseInt(e.target.value))}
                          placeholder="Delay (ms)"
                          className="w-28 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => removeRole(index * 2)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* About Section Editor */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Heading</label>
                  <input
                    type="text"
                    value={portfolioData.about.heading}
                    onChange={(e) => updateAboutField('heading', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    value={portfolioData.about.description}
                    onChange={(e) => updateAboutField('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Social Label</label>
                  <input
                    type="text"
                    value={portfolioData.about.socialLabel}
                    onChange={(e) => updateAboutField('socialLabel', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-white font-medium">Social Links</label>
                    <button
                      onClick={addSocial}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4" /> Add Social
                    </button>
                  </div>
                  <div className="space-y-3">
                    {portfolioData.about.socials.map((social, index) => (
                      <div key={index} className="flex gap-3 items-center bg-white/5 p-3 rounded-lg">
                        <input
                          type="text"
                          value={social.icon}
                          onChange={(e) => updateSocial(index, 'icon', e.target.value)}
                          placeholder="Icon name"
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <input
                          type="url"
                          value={social.link}
                          onChange={(e) => updateSocial(index, 'link', e.target.value)}
                          placeholder="Link URL"
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => removeSocial(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preview Section */}
            {showPreview && (
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-white/20">
                <h3 className="text-white font-bold mb-3">Preview JSON:</h3>
                <pre className="text-green-400 text-sm overflow-auto max-h-96 bg-black/50 p-4 rounded">
                  {JSON.stringify(portfolioData, null, 2)}
                </pre>
              </div>
            )}

            {/* Save Button */}
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