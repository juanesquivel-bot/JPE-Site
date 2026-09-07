import Image from 'next/image';

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = '', priority = false }: LogoProps) {
  return (
    <Image
      src="/JPE_Logo_Transparent.png"
      alt="JPE Ventures General Contracting"
      width={1407}
      height={768}
      className={`w-auto object-contain ${className}`}
      priority={priority}
    />
  );
}
