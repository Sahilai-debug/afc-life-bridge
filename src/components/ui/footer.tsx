import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Heart, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, children, className }) => (
  <div className={cn("space-y-4", className)}>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isMasked?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, href, isMasked = false }) => {
  const maskedValue = isMasked ? value.replace(/(?<=.{3}).(?=.{4})/g, '*') : value;
  const content = (
    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
      {icon}
      <span>{maskedValue}</span>
    </div>
  );

  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      {href ? (
        <a href={href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <FooterColumn title="AFC Massachusetts">
            <p className="text-gray-600 dark:text-gray-300">
              Providing quality healthcare and support services for adults in Massachusetts.
            </p>
            <div className="mt-4 space-y-3">
              <ContactItem
                icon={<Phone className="w-4 h-4" />}
                label="Main Phone"
                value="(555) 123-4567"
                href="tel:+15551234567"
                isMasked
              />
              <ContactItem
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value="contact@afcmass.org"
                href="mailto:contact@afcmass.org"
                isMasked
              />
              <ContactItem
                icon={<MapPin className="w-4 h-4" />}
                label="Address"
                value="123 Healthcare Ave, Boston, MA 02108"
              />
            </div>
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Our Services">
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Heart className="w-4 h-4" />
                <span>Adult Foster Care</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>24/7 Care Coordination</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Users className="w-4 h-4" />
                <span>Professional Caregivers</span>
              </li>
            </ul>
          </FooterColumn>

          {/* Emergency Contact */}
          <FooterColumn title="Emergency Contact">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="text-red-600 dark:text-red-400 font-semibold mb-2">
                24/7 Emergency Line
              </p>
              <ContactItem
                icon={<Phone className="w-4 h-4" />}
                label="Emergency"
                value="(555) 999-8888"
                href="tel:+15559998888"
                isMasked
              />
            </div>
          </FooterColumn>

          {/* Legal & Compliance */}
          <FooterColumn title="Legal & Compliance">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/hipaa-compliance"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  HIPAA Compliance
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </FooterColumn>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} AFC Massachusetts. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                HIPAA Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 