import React, { useState } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, MessageSquare, Image, Upload, Copy } from 'lucide-react';

export default function TestimonialsEditor() {
  const portfolioData = {
    testimonialsSection: {
      title: "Client Testimonials",
      subtitle: "Hear what my clients have to say about my work in web development and design projects.",
      images: [
        "https://i.postimg.cc/ncDBNTNc/1.jpg",
        "https://i.postimg.cc/SKy924RJ/2.jpg",
        "https://i.postimg.cc/JzCZ8ZW3/3.jpg",
        "https://i.postimg.cc/FKDL06kG/4.jpg",
        "https://i.postimg.cc/FRzJpxjv/5.jpg",
        "https://i.postimg.cc/W3yqHJnk/6.jpg",
      ]
    }
  };

  const [data, setData] = useState(portfolioData);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const updateHeaderField = (field, value) => {
    setData(prev => ({
      ...prev,
      testimonialsSection: { ...prev.testimonialsSection, [field]: value }
    }));
  };

  const updateImageUrl = (index, value) => {
    const newImages = [...data.testimonialsSection.images];
    newImages[index] = value;
    setData(prev => ({
      ...prev,
      testimonialsSection: { ...prev.testimonialsSection, images: newImages }
    }));
  };

  const addImage = () => {
    setData(prev => ({
      ...prev,
      testimonialsSection: {
        ...prev.testimonialsSection,
        images: [
          "https://i.postimg.cc/new-image.jpg",
          ...prev.testimonialsSection.images
        ]
      }
    }));
  };

  const removeImage = (index) => {
    setData(prev => ({
      ...prev,
      testimonialsSection: {
        ...prev.testimonialsSection,
        images: prev.testimonialsSection.images.filter((_, i) => i !== index)
      }
    }));
    if (selectedImage === index) setSelectedImage(null);
  };

  const duplicateImage = (index) => {
    const imageToDuplicate = data.testimonialsSection.images[index];
    setData(prev => ({
      ...prev,
      testimonialsSection: {
        ...prev.testimonialsSection,
        images: [...prev.testimonialsSection.images, imageToDuplicate]
      }
    }));
  };

  const bulkImport = () => {
    const imagesText = prompt('Paste image URLs (one per line):');
    if (imagesText) {
      const imageUrls = imagesText.split('\n').filter(url => url.trim());
      setData(prev => ({
        ...prev,
        testimonialsSection: {
          ...prev.testimonialsSection,
          images: [...imageUrls.map(url => url.trim()), ...prev.testimonialsSection.images]
        }
      }));
    }
  };

  const handleSave = () => {
    const dataStr = JSON.stringify(data, null, 2);
    console.log('Testimonials Data:', dataStr);
    alert('Data saved! Check console for export code.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Testimonials Editor</h1>
              <p className="text-purple-200">Manage your client testimonial images</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2 border border-white/20"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide' : 'Show'} JSON
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-all shadow-lg"
              >
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-purple-300">{data.testimonialsSection.images.length}</div>
              <div className="text-sm text-white/60">Total Testimonials</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-pink-300">
                {data.testimonialsSection.images.filter(img => img.includes('postimg.cc')).length}
              </div>
              <div className="text-sm text-white/60">PostImg Hosted</div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-blue-300">
                {data.testimonialsSection.images.filter(img => !img.includes('postimg.cc')).length}
              </div>
              <div className="text-sm text-white/60">External Hosted</div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Section Info & Gallery */}
          <div className="space-y-6">
            {/* Section Settings */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Section Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={data.testimonialsSection.title}
                    onChange={(e) => updateHeaderField('title', e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={data.testimonialsSection.subtitle}
                    onChange={(e) => updateHeaderField('subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Testimonials Gallery
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={addImage}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                  <button
                    onClick={bulkImport}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-all flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Bulk
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2">
                {data.testimonialsSection.images.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all group ${
                      selectedImage === index
                        ? 'border-purple-500 ring-2 ring-purple-500/50'
                        : 'border-white/20 hover:border-purple-400'
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Testimonial ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-white/10 items-center justify-center">
                      <Image className="w-8 h-8 text-white/30" />
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-medium">#{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Editor */}
          <div className="space-y-6">
            {selectedImage !== null ? (
              <>
                {/* Image Preview */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4">Testimonial #{selectedImage + 1}</h2>
                  <div className="aspect-video bg-white/5 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src={data.testimonialsSection.images[selectedImage]}
                      alt={`Testimonial ${selectedImage + 1}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                      <Image className="w-16 h-16 text-white/30" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">Image URL</label>
                      <input
                        type="url"
                        value={data.testimonialsSection.images[selectedImage]}
                        onChange={(e) => updateImageUrl(selectedImage, e.target.value)}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => duplicateImage(selectedImage)}
                        className="flex-1 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-all border border-blue-500/30 flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" /> Duplicate
                      </button>
                      <button
                        onClick={() => removeImage(selectedImage)}
                        className="flex-1 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-lg transition-all border border-red-500/30 flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                      <div className="text-xs text-white/60">
                        {data.testimonialsSection.images[selectedImage].includes('postimg.cc') ? (
                          <span className="text-green-400">✓ PostImg hosted</span>
                        ) : (
                          <span className="text-yellow-400">⚠ External host</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-3">💡 Quick Tips</h3>
                  <ul className="text-white/70 text-sm space-y-2">
                    <li>• Click thumbnails to select and edit</li>
                    <li>• Use high-quality screenshots for best results</li>
                    <li>• PostImg hosting is recommended for reliability</li>
                    <li>• Duplicate similar testimonials to save time</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-12 border border-white/10 h-full flex flex-col items-center justify-center text-center">
                <MessageSquare className="w-16 h-16 text-white/20 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select a Testimonial</h3>
                <p className="text-white/60">Click on any testimonial thumbnail to view and edit</p>
              </div>
            )}
          </div>
        </div>

        {/* JSON Preview */}
        {showPreview && (
          <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-bold mb-3">JSON Preview</h3>
            <pre className="text-green-400 text-xs overflow-auto max-h-96 bg-black/50 p-4 rounded-lg">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}