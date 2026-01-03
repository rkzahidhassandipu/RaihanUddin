"use client";
import React, { useEffect, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useHero } from "../../../hooks/useHero";
import { HeroData } from "../../../types/dataTypes";

export default function ProjectsEditor() {
  const { data: fetchedData, loading, error, updateHero } = useHero();

  const [portfolioData, setPortfolioData] = useState<HeroData | null>(null);
  const [activeSection, setActiveSection] = useState<"header" | "projects">(
    "header"
  );
  const [selectedProject, setSelectedProject] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (fetchedData) {
      setPortfolioData(fetchedData);
    }
  }, [fetchedData]);

  if (!mounted) return null;

  // --- Helper Logic ---

  const addProject = () => {
    if (!portfolioData) return;
    const newProject: Project = {
      title: "New Project",
      company: "Company Name",
      location: "Remote",
      duration: "2024 - Present",
      type: "Full-stack",
      description: "Project Description",
      achievements: ["Initial Achievement"],
      technologies: ["React"],
      links: { live: "", github: "" },
      images: [],
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPortfolioData({
      ...portfolioData,
      projects: {
        ...portfolioData.projects,
        list: [...portfolioData.projects.list, newProject],
      },
    });
    setSelectedProject(portfolioData.projects.list.length);
  };

  const removeProject = (index: number) => {
    if (!portfolioData) return;
    const newList = portfolioData.projects.list.filter((_, i) => i !== index);
    setPortfolioData({
      ...portfolioData,
      projects: { ...portfolioData.projects, list: newList },
    });
    if (selectedProject >= newList.length)
      setSelectedProject(Math.max(0, newList.length - 1));
  };

  const updateHeaderField = (field: "title" | "subtitle", value: string) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      projects: { ...portfolioData.projects, [field]: value },
    });
  };

  const updateProjectField = (index: number, field: string, value: any) => {
    if (!portfolioData) return;
    const newList = [...portfolioData.projects.list];
    newList[index] = { ...newList[index], [field]: value };
    setPortfolioData({
      ...portfolioData,
      projects: { ...portfolioData.projects, list: newList },
    });
  };

  // --- Array & Nested Object Handlers ---

  const handleArrayUpdate = (
    projectIdx: number,
    field: "achievements" | "technologies" | "images",
    action: "add" | "remove" | "update",
    itemIdx?: number,
    value?: string
  ) => {
    if (!portfolioData) return;
    const newList = [...portfolioData.projects.list];
    const targetProject = { ...newList[projectIdx] };
    const targetArray = [...targetProject[field]];

    if (action === "add") targetArray.push("");
    if (action === "remove" && itemIdx !== undefined)
      targetArray.splice(itemIdx, 1);
    if (action === "update" && itemIdx !== undefined && value !== undefined)
      targetArray[itemIdx] = value;

    targetProject[field] = targetArray as any;
    newList[projectIdx] = targetProject;
    setPortfolioData({
      ...portfolioData,
      projects: { ...portfolioData.projects, list: newList },
    });
  };

  const updateProjectLink = (
    index: number,
    type: "live" | "github",
    value: string
  ) => {
    if (!portfolioData) return;
    const newList = [...portfolioData.projects.list];
    newList[index] = {
      ...newList[index],
      links: { ...newList[index].links, [type]: value },
    };
    setPortfolioData({
      ...portfolioData,
      projects: { ...portfolioData.projects, list: newList },
    });
  };

  const handleSave = async () => {
    if (!portfolioData) return;
    setIsSaving(true);
    try {
      await updateHero(portfolioData);
      alert("✅ Database updated successfully!");
    } catch (err: any) {
      alert("❌ Failed to update database!");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center text-white">Loading...</div>;
  if (error)
    return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  if (!portfolioData) return null;

  const currentProject = portfolioData.projects.list[selectedProject];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Projects Editor
            </h1>
            <p className="text-purple-100">
              Manage your project portfolio with ease
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 p-4 bg-black/20 border-b border-white/10 flex-wrap">
            <button
              onClick={() => setActiveSection("header")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === "header"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Header Info
            </button>
            <button
              onClick={() => setActiveSection("projects")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeSection === "projects"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {/* এখানে experiences এর বদলে projects.list ব্যবহার করা হয়েছে */}
              Projects ({portfolioData?.projects?.list?.length || 0})
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="ml-auto px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {showPreview ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              {showPreview ? "Hide" : "Show"} Preview
            </button>
          </div>

          <div className="p-6">
            {/* Header Section */}
            {activeSection === "header" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={portfolioData?.projects?.title || ""}
                    onChange={(e) => updateHeaderField("title", e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Subtitle
                  </label>
                  <textarea
                    value={portfolioData?.projects?.subtitle || ""}
                    onChange={(e) =>
                      updateHeaderField("subtitle", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Projects Section */}
            {activeSection === "projects" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white font-medium">
                    Manage Projects
                  </label>
                  <button
                    onClick={addProject}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                </div>

                {/* Project Selector */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                  {portfolioData.projects.list.map((project, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedProject(index)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        selectedProject === index
                          ? "bg-purple-600 text-white shadow-lg"
                          : "bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="font-medium truncate">
                        {project.title}
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {project.type}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Current Project Editor */}
                {currentProject && (
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-6 h-6" />
                        Editing: {currentProject.title}
                      </h3>
                      <button
                        onClick={() => removeProject(selectedProject)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-all"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Project
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={currentProject.title}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "title",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            Company/System
                          </label>
                          <input
                            type="text"
                            value={currentProject.company}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "company",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            Location
                          </label>
                          <input
                            type="text"
                            value={currentProject.location}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "location",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Duration
                          </label>
                          <input
                            type="text"
                            value={currentProject.duration}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "duration",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            Type
                          </label>
                          <input
                            type="text"
                            value={currentProject.type}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "type",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            Created At
                          </label>
                          <input
                            type="text"
                            value={currentProject.createdAt}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "createdAt",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            Updated At
                          </label>
                          <input
                            type="text"
                            value={currentProject.updatedAt}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "updatedAt",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            Status
                          </label>
                          <select
                            value={currentProject.status}
                            onChange={(e) =>
                              updateProjectField(
                                selectedProject,
                                "status",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/70 text-sm mb-2">
                          Description
                        </label>
                        <textarea
                          value={currentProject.description}
                          onChange={(e) =>
                            updateProjectField(
                              selectedProject,
                              "description",
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      {/* Achievements */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-white font-medium">
                            Achievements
                          </label>
                          <button
                            onClick={() => addAchievement(selectedProject)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center gap-1 transition-all"
                          >
                            <Plus className="w-3 h-3" /> Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {currentProject.achievements.map(
                            (achievement, idx) => (
                              <div key={idx} className="flex gap-2">
                                <input
                                  type="text"
                                  value={achievement}
                                  onChange={(e) =>
                                    updateAchievement(
                                      selectedProject,
                                      idx,
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                  onClick={() =>
                                    removeAchievement(selectedProject, idx)
                                  }
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-white font-medium">
                            Technologies
                          </label>
                          <button
                            onClick={() => addTechnology(selectedProject)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center gap-1 transition-all"
                          >
                            <Plus className="w-3 h-3" /> Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.technologies.map((tech, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1 bg-white/10 rounded-lg px-3 py-1 border border-white/20"
                            >
                              <input
                                type="text"
                                value={tech}
                                onChange={(e) =>
                                  updateTechnology(
                                    selectedProject,
                                    idx,
                                    e.target.value
                                  )
                                }
                                className="bg-transparent text-white text-sm w-24 focus:outline-none"
                              />
                              <button
                                onClick={() =>
                                  removeTechnology(selectedProject, idx)
                                }
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            <ExternalLink className="w-4 h-4 inline mr-1" />
                            Live URL
                          </label>
                          <input
                            type="url"
                            value={currentProject.links.live}
                            onChange={(e) =>
                              updateProjectLink(
                                selectedProject,
                                "live",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white/70 text-sm mb-2">
                            <ExternalLink className="w-4 h-4 inline mr-1" />
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={currentProject.links.github}
                            onChange={(e) =>
                              updateProjectLink(
                                selectedProject,
                                "github",
                                e.target.value
                              )
                            }
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      {/* Images */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-white font-medium">
                            Project Images
                          </label>
                          <button
                            onClick={() => addImage(selectedProject)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center gap-1 transition-all"
                          >
                            <Plus className="w-3 h-3" /> Add Image
                          </button>
                        </div>
                        <div className="space-y-3">
                          {currentProject.images.map((image, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                              <div className="flex-1">
                                <input
                                  type="url"
                                  value={image}
                                  onChange={(e) =>
                                    updateImage(
                                      selectedProject,
                                      idx,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Image URL"
                                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                                />
                                {image && (
                                  <img
                                    src={image}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border border-white/20"
                                    onError={(e) =>
                                      (e.target.style.display = "none")
                                    }
                                  />
                                )}
                              </div>
                              <button
                                onClick={() =>
                                  removeImage(selectedProject, idx)
                                }
                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all mt-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
