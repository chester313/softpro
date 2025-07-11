import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonial = {
    name: 'Sarah Mitchell',
    role: 'Homeowner',
    location: 'Beverly Hills, CA',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 5,
    text: 'Working with Astro Living was an absolute dream. They transformed our home into a space that perfectly reflects our personality while maintaining incredible functionality. The attention to detail and creative vision exceeded all our expectations. Every room tells a story, and we couldn\'t be happier with the results.',
    project: 'Complete Home Renovation'
  };

  return (
    <section id="testimonials" className="bg-gray-900 section-spacing">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="section-heading text-white">
              Satisfaction Stories:<br />
              Client Experience
            </h2>
            <p className="body-large text-gray-300">
              Discover what our clients have to say about their transformation journey. 
              Every project is a partnership built on trust, creativity, and exceptional results 
              that exceed expectations.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">500+</div>
                <div className="text-gray-400 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">4.9</div>
                <div className="text-gray-400 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">98%</div>
                <div className="text-gray-400 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Testimonial Card */}
          <div className="bg-black rounded-2xl p-8 border border-gray-800 relative">
            {/* Quote Icon */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-black" />
            </div>

            <div className="space-y-6">
              {/* Rating */}
              <div className="flex space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-lime-400 text-lime-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg text-gray-300 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-800">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role} • {testimonial.location}
                  </p>
                  <p className="text-lime-400 text-sm font-medium">
                    {testimonial.project}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;