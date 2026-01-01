import React, { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Code, Heart, User } from 'lucide-react';

const getIcon = (iconName) => {
  switch (iconName) {
    case "Code":
      return <Code className="w-8 h-8" />;
    case "Heart":
      return <Heart className="w-8 h-8" />;
    default:
      return <User className="w-8 h-8" />;
  }
};

export default function AboutEditor() {
  const [portfolioData, setPortfolioData] = useState({
    about: {
      heading: "About Me",
      subtitle: "Who I am, what I do, and how I got here",
      journeyTitle: "My Journey",
      journeyParagraphs: [
        "I am a professional Web Developer with a deep passion for building modern and responsive web applications. I've been working in the web development field for a long time, but my journey has not been easy. Despite trying multiple times and following many YouTube tutorials and playlists, I struggled due to the lack of proper guidance.",
        "Recently, I completed a comprehensive course from Programming Hero, which completely changed my perspective. From there, I gained a clear understanding of how to learn new technologies, how to think like a developer, and how to stay motivated throughout a project.",
      ],
      interests: [
        {
          iconName: "Code",
          title: "Web Developer",
          desc: "Building modern full-stack applications with clean and scalable code.",
          points: [
            "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
            "Firebase authentication (Email/Password + Google)",
            "Stripe payment integration",
            "Responsive UI with Tailwind CSS",
          ],
        },
        {
          iconName: "Heart",
          title: "Graphic Designer",
          desc: "Creating visually appealing and user-focused designs.",
          points: [
            "Social media design",
            "Branding and logo design",
            "T-shirt and motion graphics",
            "4+ years of hands-on experience",
          ],
        },
      ],
    },
  });

  const [activeSection, setActiveSection] = useState('basic');
  const [showPreview, setShowPreview] = useState(false);

  // Update basic fields
  const updateBasicField = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  // Update journey paragraphs
  const updateParagraph = (index, value) => {
    const newParagraphs = [...portfolioData.about.journeyParagraphs];
    newParagraphs[index] = value;
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, journeyParagraphs: newParagraphs }
    }));
  };

  const addParagraph = () => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        journeyParagraphs: [...prev.about.journeyParagraphs, "New paragraph content here..."]
      }
    }));
  };

  const removeParagraph = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        journeyParagraphs: prev.about.journeyParagraphs.filter((_, i) => i !== index)
      }
    }));
  };

  // Update interests
  const updateInterest = (index, field, value) => {
    const newInterests = [...portfolioData.about.interests];
    newInterests[index] = { ...newInterests[index], [field]: value };
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, interests: newInterests }
    }));
  };

  const addInterest = () => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        interests: [
          ...prev.about.interests,
          {
            iconName: "User",
            title: "New Interest",
            desc: "Description here",
            points: ["Point 1"]
          }
        ]
      }
    }));
  };

  const removeInterest = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        interests: prev.about.interests.filter((_, i) => i !== index)
      }
    }));
  };

  // Update interest points
  const updatePoint = (interestIndex, pointIndex, value) => {
    const newInterests = [...portfolioData.about.interests];
    newInterests[interestIndex].points[pointIndex] = value;
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, interests: newInterests }
    }));
  };

  const addPoint = (interestIndex) => {
    const newInterests = [...portfolioData.about.interests];
    newInterests[interestIndex].points.push("New point");
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, interests: newInterests }
    }));
  };

  const removePoint = (interestIndex, pointIndex) => {
    const newInterests = [...portfolioData.about.interests];
    newInterests[interestIndex].points = newInterests[interestIndex].points.filter((_, i) => i !== pointIndex);
    setPortfolioData(prev => ({
      ...prev,
      about: { ...prev.about, interests: newInterests }
    }));
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    console.log('About Me Data:', dataStr);
    alert('Data saved! Check console for export code.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">About Me Editor</h1>
            <p className="text-purple-100">Manage your about section content with ease</p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 p-4 bg-black/20 border-b border-white/10">
            <button
              onClick={() => setActiveSection('basic')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'basic'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveSection('journey')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'journey'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Journey
            </button>
            <button
              onClick={() => setActiveSection('interests')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'interests'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Interests
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
            {/* Basic Info Section */}
            {activeSection === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Heading</label>
                  <input
                    type="text"
                    value={portfolioData.about.heading}
                    onChange={(e) => updateBasicField('heading', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={portfolioData.about.subtitle}
                    onChange={(e) => updateBasicField('subtitle', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Journey Title</label>
                  <input
                    type="text"
                    value={portfolioData.about.journeyTitle}
                    onChange={(e) => updateBasicField('journeyTitle', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Journey Section */}
            {activeSection === 'journey' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white font-medium">Journey Paragraphs</label>
                  <button
                    onClick={addParagraph}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Paragraph
                  </button>
                </div>
                <div className="space-y-4">
                  {portfolioData.about.journeyParagraphs.map((para, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white/70 text-sm">Paragraph {index + 1}</label>
                        <button
                          onClick={() => removeParagraph(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={para}
                        onChange={(e) => updateParagraph(index, e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests Section */}
            {activeSection === 'interests' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white font-medium">Interest Cards</label>
                  <button
                    onClick={addInterest}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Interest
                  </button>
                </div>
                <div className="space-y-6">
                  {portfolioData.about.interests.map((interest, index) => (
                    <div key={index} className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white">
                            {getIcon(interest.iconName)}
                          </div>
                          <label className="text-white font-medium">Interest {index + 1}</label>
                        </div>
                        <button
                          onClick={() => removeInterest(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">Icon</label>
                          <select
                            value={interest.iconName}
                            onChange={(e) => updateInterest(index, 'iconName', e.target.value)}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="Code">Code</option>
                            <option value="Heart">Heart</option>
                            <option value="User">User</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-white/70 text-sm mb-2">Title</label>
                          <input
                            type="text"
                            value={interest.title}
                            onChange={(e) => updateInterest(index, 'title', e.target.value)}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-white/70 text-sm mb-2">Description</label>
                          <textarea
                            value={interest.desc}
                            onChange={(e) => updateInterest(index, 'desc', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-white/70 text-sm">Points</label>
                            <button
                              onClick={() => addPoint(index)}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center gap-1 transition-all"
                            >
                              <Plus className="w-3 h-3" /> Add Point
                            </button>
                          </div>
                          <div className="space-y-2">
                            {interest.points.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={point}
                                  onChange={(e) => updatePoint(index, pointIndex, e.target.value)}
                                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                  onClick={() => removePoint(index, pointIndex)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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