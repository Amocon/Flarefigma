import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MemberAvatarProps {
  name: string;
  photo?: string;
  onRemove?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function MemberAvatar({ name, photo, onRemove, size = 'md' }: MemberAvatarProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {photo ? (
          <ImageWithFallback 
            src={photo} 
            alt={name}
            className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-md`}
          />
        ) : (
          <div className={`${sizeClasses[size]} rounded-full bg-[var(--flare-green)] text-white flex items-center justify-center border-2 border-white shadow-md`}>
            <span className={textSizeClasses[size]}>{getInitials(name)}</span>
          </div>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
          >
            <X size={12} />
          </button>
        )}
      </div>
      <span className={`${textSizeClasses[size]} text-center max-w-[80px] truncate`}>
        {name}
      </span>
    </div>
  );
}
