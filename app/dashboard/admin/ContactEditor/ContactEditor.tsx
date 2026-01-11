import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Mail, Phone, MessageCircle, MapPin, Edit2, Copy } from 'lucide-react';
import { useHero } from "../../../hooks/useHero"; 
import { PortfolioData } from "../../../types/dataTypes";

import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
};

export default function ContactEditor() {
  const { data: dbData, loading, updateHero } = useHero();

  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState('header');
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load data from database
  useEffect(() => {
    if (dbData) {
      setData({
        ...dbData,
        contact: {
          title: dbData.contact?.title || { first: "Get in", second: "Touch" },
          subtitle: dbData.contact?.subtitle || 
            "Have a project idea or want to collaborate? Feel free to reach out to me, and let's create something amazing together.",
          formAction: dbData.contact?.formAction || "https://formspree.io/f/xknldwlr",
          info: dbData.contact?.info || [],
          formFields: dbData.contact?.formFields || {
            name: "Your Name",
            email: "Email Address",
            subject: "Subject",
            message: "Type your message...",
            buttonText: "Send Message",
          },
        },
      });
      
      console.log("✅ Contact data loaded:", dbData.contact);
    }
  }, [dbData]);

  if (!mounted || loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-10">
        <div className="animate-pulse text-xl">Loading Contact Editor...</div>
      </div>
    );
  }

  const contactData = data.contact;

  const updateHeaderField = (field: string, value: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: { ...prev.contact, [field]: value }
      };
    });
  };

  
  const updateTitleField = (field: string, value: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          title: { ...prev.contact.title, [field]: value }
        }
      };
    });
  };

  const updateFormField = (field: string, value: string) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          formFields: { ...prev.contact.formFields, [field]: value }
        }
      };
    });
  };

  const updateInfoItem = (index: number, field: string, value: string) => {
    setData(prev => {
      if (!prev) return prev;
      const newInfo = [...prev.contact.info];
      newInfo[index] = { ...newInfo[index], [field]: value };
      return {
        ...prev,
        contact: { ...prev.contact, info: newInfo }
      };
    });
  };

  const addContactInfo = () => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          info: [
            ...prev.contact.info,
            {
              icon: "FaEnvelope",
              label: "New Contact",
              value: "contact@example.com",
              subtitle: "Description here",
            }
          ]
        }
      };
    });
  };

  const removeContactInfo = (index: number) => {
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        contact: {
          ...prev.contact,
          info: prev.contact.info.filter((_, i) => i !== index)
        }
      };
    });
  };

  const duplicateContactInfo = (index: number) => {
    setData(prev => {
      if (!prev) return prev;
      const itemToDuplicate = { ...prev.contact.info[index] };
      return {
        ...prev,
        contact: {
          ...prev.contact,
          info: [...prev.contact.info, { ...itemToDuplicate, label: `${itemToDuplicate.label} (Copy)` }]
        }
      };
    });
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      console.log("💾 Saving contact data:", data.contact);
      await updateHero(data);
      alert('Contact data updated successfully!');
    } catch (error) {
      console.error("❌ Save error:", error);
      alert('Error saving contact data!');
    }
  };

  const availableIcons = [
    { value: 'FaEnvelope', label: 'Email', Icon: Mail },
    { value: 'FaPhoneAlt', label: 'Phone', Icon: Phone },
    { value: 'FaWhatsapp', label: 'WhatsApp', Icon: MessageCircle },
    { value: 'FaMapMarkerAlt', label: 'Location', Icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">Contact Editor</h1>
            <p className="text-purple-100">Manage your contact information and form settings</p>
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
              Header & Form
            </button>
            <button
              onClick={() => setActiveSection('contact')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === 'contact'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              Contact Info ({contactData.info.length})
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
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">Page Title</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 font-medium mb-2 text-sm">First Part</label>
                      <input
                        type="text"
                        value={contactData.title.first}
                        onChange={(e) => updateTitleField('first', e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-medium mb-2 text-sm">Second Part (Highlighted)</label>
                      <input
                        type="text"
                        value={contactData.title.second}
                        onChange={(e) => updateTitleField('second', e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Subtitle</label>
                  <textarea
                    value={contactData.subtitle}
                    onChange={(e) => updateHeaderField('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <Edit2 className="w-5 h-5" />
                    Quick Stats
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white/80">
                    <div>
                      <div className="text-2xl font-bold text-purple-300">{contactData.info.length}</div>
                      <div className="text-sm">Contact Methods</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-pink-300">
                        {Object.keys(contactData.formFields).length}
                      </div>
                      <div className="text-sm">Form Fields</div>
                    </div>                    <div>
                      <div className="text-2xl font-bold text-blue-300">
                        {contactData.title.first.length + contactData.title.second.length}
                      </div>
                      <div className="text-sm">Title Characters</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'contact' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-white/20 rounded-xl p-4">
                  <button
                    onClick={addContactInfo}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" /> Add New Contact Info
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactData.info.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                      <div
                        key={index}
                        className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <select
                              value={item.icon}
                              onChange={(e) => updateInfoItem(index, 'icon', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              {availableIcons.map(icon => (
                                <option key={icon.value} value={icon.value}>{icon.label}</option>
                              ))}
                            </select>
                            
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => updateInfoItem(index, 'label', e.target.value)}
                              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-medium placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Label (e.g., Email)"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => updateInfoItem(index, 'value', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Value (e.g., email@example.com)"
                          />
                          
                          <input
                            type="text"
                            value={item.subtitle}
                            onChange={(e) => updateInfoItem(index, 'subtitle', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-xs placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Subtitle (e.g., Send me an email anytime)"
                          />
                        </div>

                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => duplicateContactInfo(index)}
                            className="flex-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs rounded-lg transition-all border border-blue-500/30 flex items-center justify-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> Duplicate
                          </button>
                          <button
                            onClick={() => removeContactInfo(index)}
                            className="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs rounded-lg transition-all border border-red-500/30 flex items-center justify-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">💡 Pro Tips:</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Use consistent icons for similar contact methods</li>
                    <li>• Keep subtitles short and informative</li>
                    <li>• Test your Formspree URL before going live</li>
                    <li>• Add your most important contact method first</li>
                  </ul>
                </div>
              </div>
            )}

            {showPreview && (
              <div className="mt-6 p-4 bg-black/30 rounded-lg border border-white/20">
                <h3 className="text-white font-bold mb-3">Preview JSON:</h3>
                <pre className="text-green-400 text-sm overflow-auto max-h-96 bg-black/50 p-4 rounded">
                  {JSON.stringify(data.contact, null, 2)}
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