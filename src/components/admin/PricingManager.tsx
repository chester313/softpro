import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Crown } from 'lucide-react';
import { PricingPlan, crudOperations } from '../../lib/supabase';

const PricingManager = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<PricingPlan>>({
    name: '',
    description: '',
    icon: '',
    color: '',
    glow_color: '',
    popular: false,
    monthly_price: 0,
    annual_price: 0,
    features: [],
    limitations: []
  });

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const loadPricingPlans = async () => {
    setIsLoading(true);
    const { data, error } = await crudOperations.pricingPlans.getAll();
    if (data && !error) {
      setPricingPlans(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (editingId) {
      const { data, error } = await crudOperations.pricingPlans.update(editingId, formData);
      if (data && !error) {
        setPricingPlans(prev => prev.map(item => item.id === editingId ? data[0] : item));
        setEditingId(null);
      }
    } else {
      const { data, error } = await crudOperations.pricingPlans.create(formData as Omit<PricingPlan, 'id' | 'created_at' | 'updated_at'>);
      if (data && !error) {
        setPricingPlans(prev => [data[0], ...prev]);
        setShowAddForm(false);
      }
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this pricing plan?')) {
      const { error } = await crudOperations.pricingPlans.delete(id);
      if (!error) {
        setPricingPlans(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const startEdit = (plan: PricingPlan) => {
    setEditingId(plan.id);
    setFormData(plan);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '',
      color: '',
      glow_color: '',
      popular: false,
      monthly_price: 0,
      annual_price: 0,
      features: [],
      limitations: []
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleFeaturesChange = (features: string) => {
    setFormData(prev => ({
      ...prev,
      features: features.split(',').map(f => f.trim()).filter(f => f)
    }));
  };

  const handleLimitationsChange = (limitations: string) => {
    setFormData(prev => ({
      ...prev,
      limitations: limitations.split(',').map(l => l.trim()).filter(l => l)
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
        <h2 className="text-2xl font-bold text-white font-mono">Pricing Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-cyber flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Plan</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono">Add New Pricing Plan</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Plan Name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Icon (e.g., Zap, Crown, Rocket)"
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
            <input
              type="number"
              placeholder="Monthly Price"
              value={formData.monthly_price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, monthly_price: parseInt(e.target.value) || 0 }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Annual Price"
              value={formData.annual_price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, annual_price: parseInt(e.target.value) || 0 }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={2}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
          />
          <input
            type="text"
            placeholder="Features (comma separated)"
            value={formData.features?.join(', ') || ''}
            onChange={(e) => handleFeaturesChange(e.target.value)}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Limitations (comma separated)"
            value={formData.limitations?.join(', ') || ''}
            onChange={(e) => handleLimitationsChange(e.target.value)}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <div className="flex items-center space-x-3 mt-4">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular || false}
              onChange={(e) => setFormData(prev => ({ ...prev, popular: e.target.checked }))}
              className="w-4 h-4 text-cyan-400 bg-black border-gray-700 rounded focus:ring-cyan-400"
            />
            <label htmlFor="popular" className="text-white font-medium">
              Mark as Popular Plan
            </label>
          </div>
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

      {/* Pricing Plans List */}
      <div className="grid lg:grid-cols-2 gap-6">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="bg-gray-900/30 rounded-xl p-6 border border-gray-800 relative">
            {plan.popular && (
              <div className="absolute -top-3 left-6">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Crown className="w-4 h-4" />
                  <span>POPULAR</span>
                </div>
              </div>
            )}
            
            {editingId === plan.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={formData.monthly_price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthly_price: parseInt(e.target.value) || 0 }))}
                    className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={formData.annual_price || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, annual_price: parseInt(e.target.value) || 0 }))}
                    className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
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
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-3">{plan.description}</p>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-2xl font-bold text-cyan-400">${plan.monthly_price}</span>
                      <span className="text-gray-400">/month</span>
                      <span className="text-sm text-gray-500">
                        (${plan.annual_price}/year)
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(plan)}
                      className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium mb-2">Features:</h4>
                    <div className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <div className="text-gray-400 text-sm">
                          +{plan.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="text-white font-medium mb-2">Limitations:</h4>
                      <div className="space-y-1">
                        {plan.limitations.slice(0, 2).map((limitation, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span className="text-gray-400 text-sm">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingManager;