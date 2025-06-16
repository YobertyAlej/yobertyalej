import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  const baseStyles = 'rounded-lg border bg-card text-card-foreground shadow-sm';
  const cardStyles = `${baseStyles} ${className}`;

  return (
    <div className={cardStyles}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: CardContentProps) {
  const baseStyles = 'p-6 pt-0';
  const contentStyles = `${baseStyles} ${className}`;

  return (
    <div className={contentStyles}>
      {children}
    </div>
  );
} 