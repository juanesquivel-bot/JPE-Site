import Image from 'next/image';

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = '', priority = false }: LogoProps) {
  return (
    <Image
      src="/JPELogo_transparent_2048px.png"
      alt="JPE Ventures"
      width={2048}
      height={1118}
      className={`w-auto object-contain ${className}`}
      priority={priority}
    />
  );
}
