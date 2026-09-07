import { ImageResponse } from 'next/og';
import { getLogoDataUri } from '@/lib/logo-data';

export const runtime = 'nodejs';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  const logoSrc = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#102d61',
        }}
      >
        <img src={logoSrc} width={28} alt="" />
      </div>
    ),
    { ...size }
  );
}
