import React, { useEffect, useState } from 'react';
import { BlockRendererProps } from '../../types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useSurveyForm } from '../../context/SurveyFormContext';

export const AuthRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const {
    goToNextBlock
  } = useSurveyForm();

  const tokenField = (block as any).tokenField || 'token';
  const storageKey = (block as any).tokenStorageKey || 'authToken';
  const nameLabel = (block as any).nameLabel || 'Name';
  const emailLabel = (block as any).emailLabel || 'Email';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'form' | 'otp' | 'welcome'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiData, setApiData] = useState<Record<string, any>>({});

  useEffect(() => {
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      if ((block as any).validateTokenUrl) {
        fetch((block as any).validateTokenUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [tokenField]: existing })
        })
          .then((res) => res.ok ? res.json() : Promise.reject())
          .then((data) => {
            setApiData(data || {});
            if (data && data.name) setName(data.name);
            setStep('welcome');
          })
          .catch(() => {});
      } else {
        setStep('welcome');
      }
    }
  }, []);

  const handleSubmit = async (url?: string) => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      if ((block as any).useOtp) {
        await fetch((block as any).sendOtpUrl || '', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name })
        });
        setStep('otp');
      } else {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email })
        });
        const data = await res.json();
        if (res.ok) {
          setApiData(data || {});
          if (data[tokenField]) {
            localStorage.setItem(storageKey, data[tokenField]);
          }
          if (data.name) setName(data.name);
          goToNextBlock({ ...data, [storageKey]: data[tokenField] });
        } else {
          setError('Authentication failed');
        }
      }
    } catch (e) {
      setError('Authentication failed');
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch((block as any).verifyOtpUrl || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setApiData(data || {});
        if (data[tokenField]) {
          localStorage.setItem(storageKey, data[tokenField]);
        }
        if (data.name) setName(data.name);
        goToNextBlock({ ...data, [storageKey]: data[tokenField] });
      } else {
        setError('Verification failed');
      }
    } catch (e) {
      setError('Verification failed');
    }
    setLoading(false);
  };

  if (step === 'welcome') {
    return (
      <div className="space-y-4">
        <p>Welcome back{name ? `, ${name}` : ''}!</p>
        <Button onClick={() => goToNextBlock({ ...apiData, [storageKey]: localStorage.getItem(storageKey) })}>
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {step === 'form' && (
        <>
          {(block as any).requireName && (
            <div className="space-y-2">
              <Label htmlFor="name">{nameLabel}</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}
          {(block as any).requireEmail && (
            <div className="space-y-2">
              <Label htmlFor="email">{emailLabel}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          )}
          <div className="flex space-x-2">
            {(block as any).loginUrl && (
              <Button disabled={loading} onClick={() => handleSubmit((block as any).loginUrl)}>
                {(block as any).useOtp ? 'Send OTP' : 'Login'}
              </Button>
            )}
            {!(block as any).loginUrl && (
              <Button disabled={loading} onClick={() => handleSubmit((block as any).signupUrl)}>
                {(block as any).useOtp ? 'Send OTP' : 'Submit'}
              </Button>
            )}
            {Boolean((block as any).signupUrl && (block as any).loginUrl) && (
              <Button disabled={loading} onClick={() => handleSubmit((block as any).signupUrl)}>
                Sign Up
              </Button>
            )}
          </div>
        </>
      )}

      {step === 'otp' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <Button disabled={loading} onClick={handleVerify}>
            Verify
          </Button>
        </>
      )}

      {error && <div className="text-destructive text-sm">{error}</div>}
    </div>
  );
};
