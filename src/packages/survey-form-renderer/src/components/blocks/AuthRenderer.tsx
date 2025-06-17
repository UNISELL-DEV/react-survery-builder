import React, { useEffect, useState } from 'react';
import { BlockRendererProps } from '../../types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Shield, User } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { useSurveyForm } from '../../context/SurveyFormContext';

export const AuthRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const { goToNextBlock } = useSurveyForm();

  const tokenField = (block as any).tokenField || 'token';
  const storageKey = (block as any).tokenStorageKey || 'authToken';
  const nameLabel = (block as any).nameLabel || 'Name';
  const emailLabel = (block as any).emailLabel || 'Email';
  const mobileLabel = (block as any).mobileLabel || 'Mobile Number';
  const otpType = (block as any).otpType || 'email';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [step, setStep] = useState<'form' | 'otp' | 'welcome'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [apiData, setApiData] = useState<Record<string, any>>({});
  const [otpSent, setOtpSent] = useState<{ email?: boolean; mobile?: boolean }>({});

  useEffect(() => {
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      if ((block as any).validateTokenUrl) {
        setLoading(true);
        fetch((block as any).validateTokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [tokenField]: existing })
        })
          .then((res) => res.ok ? res.json() : Promise.reject())
          .then((data) => {
            setApiData(data || {});
            if (data && data.name) setName(data.name);
            if (data && data.email) setEmail(data.email);
            if (data && data.mobile) setMobile(data.mobile);
            setStep('welcome');
          })
          .catch(() => {
            localStorage.removeItem(storageKey);
          })
          .finally(() => setLoading(false));
      } else {
        setStep('welcome');
      }
    }
  }, []);

  const getNestedValue = (obj: any, path: string) => {
    if (!path || !obj) return undefined;
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const applyFieldMappings = (responseData: any) => {
    const fieldMappings = (block as any).fieldMappings || {};
    const mappedData = { ...responseData };
    
    Object.entries(fieldMappings).forEach(([apiPath, formField]) => {
      const value = getNestedValue(responseData, apiPath);
      if (value !== undefined) {
        mappedData[formField as string] = value;
      }
    });
    
    return mappedData;
  };

  const handleSubmit = async (url?: string) => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const requestBody: any = {};
      if ((block as any).requireName && name) requestBody.name = name;
      if ((block as any).requireEmail && email) requestBody.email = email;
      if ((block as any).requireMobile && mobile) requestBody.mobile = mobile;

      if ((block as any).useOtp) {
        // Handle OTP flow
        if (otpType === 'email' || otpType === 'both') {
          if ((block as any).sendEmailOtpUrl) {
            const otpRes = await fetch((block as any).sendEmailOtpUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            });
            
            if (otpRes.ok) {
              setOtpSent(prev => ({ ...prev, email: true }));
              setSuccess('OTP sent to your email');
            } else {
              const errorData = await otpRes.json();
              throw new Error(errorData.error || 'Failed to send email OTP');
            }
          }
        }

        if (otpType === 'mobile' || otpType === 'both') {
          if ((block as any).sendMobileOtpUrl) {
            const otpRes = await fetch((block as any).sendMobileOtpUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(requestBody)
            });
            
            if (otpRes.ok) {
              setOtpSent(prev => ({ ...prev, mobile: true }));
              setSuccess('OTP sent to your mobile');
            } else {
              const errorData = await otpRes.json();
              throw new Error(errorData.error || 'Failed to send mobile OTP');
            }
          }
        }

        if (otpSent.email || otpSent.mobile || otpType === 'email' || otpType === 'mobile' || otpType === 'both') {
          setStep('otp');
        }
      } else {
        // Handle regular login/signup
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        
        const data = await res.json();
        
        if (res.ok) {
          const processedData = applyFieldMappings(data);
          setApiData(processedData || {});
          
          if (data[tokenField]) {
            localStorage.setItem(storageKey, data[tokenField]);
          }
          
          if (data.name) setName(data.name);
          if (data.email) setEmail(data.email);
          if (data.mobile) setMobile(data.mobile);
          
          goToNextBlock({ ...processedData, [storageKey]: data[tokenField] });
        } else {
          throw new Error(data.error || 'Authentication failed');
        }
      }
    } catch (e: any) {
      setError(e.message || 'Authentication failed');
    }
    
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let verificationResults: any[] = [];

      // Verify email OTP if needed
      if ((otpType === 'email' || otpType === 'both') && emailOtp && (block as any).verifyEmailOtpUrl) {
        const emailRes = await fetch((block as any).verifyEmailOtpUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: emailOtp })
        });
        
        const emailData = await emailRes.json();
        if (emailRes.ok) {
          verificationResults.push(emailData);
        } else {
          throw new Error(emailData.error || 'Email OTP verification failed');
        }
      }

      // Verify mobile OTP if needed
      if ((otpType === 'mobile' || otpType === 'both') && mobileOtp && (block as any).verifyMobileOtpUrl) {
        const mobileRes = await fetch((block as any).verifyMobileOtpUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile, otp: mobileOtp })
        });
        
        const mobileData = await mobileRes.json();
        if (mobileRes.ok) {
          verificationResults.push(mobileData);
        } else {
          throw new Error(mobileData.error || 'Mobile OTP verification failed');
        }
      }

      if (verificationResults.length > 0) {
        // Use the first successful verification result
        const data = verificationResults[0];
        const processedData = applyFieldMappings(data);
        setApiData(processedData || {});
        
        if (data[tokenField]) {
          localStorage.setItem(storageKey, data[tokenField]);
        }
        
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.mobile) setMobile(data.mobile);
        
        goToNextBlock({ ...processedData, [storageKey]: data[tokenField] });
      } else {
        throw new Error('Please enter the OTP');
      }
    } catch (e: any) {
      setError(e.message || 'OTP verification failed');
    }
    
    setLoading(false);
  };

  const resetForm = () => {
    setStep('form');
    setError(null);
    setSuccess(null);
    setEmailOtp('');
    setMobileOtp('');
    setOtpSent({});
  };

  if (loading && step === 'form') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Checking authentication...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'welcome') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <CardTitle className="text-xl">Welcome back!</CardTitle>
          <CardDescription>
            {name ? `Hello ${name}, you're already authenticated.` : "You're already authenticated."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => goToNextBlock({ ...apiData, [storageKey]: localStorage.getItem(storageKey) })}
            className="w-full"
          >
            Continue
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem(storageKey);
              setStep('form');
              setName('');
              setEmail('');
              setMobile('');
              setApiData({});
            }}
            className="w-full"
          >
            Sign in as different user
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'otp') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Enter Verification Code</CardTitle>
          <CardDescription>
            We've sent verification codes to your registered contact methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {success && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {(otpType === 'email' || otpType === 'both') && (
              <div className="space-y-2">
                <Label htmlFor="emailOtp" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email OTP
                  {otpSent.email && <Badge variant="secondary" className="text-xs">Sent</Badge>}
                </Label>
                <Input 
                  id="emailOtp"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter email OTP"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
            )}

            {(otpType === 'mobile' || otpType === 'both') && (
              <div className="space-y-2">
                <Label htmlFor="mobileOtp" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile OTP
                  {otpSent.mobile && <Badge variant="secondary" className="text-xs">Sent</Badge>}
                </Label>
                <Input 
                  id="mobileOtp"
                  value={mobileOtp}
                  onChange={(e) => setMobileOtp(e.target.value)}
                  placeholder="Enter mobile OTP"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleVerifyOtp}
              disabled={loading || (!emailOtp && !mobileOtp)}
              className="w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Verify & Continue
            </Button>
            
            <Button 
              variant="outline" 
              onClick={resetForm}
              className="w-full"
            >
              Back to form
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="text-xl">
          {(block as any).useOtp ? 'Verify Your Identity' : 'Sign In'}
        </CardTitle>
        <CardDescription>
          {(block as any).useOtp 
            ? 'We\'ll send you a verification code to continue' 
            : 'Enter your details to continue'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {(block as any).requireName && (
            <div className="space-y-2">
              <Label htmlFor="name">{nameLabel}</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder={`Enter your ${nameLabel.toLowerCase()}`}
              />
            </div>
          )}

          {(block as any).requireEmail && (
            <div className="space-y-2">
              <Label htmlFor="email">{emailLabel}</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Enter your ${emailLabel.toLowerCase()}`}
              />
            </div>
          )}

          {(block as any).requireMobile && (
            <div className="space-y-2">
              <Label htmlFor="mobile">{mobileLabel}</Label>
              <Input 
                id="mobile" 
                type="tel" 
                value={mobile} 
                onChange={(e) => setMobile(e.target.value)}
                placeholder={`Enter your ${mobileLabel.toLowerCase()}`}
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          {(block as any).loginUrl && (block as any).signupUrl ? (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-4">
                <Button 
                  onClick={() => handleSubmit((block as any).loginUrl)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {(block as any).useOtp ? 'Send Verification Code' : 'Sign In'}
                </Button>
              </TabsContent>
              <TabsContent value="signup" className="mt-4">
                <Button 
                  onClick={() => handleSubmit((block as any).signupUrl)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {(block as any).useOtp ? 'Send Verification Code' : 'Sign Up'}
                </Button>
              </TabsContent>
            </Tabs>
          ) : (
            <Button 
              onClick={() => handleSubmit((block as any).loginUrl || (block as any).signupUrl)}
              disabled={loading}
              className="w-full"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {(block as any).useOtp ? 'Send Verification Code' : 'Continue'}
            </Button>
          )}
        </div>

        {(block as any).useOtp && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              {otpType === 'both' 
                ? 'Verification codes will be sent to both your email and mobile' 
                : otpType === 'mobile'
                ? 'Verification code will be sent to your mobile number'
                : 'Verification code will be sent to your email address'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};