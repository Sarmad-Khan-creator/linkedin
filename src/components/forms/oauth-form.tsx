import { Button } from '../ui/button';
import Google from '@/icons/Google';
import Facebook from '@/icons/Facebook';
import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import useOAuthCredentials from '@/hooks/use-oauth-credentials';
import { OAuthStrategy } from '@clerk/types';

const OAuthForm = () => {
    const { handleSignIn: OAuthSignin } = useOAuthCredentials();

  const handleOAuthSignin = (strategy: OAuthStrategy) => {
    OAuthSignin(strategy);
  };
  return (
    <>
      <div className="flex gap-2 items-center">
        <LinkedInLogoIcon color="#006699" width={45} height={45} />
        <h2 className="text-primary-blue text-2xl font-bold">LINKEDIN</h2>
      </div>
      <div className="flex items-center gap-10 w-full">
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-1 border border-gray-400"
          onClick={() => handleOAuthSignin('oauth_google')}
        >
          <Google />
          <p className="text-[#EB4335] text-xl font-semibold ml-2">Google</p>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 py-1 border border-gray-400"
          onClick={() => handleOAuthSignin('oauth_facebook')}
        >
          <Facebook />
          <p className="text-[#3C5A9A] text-xl font-semibold ml-2">Facebook</p>
        </Button>
      </div>
    </>
  );
};

export default OAuthForm;
