import React from 'react';
import { Users, Award, Globe, Rocket, Brain, Code2 } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Users,
      number: '200+',
      label: 'Expert Developers',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: Award,
      number: '50+',
      label: 'Industry Awards',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: Globe,
      number: '40+',
      label: 'Countries Served',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: Rocket,
      number: '1M+',
      label: 'Users Impacted',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const values = [
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'We push the boundaries of technology, constantly exploring new frontiers in AI, blockchain, and quantum computing.',
      color: 'text-cyan-400'
    },
    {
      icon: Code2,
      title: 'Code Excellence',
      description: 'Every line of code is crafted with precision, following best practices and cutting-edge development methodologies.',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      title: 'Human-Centric',
      description: 'Technology serves humanity. We build solutions that enhance human capabilities and improve quality of life.',
      color: 'text-pink-400'
    }
  ];

  return (
    <section id="about" className="section-spacing bg-black relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 font-mono text-sm">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <span>ABOUT CYBERFORGE</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
          <h2 className="section-heading">
            Pioneering the Digital
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Revolution
            </span>
          </h2>
          <p className="cyber-text max-w-3xl mx-auto">
            Founded by visionaries who believe technology can reshape the world, CyberForge has been 
            at the forefront of digital innovation for over a decade. We don't just build software – 
            we architect the future.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="cyber-card text-center group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white glow-text font-mono mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-400 font-medium">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="cyber-card mb-20 text-center animate-fade-in-up">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 font-mono">
              Our Mission
            </h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              "To democratize advanced technology and empower businesses to achieve 
              extraordinary outcomes through innovative software solutions that were 
              once thought impossible."
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
              <span>— CyberForge Leadership Team</span>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="grid lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="cyber-card animate-slide-in-left"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-12 h-12 ${value.color} mb-6`}>
                <value.icon className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 font-mono">
                {value.title}
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;