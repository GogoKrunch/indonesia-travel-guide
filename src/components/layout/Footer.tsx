import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <MapPin className="text-emerald-400" />
              <span>JelajahID</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Discover Indonesia's hidden gems and plan your perfect adventure with JelajahID.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Instagram size={20} />} href="https://instagram.com" />
              <SocialLink icon={<Facebook size={20} />} href="https://facebook.com" />
              <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <FooterLinks 
              links={[
                { name: 'Home', path: '/' },
                { name: 'Attractions', path: '/attractions' },
                { name: 'Hotels', path: '/hotels' },
                { name: 'Add Place', path: '/add-attraction' },
              ]} 
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Destinations</h3>
            <FooterLinks 
              links={[
                { name: 'Bali', path: '/attractions?location=Bali' },
                { name: 'Yogyakarta', path: '/attractions?location=Yogyakarta' },
                { name: 'Raja Ampat', path: '/attractions?location=Raja Ampat' },
                { name: 'Komodo Island', path: '/attractions?location=Komodo Island' },
                { name: 'Borobudur', path: '/attractions?location=Borobudur' },
              ]} 
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-400">
                <MapPin size={18} className="mr-2 text-emerald-400" />
                Jakarta, Indonesia
              </p>
              <p className="flex items-center text-gray-400">
                <Mail size={18} className="mr-2 text-emerald-400" />
                hello@jelajahid.com
              </p>
              <p className="flex items-center text-gray-400">
                <Phone size={18} className="mr-2 text-emerald-400" />
                +62 123 4567 890
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} JelajahID. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinksProps {
  links: { name: string; path: string }[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => (
  <ul className="space-y-2">
    {links.map((link, index) => (
      <li key={index}>
        <Link 
          to={link.path} 
          className="text-gray-400 hover:text-emerald-400 transition"
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
);

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-gray-800 hover:bg-emerald-600 transition p-2 rounded-full text-white"
  >
    {icon}
  </a>
);

export default Footer;