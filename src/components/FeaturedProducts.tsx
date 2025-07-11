import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: 'Home Decoration',
      category: 'Residential',
      date: 'March 2024',
      description: 'Elegant and modern home decoration that transforms living spaces into personalized sanctuaries. Discover the perfect balance of comfort and style.',
      image: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Modern', 'Cozy', 'Elegant']
    },
    {
      id: 2,
      title: 'Office Space Interior',
      category: 'Commercial',
      date: 'February 2024',
      description: 'Contemporary office design that enhances productivity and creates an inspiring work environment. Functional spaces that reflect your brand identity.',
      image: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Professional', 'Modern', 'Productive']
    },
    {
      id: 3,
      title: 'Hospitality Decor',
      category: 'Commercial',
      date: 'January 2024',
      description: 'Luxurious hospitality interior design that creates memorable experiences for guests. Sophisticated spaces that combine comfort with elegance.',
      image: 'https://images.pexels.com/photos/1571472/pexels-photo-1571472.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Luxury', 'Welcoming', 'Sophisticated']
    }
  ];

  return (
    <section className="bg-black section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="section-heading text-white">
            Elevate Your Space: Our<br />
            Featured Projects
          </h2>
          <p className="body-large text-gray-300 max-w-3xl mx-auto">
            Discover our portfolio of exceptional interior design projects. Each space tells a unique story 
            of transformation, creativity, and attention to detail that defines our commitment to excellence.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 card-hover group"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                {/* Category and Date */}
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-lime-400 text-black px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{product.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View More Button */}
                <button className="flex items-center space-x-2 text-lime-400 hover:text-lime-300 transition-colors duration-300 font-medium">
                  <span>View More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;