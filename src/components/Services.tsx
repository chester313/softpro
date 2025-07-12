import React from 'react';
import { useState, useEffect } from 'react';
import { Brain, Smartphone, Cloud, Shield, Database, Cpu, Zap, Code2, Users } from 'lucide-react';
import { Service, crudOperations } from '../lib/supabase';

// Icon mapping
const iconMap: Record<string, any> = {
  Brain,
  Smartphone,
  Cloud,
  Shield,
  Database,
  Cpu,
  Zap,
  Code2,
  Users
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <section id="services" className="section-spacing bg-gray-900/50 relative">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="section-spacing bg-gray-900/50 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-mono text-sm">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <span>OUR EXPERTISE</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
          <h2 className="section-heading">
            Cutting-Edge
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Technology Stack
            </span>
          </h2>
          <p className="cyber-text max-w-3xl mx-auto">
            We master the most advanced technologies to deliver solutions that don't just meet 
            today's needs, but anticipate tomorrow's challenges.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Brain;
            return (
            <div
              key={service.id}
              className={`cyber-card group hover:${service.glow_color} animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 font-mono group-hover:text-cyan-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`}></div>
                    <span className="text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up">
          <button className="btn-cyber">
            Explore All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;