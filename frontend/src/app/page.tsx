'use client';

import LoginButton from '@/components/loginButton';
import DiscordStatus from '@/components/discordStatus';
import { Auth0Provider } from '@auth0/auth0-react';
import TwitterStatus from '@/components/twitterStatus';

export default function Home() {
  return (
    <Auth0Provider
      domain='dev-4yvdb012bkr7iz14.us.auth0.com'
      clientId='GbrCvuf9BPl9UcJddqGq8pTkaYCjOBEC'
      useRefreshTokens={true}
      useRefreshTokensFallback={false}
      authorizationParams={{
        redirect_uri: 'http://localhost:3000',
        audience: 'backend',
        scope: 'read:discord read:twitter',
      }}
    >
      <main className='flex min-h-screen items-center justify-evenly p-24'>
        <div className='flex-1 flex flex-col gap-y-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <LoginButton socialName='Discord' scope='read:discord' />
          <DiscordStatus />
        </div>

        <div className='flex-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <LoginButton socialName='Twitter' scope='read:twitter' />
          <TwitterStatus />
        </div>
      </main>
    </Auth0Provider>
  );
}
