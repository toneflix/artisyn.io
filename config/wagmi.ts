import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
  name: 'Artisyn.io',
  description: 'Artisyn Web3 Onboarding',
  url: 'https://yourdomain.com',
  icons: ['https://yourdomain.com/icon.png'],
};

export const wagmiConfig = defaultWagmiConfig({
  chains: [mainnet],
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
}); 