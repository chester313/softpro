import React from 'react';
import { ArrowRight, Play, Cpu, Zap, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm">
                <Zap className="w-4 h-4" />
                <span>NEXT-GEN SOFTWARE SOLUTIONS</span>
              </div>
              
              <h1 className="cyber-heading">
                Building the
                <br />
                <span className="glitch" data-text="Future">Future</span>
                <br />
                of Technology
              </h1>
              
              <p className="cyber-text max-w-lg">
                We craft cutting-edge software solutions that transform businesses 
                and push the boundaries of what's possible. From AI-powered applications 
                to blockchain innovations, we're your partners in digital evolution.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-cyber flex items-center space-x-2 group">
                <span>Explore Solutions</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-cyber-secondary flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400 glow-text font-mono">500+</div>
                <div className="text-gray-400 text-sm">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 glow-text font-mono">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400 glow-text font-mono">24/7</div>
                <div className="text-gray-400 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right Content - Tech Visualization */}
          <div className="relative animate-slide-in-right">
            <div className="grid grid-cols-2 gap-6">
              {/* Main Tech Card */}
              <div className="col-span-2 cyber-card">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">AI-Powered Core</h3>
                    <p className="text-gray-400 text-sm">Machine Learning Engine</p>
                  </div>
                </div>
                <div className="code-block">
                  <div className="text-cyan-400">// AI Processing Pipeline</div>
                  <div className="text-gray-300">const model = await tf.loadModel();</div>
                  <div className="text-purple-400">prediction = model.predict(data);</div>
                </div>
              </div>

              {/* Security Card */}
              <div className="cyber-card">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Quantum Security</h4>
                <p className="text-gray-400 text-sm">Military-grade encryption</p>
              </div>

              {/* Performance Card */}
              <div className="cyber-card">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Lightning Fast</h4>
                <p className="text-gray-400 text-sm">Sub-millisecond response</p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;