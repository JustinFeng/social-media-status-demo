import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  socialName: string;
  scope: string;
}

const LoginButton = ({ socialName, scope }: Props) => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const connection = socialName.toLocaleLowerCase();
  let button;

  if (isAuthenticated && user?.sub?.includes(connection)) {
    button = (
      <a
        href='#'
        onClick={() => {
          logout({ logoutParams: { returnTo: 'http://localhost:3000' } });
        }}
        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      >
        {socialName} Logout
      </a>
    );
  } else {
    button = (
      <a
        href='#'
        onClick={() => {
          loginWithRedirect({
            authorizationParams: {
              scope,
              connection,
            },
          });
        }}
        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        {socialName} Login
      </a>
    );
  }

  return <div>{button}</div>;
};

export default LoginButton;
