import React, { useEffect, useState } from "react";
import {
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  MessageSquare,
  Image as ImageIcon,
  Upload,
  Copy,
} from "lucide-react";
import { useHero } from "../../../hooks/useHero"; 
import { PortfolioData } from "../../../types/dataTypes";

export default function TestimonialsEditor() {
  const { data: dbData, loading, updateHero } = useHero();

  const [data, setData] = useState<PortfolioData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (dbData) {
      // Database e "testimonials" name e ase, "testimonialsSection" na
      const testimonials = dbData.testimonials || dbData.testimonialsSection;
      
      const imagesArray = Array.isArray(testimonials?.images) 
        ? testimonials.images 
        : [];
      
      setData({
        ...dbData,
        testimonials: {
          title: testimonials?.title || "Client Testimonials",
          subtitle: testimonials?.subtitle || 
            "Hear what my clients have to say about my work in web development and design projects.",
          images: imagesArray,
        },
      });

      console.log("✅ Images loaded:", imagesArray.length);
    }
  }, [dbData]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white p-10">
        <div className="animate-pulse text-xl">Loading Testimonials...</div>
      </div>
    );
  }

  // "testimonials" field use koro
  const testimonials = Array.isArray(data?.testimonials?.images) 
    ? data.testimonials.images 
    : [];

  const updateHeaderField = (field: string, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        testimonials: { 
          ...prev.testimonials, 
          [field]: value 
        },
      };
    });
  };

  const updateImageUrl = (index: number, value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const currentImages = Array.isArray(prev.testimonials?.images) 
        ? [...prev.testimonials.images] 
        : [];
      
      currentImages[index] = value;
      
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          images: currentImages,
        },
      };
    });
  };

  const addImage = () => {
    setData((prev) => {
      if (!prev) return prev;
      const currentImages = Array.isArray(prev.testimonials?.images) 
        ? prev.testimonials.images 
        : [];
      
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          images: ["https://i.postimg.cc/new-image.jpg", ...currentImages],
        },
      };
    });
    setSelectedImage(0);
  };

  const removeImage = (index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const currentImages = Array.isArray(prev.testimonials?.images) 
        ? prev.testimonials.images 
        : [];
      
      const newImages = currentImages.filter((_, i) => i !== index);
      
      return {
        ...prev,
        testimonials: { 
          ...prev.testimonials, 
          images: newImages 
        },
      };
    });
    
    if (selectedImage === index) setSelectedImage(null);
  };

  const duplicateImage = (index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      const currentImages = Array.isArray(prev.testimonials?.images) 
        ? prev.testimonials.images 
        : [];
      
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          images: [...currentImages, currentImages[index]],
        },
      };
    });
  };

  const bulkImport = () => {
    const imagesText = prompt("Paste image URLs (one per line):");
    if (!imagesText) return;

    const imageUrls = imagesText
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    setData((prev) => {
      if (!prev) return prev;
      const currentImages = Array.isArray(prev.testimonials?.images) 
        ? prev.testimonials.images 
        : [];
      
      return {
        ...prev,
        testimonials: {
          ...prev.testimonials,
          images: [...imageUrls, ...currentImages],
        },
      };
    });
  };

  const handleSave = async () => {
    if (!data) return;
    try {
      await updateHero(data);
      alert("Testimonials updated successfully!");
    } catch (error) {
      console.error("❌ Save error:", error);
      alert("Error saving data!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Testimonials Editor</h1>
              <p className="text-purple-200">Manage your client feedback images</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2 border border-white/20"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Hide" : "Show"} JSON
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-purple-300">{testimonials.length}</div>
              <div className="text-sm text-white/60">Total Testimonials</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-pink-300">
                {testimonials.filter(img => img.includes("postimg.cc")).length}
              </div>
              <div className="text-sm text-white/60">PostImg Hosted</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-blue-300">
                {testimonials.filter(img => !img.includes("postimg.cc")).length}
              </div>
              <div className="text-sm text-white/60">External Hosted</div>
            </div>
          </div>
        </div>

        {/* Editor Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {/* Text Config Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" /> Section Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={data.testimonials.title}
                    onChange={(e) => updateHeaderField("title", e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={data.testimonials.subtitle}
                    onChange={(e) => updateHeaderField("subtitle", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Grid Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" /> Image Gallery
                </h2>
                <div className="flex gap-2">
                  <button onClick={addImage} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-all flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add New
                  </button>
                  <button onClick={bulkImport} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-all flex items-center gap-1">
                    <Upload className="w-3 h-3" /> Bulk URL
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {testimonials.length === 0 ? (
                  <div className="col-span-3 text-center py-12">
                    <ImageIcon className="w-12 h-12 text-white/20 mx-auto mb-3" />
                    <p className="text-white/40 text-sm">No images yet. Click "Add New" to start!</p>
                  </div>
                ) : (
                  testimonials.map((imageUrl, index) => (
                    <button
                      key={`${imageUrl}-${index}`}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${
                        selectedImage === index ? "border-purple-500 ring-2 ring-purple-500/30" : "border-white/10 hover:border-purple-400"
                      }`}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`Testimonial ${index + 1}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23374151' width='400' height='400'/%3E%3Ctext fill='%23fff' font-family='Arial' font-size='14' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage Error%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold bg-purple-600 px-2 py-0.5 rounded-full">#{index + 1}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Active Item Detail */}
          <div className="space-y-6">
            {selectedImage !== null && testimonials[selectedImage] ? (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 sticky top-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Edit Item #{selectedImage + 1}</h2>
                  <button onClick={() => setSelectedImage(null)} className="text-white/40 hover:text-white">✕</button>
                </div>
                
                <div className="aspect-video bg-black/20 rounded-lg overflow-hidden mb-6 flex items-center justify-center border border-white/5">
                  <img 
                    src={testimonials[selectedImage]} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23374151' width='800' height='450'/%3E%3Ctext fill='%23fff' font-family='Arial' font-size='18' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage Load Error%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider font-bold mb-2">Image Source URL</label>
                    <input
                      type="url"
                      value={testimonials[selectedImage]}
                      onChange={(e) => updateImageUrl(selectedImage, e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => duplicateImage(selectedImage)} className="flex-1 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/20 text-sm flex items-center justify-center gap-2">
                      <Copy className="w-4 h-4" /> Duplicate
                    </button>
                    <button onClick={() => removeImage(selectedImage)} className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 text-sm flex items-center justify-center gap-2">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-12 border border-white/10 h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-white font-medium">No Image Selected</h3>
                <p className="text-white/40 text-sm max-w-[200px] mt-2">Select a thumbnail from the gallery to start editing</p>
              </div>
            )}
          </div>
        </div>

        {/* JSON Debug View */}
        {showPreview && (
          <div className="mt-8 bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-white/40">
              <span>LIVE DATA PREVIEW</span>
              <span>READ-ONLY</span>
            </div>
            <pre className="text-green-400 text-xs overflow-auto max-h-64 custom-scrollbar leading-relaxed">
              {JSON.stringify(data.testimonials, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}