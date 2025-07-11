import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const ProjectShowcase = () => {
  const projects = [
    {
      id: 1,
      title: 'Grand Vista',
      category: 'Residential',
      location: 'New York',
      image: 'https://images.pexels.com/photos/1571476/pexels-photo-1571476.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Luxury', 'Modern']
    },
    {
      id: 2,
      title: 'Elegant Retreat',
      category: 'Residential',
      location: 'California',
      image: 'https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Contemporary', 'Minimalist']
    },
    {
      id: 3,
      title: 'Modern Marvel',
      category: 'Commercial',
      location: 'Chicago',
      image: 'https://images.pexels.com/photos/1571478/pexels-photo-1571478.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Corporate', 'Innovative']
    }
  ];

  return (
    <section className="bg-black section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div className="space-y-6 mb-16">
          <h2 className="section-heading text-white">
            Design Chronicles:<br />
            Our Latest Masterpieces
          </h2>
          <p className="body-large text-gray-300 max-w-2xl">
            Explore our latest interior design projects that showcase innovation, 
            creativity, and attention to detail. Each space represents our commitment 
            to transforming environments into extraordinary experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lime-400 text-sm font-medium uppercase tracking-wide">
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="btn-secondary flex items-center space-x-2 mx-auto">
            <span>Explore Portfolio</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;