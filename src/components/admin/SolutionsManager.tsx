import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Solution, crudOperations } from '../../lib/supabase';

const SolutionsManager = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Solution>>({
    title: '',
    category: '',
    description: '',
    image: '',
    tags: [],
    metrics: {}
  });

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    setIsLoading(true);
    const { data, error } = await crudOperations.solutions.getAll();
    if (data && !error) {
      setSolutions(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (editingId) {
      const { data, error } = await crudOperations.solutions.update(editingId, formData);
      if (data && !error) {
        setSolutions(prev => prev.map(item => item.id === editingId ? data[0] : item));
        setEditingId(null);
      }
    } else {
      const { data, error } = await crudOperations.solutions.create(formData as Omit<Solution, 'id' | 'created_at' | 'updated_at'>);
      if (data && !error) {
        setSolutions(prev => [data[0], ...prev]);
        setShowAddForm(false);
      }
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this solution?')) {
      const { error } = await crudOperations.solutions.delete(id);
      if (!error) {
        setSolutions(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const startEdit = (solution: Solution) => {
    setEditingId(solution.id);
    setFormData(solution);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      tags: [],
      metrics: {}
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleTagsChange = (tags: string) => {
    setFormData(prev => ({
      ...prev,
      tags: tags.split(',').map(t => t.trim()).filter(t => t)
    }));
  };

  const handleMetricsChange = (metrics: string) => {
    try {
      const parsed = JSON.parse(metrics);
      setFormData(prev => ({ ...prev, metrics: parsed }));
    } catch {
      // Invalid JSON, ignore
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white font-mono">Solutions Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-cyber flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Solution</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono">Add New Solution</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) => handleTagsChange(e.target.value)}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <textarea
            placeholder='Metrics (JSON format, e.g., {"performance": "300%", "efficiency": "85%"})'
            value={JSON.stringify(formData.metrics || {}, null, 2)}
            onChange={(e) => handleMetricsChange(e.target.value)}
            rows={3}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none font-mono text-sm"
          />
          <div className="flex space-x-4 mt-4">
            <button onClick={handleSave} className="btn-cyber flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button onClick={resetForm} className="btn-cyber-secondary flex items-center space-x-2">
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Solutions List */}
      <div className="space-y-4">
        {solutions.map((solution) => (
          <div key={solution.id} className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            {editingId === solution.id ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none resize-none"
                />
                <div className="flex space-x-4">
                  <button onClick={handleSave} className="btn-cyber flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button onClick={resetForm} className="btn-cyber-secondary flex items-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
                    <span className="bg-purple-400/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                      {solution.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{solution.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {solution.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4 text-sm">
                    {Object.entries(solution.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-cyan-400 font-bold">{value}</div>
                        <div className="text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => startEdit(solution)}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(solution.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsManager;