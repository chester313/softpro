import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Service, crudOperations } from '../../lib/supabase';

const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({
    title: '',
    description: '',
    features: [],
    icon: '',
    color: '',
    glow_color: ''
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    const { data, error } = await crudOperations.services.getAll();
    if (data && !error) {
      setServices(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (editingId) {
      const { data, error } = await crudOperations.services.update(editingId, formData);
      if (data && !error) {
        setServices(prev => prev.map(item => item.id === editingId ? data[0] : item));
        setEditingId(null);
      }
    } else {
      const { data, error } = await crudOperations.services.create(formData as Omit<Service, 'id' | 'created_at' | 'updated_at'>);
      if (data && !error) {
        setServices(prev => [data[0], ...prev]);
        setShowAddForm(false);
      }
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const { error } = await crudOperations.services.delete(id);
      if (!error) {
        setServices(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      features: [],
      icon: '',
      color: '',
      glow_color: ''
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleFeatureChange = (features: string) => {
    setFormData(prev => ({
      ...prev,
      features: features.split(',').map(f => f.trim()).filter(f => f)
    }));
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
        <h2 className="text-2xl font-bold text-white font-mono">Services Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-cyber flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono">Add New Service</h3>
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
              placeholder="Icon (e.g., Brain, Smartphone)"
              value={formData.icon || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Color (e.g., from-cyan-400 to-blue-500)"
              value={formData.color || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Glow Color (e.g., shadow-cyan-500/20)"
              value={formData.glow_color || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, glow_color: e.target.value }))}
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
            type="text"
            placeholder="Features (comma separated)"
            value={formData.features?.join(', ') || ''}
            onChange={(e) => handleFeatureChange(e.target.value)}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
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

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            {editingId === service.id ? (
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
                    value={formData.icon || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
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
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => startEdit(service)}
                    className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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

export default ServicesManager;