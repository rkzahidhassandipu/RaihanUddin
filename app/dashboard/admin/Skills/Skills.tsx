import React, { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Code2, Image } from 'lucide-react';
import { useHero } from '../../../hooks/useHero';
import { PortfolioData, Skills, SkillItem } from '../../../types/dataTypes';

 type SkillsProps = {
    skills: Skills; 
  };

export default function SkillsEditor({ skills }: SkillsProps) {
  const { data, loading, error, updateHero } = useHero(); 
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);

  const [activeSection, setActiveSection] = useState<'header' | 'skills'>('header');
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    setImageErrors(new Set());
  }, [portfolioData?.skills?.items]);

  useEffect(() => {
    if (data) setPortfolioData(data);
  }, [data]);

  if (loading || !portfolioData) {
    return <div className="text-white text-center p-10">Loading Dynamic Data...</div>;
  }

  if (error) {
    return <div className="text-red-400 text-center p-10">Error loading data!</div>;
  }

  const updateHeaderField = (index: number, field: keyof SkillItem, value: string) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      skills: { ...prev!.skills, [field]: value }
    }));
  };

  const updateSkillItem = (index: number, field: keyof SkillItem, value: string) => {
    if (!portfolioData) return;
    const newItems = [...portfolioData.skills.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setPortfolioData(prev => ({
      ...prev!,
      skills: { ...prev!.skills, items: newItems }
    }));
  };

  const addSkill = () => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      skills: {
        ...prev!.skills,
        items: [
          { name: 'New Skill', icon: 'https://skillicons.dev/icons?i=vscode' },
          ...prev!.skills.items
        ]
      }
    }));
  };

  const removeSkill = (index: number) => {
    if (!portfolioData) return;
    setPortfolioData(prev => ({
      ...prev!,
      skills: {
        ...prev!.skills,
        items: prev!.skills.items.filter((_: SkillItem, i: number) => i !== index)
      }
    }));
  };

  const duplicateSkill = (index: number) => {
    if (!portfolioData) return;
    const skillToDuplicate = { ...portfolioData.skills.items[index] };
    setPortfolioData(prev => ({
      ...prev!,
      skills: {
        ...prev!.skills,
        items: [...prev!.skills.items, { ...skillToDuplicate, name: `${skillToDuplicate.name} (Copy)` }]
      }
    }));
  };

  const bulkImport = () => {
    if (!portfolioData) return;
    const skillsText = prompt('Paste skill names (one per line):');
    if (!skillsText) return;

    const skillNames = skillsText.split('\n').filter(name => name.trim());
    const newSkills: SkillItem[] = skillNames.map(name => ({
      name: name.trim(),
      icon: `https://skillicons.dev/icons?i=${name.trim().toLowerCase()}`
    }));

    setPortfolioData(prev => ({
      ...prev!,
      skills: {
        ...prev!.skills,
        items: [...newSkills, ...prev!.skills.items]
      }
    }));
  };

  const handleSave = async () => {
    if (!portfolioData) return;
    try {
      await updateHero(portfolioData);
      alert('Data updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save data.');
    }
  };

  const filteredSkills = portfolioData.skills.items.filter((skill: SkillItem) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header, buttons, and other UI remain unchanged */}
        {/* Skills list mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {(searchTerm ? filteredSkills : portfolioData.skills.items).map(
  (skill: SkillItem, index: number) => {
    const actualIndex: number = portfolioData.skills.items.findIndex(
      (s: SkillItem) => s === skill
    );

    return (
      <div
        key={actualIndex}
        className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
      >
        {/* Skill icon */}
        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
          {skill.icon && !imageErrors.has(actualIndex) ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-12 h-12 object-contain"
              onError={() => setImageErrors(prev => new Set(prev).add(actualIndex))}
            />
          ) : (
            <Image className="w-8 h-8 text-white/30" />
          )}
        </div>

        {/* Inputs */}
        <input
          type="text"
          value={skill.name}
          onChange={(e) => updateSkillItem(actualIndex, 'name', e.target.value)}
        />
        <input
          type="url"
          value={skill.icon}
          onChange={(e) => updateSkillItem(actualIndex, 'icon', e.target.value)}
        />

        {/* Action buttons */}
        <button onClick={() => duplicateSkill(actualIndex)}>Duplicate</button>
        <button onClick={() => removeSkill(actualIndex)}>Delete</button>
      </div>
    );
  }
)}

        </div>
      </div>
    </div>
  );
}
