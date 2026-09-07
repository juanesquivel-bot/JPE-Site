import { ImageResponse } from 'next/og';
import { getLogoDataUri } from '@/lib/logo-data';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
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
          background: '#0a1b3d',
        }}
      >
        <img src={logoSrc} width={780} alt="" />
      </div>
    ),
    { ...size }
  );
}
