import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

const DISCORD = 'discord';

const DiscordStatus = () => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const [status, setStatus] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (isAuthenticated && user?.sub?.includes(DISCORD)) {
      const checkDiscordStatus = async () => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch('http://localhost:3005/utils/check-discord', {
          headers: {
            'x-pap-ac': accessToken
          },
        });
        const result = await res.json();
        setStatus(result.status);
        if (result.cta) {
          setInviteLink(result.cta);
          setTimeout(checkDiscordStatus, 10_000);
        } else {
          setInviteLink('');
        }
      };
      checkDiscordStatus();
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  if (!isAuthenticated || !user?.sub?.includes(DISCORD)) {
    return null;
  }

  let statusBadge;
  if (status === 'Joined') {
    statusBadge = (
      <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
        {status}
      </span>
    );
  } else {
    statusBadge = (
      <span className='bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'>
        {status}
      </span>
    );
  }

  return (
    <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
      <li>Status: {statusBadge}</li>
      {inviteLink && (
        <li>
          Invite Link:&nbsp;
          <a
            className='text-blue-600 dark:text-blue-500 hover:underline'
            href={inviteLink}
            target='_blank'
          >
            {inviteLink}
          </a>
        </li>
      )}
    </ul>
  );
};

export default DiscordStatus;
