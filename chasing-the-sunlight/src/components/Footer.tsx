import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quote Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Chasing the Sunlight</h3>
            <p className="text-xs opacity-75 mb-2">In Memory of Steven Reed · 9.19.66 – 5.15.25</p>
            <p className="text-sm italic opacity-90">
              "Every sunset brings the promise of a new dawn."
              <span className="block mt-1 text-xs">— Ralph Waldo Emerson</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/about" className="hover:text-secondary transition-colors">About</Link>
              <Link to="/dads-story" className="hover:text-secondary transition-colors">Dad's Story</Link>
              <Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link>
              <Link to="/journal" className="hover:text-secondary transition-colors">Stevie Bridget &amp; Jewels' Journal</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:meow@travelingmainecoons.com"
                className="hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm opacity-90">meow@travelingmainecoons.com</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 space-y-4 text-sm opacity-75">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center gap-1">
              Made with <Heart size={14} className="text-secondary" fill="currentColor" /> in memory
              of Dad
            </p>
            <p className="mt-2 md:mt-0">© {new Date().getFullYear()} Chasing the Sunlight. All rights reserved.</p>
          </div>
          <p className="text-center text-xs opacity-80">
            All photographs on this site are original works protected by copyright. Unauthorized reproduction, distribution, or use is strictly prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
