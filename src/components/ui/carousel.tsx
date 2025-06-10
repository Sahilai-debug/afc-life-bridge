import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const images = [
  '/1-2.jpg',
  '/i-1.jpg',
  '/i-3.jpg',
];

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Auto-transition every 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(109vh - 4rem)' }}>
      {images.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`Carousel slide ${index + 1}`}
        >
          {/* Semi-transparent overlay over the entire image for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Overlay content */}
          <div className="absolute inset-0 flex items-center justify-start p-4 sm:p-6 md:p-10 lg:pl-20 z-25">
            <div className="max-w-md text-white bg-black/30 p-6 rounded-lg backdrop-blur-sm">
              {/* Logo */}
              <img src="/logo.png" alt="Company Logo" className="h-12 mb-4" />
              
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                Compassionate Adult Foster Care in Massachusetts
              </h2>

              {/* Paragraph */}
              <p className="text-base sm:text-lg mb-6">
                Providing trusted, personalized care for your loved ones in a safe and supportive home environment.
              </p>

              {/* Call-to-action button */}
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
              >
                <Link to="/auth/register">
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
