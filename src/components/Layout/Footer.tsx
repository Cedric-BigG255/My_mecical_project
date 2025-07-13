import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">MediFlow</span>
          </div>

          {/* Essential Links */}
          <div className="flex items-center space-x-8">
            <a 
              href="/privacy" 
              className="text-sm text-gray-600 hover:text-medical-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/contact" 
              className="text-sm text-gray-600 hover:text-medical-600 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-medical-100 hover:text-medical-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-medical-100 hover:text-medical-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-medical-100 hover:text-medical-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-medical-100 hover:text-medical-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2025 IPPEC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;