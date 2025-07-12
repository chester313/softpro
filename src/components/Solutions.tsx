import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Target, Layers } from 'lucide-react';
import { Solution, crudOperations } from '../lib/supabase';

const Solutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    setIsLoading(true);
    const { data, error } = await crudOperations.solutions.getAll();
    if (data && !error) {
      setSolutions(data);
    } else {
      console.error('Error loading solutions:', error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <section id="solutions" className="section-spacing bg-black relative">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="solutions" className="section-spacing bg-black relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="space-y-6 mb-20 animate-fade-in-up">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm">
            <Layers className="w-4 h-4" />
            <span>FEATURED SOLUTIONS</span>
          </div>
          <h2 className="section-heading">
            Revolutionary Solutions
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Transforming Industries
            </span>
          </h2>
          <p className="cyber-text max-w-2xl">
            Discover our flagship solutions that are reshaping how businesses operate, 
            compete, and innovate in the digital age.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 animate-slide-in-${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {solution.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <Target className="w-4 h-4" />
                      <span>Enterprise Ready</span>
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
                    {solution.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed text-lg">
                    {solution.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800/50 text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-800">
                  {Object.entries(solution.metrics || {}).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-xl font-bold text-cyan-400 glow-text font-mono">
                        {String(value)}
                      </div>
                      <div className="text-gray-400 text-sm capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="btn-cyber flex items-center space-x-2 group">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Image */}
              <div className={`relative animate-scale-in ${index % 2 === 1 ? 'lg:order-first' : ''}`}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden cyber-card group">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Overlay Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;