import React from 'react';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Code, Brain, Shield, Zap, Users, Cpu, Database } from 'lucide-react';
import { TeamMember, crudOperations } from '../lib/supabase';

// Icon mapping
const iconMap: Record<string, any> = {
  Brain,
  Shield,
  Code,
  Zap,
  Users,
  Cpu,
  Database
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <section id="team" className="section-spacing bg-gray-900/30 relative">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="section-spacing bg-gray-900/30 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-mono text-sm">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <span>MEET THE ARCHITECTS</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
          <h2 className="section-heading">
            The Minds Behind
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Tomorrow's Technology
            </span>
          </h2>
          <p className="cyber-text max-w-3xl mx-auto">
            Our team of visionary engineers, researchers, and innovators brings together 
            decades of experience from leading tech companies and research institutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => {
            const IconComponent = iconMap[member.icon] || Brain;
            return (
            <div
              key={member.id}
              className="cyber-card group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Role Icon */}
                <div className={`absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r ${member.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Member Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 font-mono group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 font-medium text-sm mb-1">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {member.specialty}
                  </p>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-800/50 text-cyan-400 px-2 py-1 rounded-full border border-cyan-400/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex space-x-3 pt-4 border-t border-gray-800">
                  <a
                    href={member.social.github}
                    className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-gray-700 transition-all duration-300"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-4 gap-8 animate-fade-in-up">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 glow-text font-mono mb-2">50+</div>
            <div className="text-gray-400">Expert Engineers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 glow-text font-mono mb-2">15+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 glow-text font-mono mb-2">100+</div>
            <div className="text-gray-400">Patents Filed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 glow-text font-mono mb-2">24/7</div>
            <div className="text-gray-400">Global Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;