import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { TeamMember, crudOperations } from '../../lib/supabase';

const TeamManager = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    specialty: '',
    image: '',
    bio: '',
    skills: [],
    social: { github: '', linkedin: '', twitter: '' },
    icon: '',
    color: ''
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setIsLoading(true);
    const { data, error } = await crudOperations.teamMembers.getAll();
    if (data && !error) {
      setTeamMembers(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (editingId) {
      const { data, error } = await crudOperations.teamMembers.update(editingId, formData);
      if (data && !error) {
        setTeamMembers(prev => prev.map(item => item.id === editingId ? data[0] : item));
        setEditingId(null);
      }
    } else {
      const { data, error } = await crudOperations.teamMembers.create(formData as Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>);
      if (data && !error) {
        setTeamMembers(prev => [data[0], ...prev]);
        setShowAddForm(false);
      }
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      const { error } = await crudOperations.teamMembers.delete(id);
      if (!error) {
        setTeamMembers(prev => prev.filter(item => item.id !== id));
      }
    }
  };

  const startEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData(member);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      specialty: '',
      image: '',
      bio: '',
      skills: [],
      social: { github: '', linkedin: '', twitter: '' },
      icon: '',
      color: ''
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSkillsChange = (skills: string) => {
    setFormData(prev => ({
      ...prev,
      skills: skills.split(',').map(s => s.trim()).filter(s => s)
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
        <h2 className="text-2xl font-bold text-white font-mono">Team Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-cyber flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4 font-mono">Add New Team Member</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.role || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Specialty"
              value={formData.specialty || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Icon (e.g., Brain, Shield)"
              value={formData.icon || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <input
            type="url"
            placeholder="Image URL"
            value={formData.image || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Color (e.g., from-cyan-400 to-blue-500)"
            value={formData.color || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <textarea
            placeholder="Bio"
            value={formData.bio || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            rows={3}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            value={formData.skills?.join(', ') || ''}
            onChange={(e) => handleSkillsChange(e.target.value)}
            className="w-full mt-4 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
          />
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <input
              type="url"
              placeholder="GitHub URL"
              value={formData.social?.github || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                social: { ...prev.social, github: e.target.value } 
              }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={formData.social?.linkedin || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                social: { ...prev.social, linkedin: e.target.value } 
              }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="url"
              placeholder="Twitter URL"
              value={formData.social?.twitter || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                social: { ...prev.social, twitter: e.target.value } 
              }))}
              className="bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
            />
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

      {/* Team Members List */}
      <div className="grid md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
            {editingId === member.id ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.role || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                />
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
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
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                      <p className="text-purple-400 text-sm">{member.role}</p>
                      <p className="text-gray-400 text-sm">{member.specialty}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(member)}
                      className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 4 && (
                    <span className="text-gray-400 text-xs px-2 py-1">
                      +{member.skills.length - 4} more
                    </span>
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

export default TeamManager;