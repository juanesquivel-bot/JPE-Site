import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function getLogoDataUri() {
  const bytes = await readFile(join(process.cwd(), 'public', 'JPE_Logo_Transparent.png'));
  return `data:image/png;base64,${bytes.toString('base64')}`;
}
