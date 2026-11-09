import React from 'react';
import { 
  Laptop, 
  CreditCard, 
  Key, 
  Shirt, 
  Briefcase, 
  BookOpen, 
  Coffee, 
  Watch, 
  Package, 
  HelpCircle 
} from 'lucide-react';

export const CategoryIcon = ({ iconName, size = 18, className = '' }) => {
  switch (iconName) {
    case 'Laptop': return <Laptop size={size} className={className} />;
    case 'CreditCard': return <CreditCard size={size} className={className} />;
    case 'Key': return <Key size={size} className={className} />;
    case 'Shirt': return <Shirt size={size} className={className} />;
    case 'Briefcase': return <Briefcase size={size} className={className} />;
    case 'BookOpen': return <BookOpen size={size} className={className} />;
    case 'Coffee': return <Coffee size={size} className={className} />;
    case 'Watch': return <Watch size={size} className={className} />;
    case 'Package': return <Package size={size} className={className} />;
    default: return <Package size={size} className={className} />;
  }
};

