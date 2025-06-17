import React from "react";
import { BlockDefinition, ContentBlockItemProps, BlockData } from "../../types";
import { Input } from "@survey-form-builder/components/ui/input";
import { Label } from "@survey-form-builder/components/ui/label";
import { Checkbox } from "@survey-form-builder/components/ui/checkbox";
import { Button } from "@survey-form-builder/components/ui/button";
import { Textarea } from "@survey-form-builder/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@survey-form-builder/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@survey-form-builder/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@survey-form-builder/components/ui/select";
import { UserCheck, TestTube, Settings, MapPin, BookOpen, Plus, Trash2, Phone, Mail } from "lucide-react";

const AuthBlockForm: React.FC<ContentBlockItemProps> = ({ data, onUpdate, onRemove }) => {
  const [testResults, setTestResults] = React.useState<string[]>([]);
  const [testData, setTestData] = React.useState({
    name: "Test User",
    email: "test@example.com",
    mobile: "+1234567890",
    otp: "123456"
  });
  const [isTestingFlow, setIsTestingFlow] = React.useState(false);

  const handleChange = (field: string, value: any) => {
    if (!onUpdate) return;
    onUpdate({
      ...data,
      [field]: value,
    });
  };

  const handleMappingChange = (oldPath: string, newPath: string, formField: string) => {
    const fieldMappings = { ...(data.fieldMappings as Record<string, string> || {}) };
    if (oldPath !== newPath) {
      delete fieldMappings[oldPath];
    }
    if (newPath.trim() === '' || formField.trim() === '') {
      delete fieldMappings[newPath];
    } else {
      fieldMappings[newPath] = formField;
    }
    handleChange('fieldMappings', fieldMappings);
  };

  const addMapping = () => {
    const fieldMappings = { ...(data.fieldMappings as Record<string, string> || {}) };
    fieldMappings[''] = '';
    handleChange('fieldMappings', fieldMappings);
  };

  const removeMapping = (path: string) => {
    const fieldMappings = { ...(data.fieldMappings as Record<string, string> || {}) };
    delete fieldMappings[path];
    handleChange('fieldMappings', fieldMappings);
  };

  const getNestedValue = (obj: any, path: string) => {
    if (!path || !obj) return undefined;
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const testEndpoints = async () => {
    const endpoints = [
      { label: "loginUrl", url: data.loginUrl },
      { label: "signupUrl", url: data.signupUrl },
      { label: "sendEmailOtpUrl", url: data.sendEmailOtpUrl },
      { label: "verifyEmailOtpUrl", url: data.verifyEmailOtpUrl },
      { label: "sendMobileOtpUrl", url: data.sendMobileOtpUrl },
      { label: "verifyMobileOtpUrl", url: data.verifyMobileOtpUrl },
      { label: "validateTokenUrl", url: data.validateTokenUrl },
    ];
    
    const results: string[] = [];
    for (const ep of endpoints) {
      if (!ep.url) continue;
      try {
        const res = await fetch(ep.url, { method: "GET" });
        results.push(`${ep.label}: ${res.ok ? "✅ reachable" : `❌ ${res.status}`}`);
      } catch {
        results.push(`${ep.label}: ❌ error`);
      }
    }
    setTestResults(results.length ? results : ["No URLs configured"]);
  };

  const testFullFlow = async () => {
    setIsTestingFlow(true);
    const results: string[] = [];

    try {
      if (data.useOtp) {
        // Test OTP flow based on type
        const isEmailOtp = data.otpType === 'email' || !data.otpType;
        const isMobileOtp = data.otpType === 'mobile';
        const isBothOtp = data.otpType === 'both';

        if (isEmailOtp || isBothOtp) {
          // Test Email OTP flow
          if (data.sendEmailOtpUrl) {
            try {
              const otpRes = await fetch(data.sendEmailOtpUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  email: testData.email, 
                  name: testData.name 
                })
              });
              
              if (otpRes.ok) {
                const otpData = await otpRes.json();
                results.push(`✅ Send Email OTP: Success - ${otpData.message || 'OTP sent'}`);
                
                // Test verify Email OTP
                if (data.verifyEmailOtpUrl) {
                  const verifyRes = await fetch(data.verifyEmailOtpUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      email: testData.email, 
                      otp: testData.otp 
                    })
                  });
                  
                  if (verifyRes.ok) {
                    const verifyData = await verifyRes.json();
                    results.push(`✅ Verify Email OTP: Success`);
                    results.push(`📋 Response: ${JSON.stringify(verifyData, null, 2)}`);
                    
                    // Test field mapping
                    if (data.fieldMappings && Object.keys(data.fieldMappings).length > 0) {
                      results.push(`🔗 Field mappings would extract:`);
                      Object.entries(data.fieldMappings as Record<string, string>).forEach(([apiPath, formField]) => {
                        const value = getNestedValue(verifyData, apiPath);
                        results.push(`  ${apiPath} → ${formField}: ${value}`);
                      });
                    }
                  } else {
                    results.push(`❌ Verify Email OTP: ${verifyRes.status}`);
                  }
                }
              } else {
                results.push(`❌ Send Email OTP: ${otpRes.status}`);
              }
            } catch (error) {
              results.push(`❌ Email OTP flow error: ${error.message}`);
            }
          }
        }

        if (isMobileOtp || isBothOtp) {
          // Test Mobile OTP flow
          if (data.sendMobileOtpUrl) {
            try {
              const otpRes = await fetch(data.sendMobileOtpUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  mobile: testData.mobile, 
                  name: testData.name 
                })
              });
              
              if (otpRes.ok) {
                const otpData = await otpRes.json();
                results.push(`✅ Send Mobile OTP: Success - ${otpData.message || 'OTP sent'}`);
                
                // Test verify Mobile OTP
                if (data.verifyMobileOtpUrl) {
                  const verifyRes = await fetch(data.verifyMobileOtpUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      mobile: testData.mobile, 
                      otp: testData.otp 
                    })
                  });
                  
                  if (verifyRes.ok) {
                    const verifyData = await verifyRes.json();
                    results.push(`✅ Verify Mobile OTP: Success`);
                    results.push(`📋 Response: ${JSON.stringify(verifyData, null, 2)}`);
                  } else {
                    results.push(`❌ Verify Mobile OTP: ${verifyRes.status}`);
                  }
                }
              } else {
                results.push(`❌ Send Mobile OTP: ${otpRes.status}`);
              }
            } catch (error) {
              results.push(`❌ Mobile OTP flow error: ${error.message}`);
            }
          }
        }
      } else {
        // Test regular login
        if (data.loginUrl) {
          try {
            const loginRes = await fetch(data.loginUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                email: testData.email, 
                mobile: testData.mobile,
                name: testData.name 
              })
            });
            
            if (loginRes.ok) {
              const loginData = await loginRes.json();
              results.push(`✅ Login: Success`);
              results.push(`📋 Response: ${JSON.stringify(loginData, null, 2)}`);
              
              // Test token validation if configured
              const tokenField = data.tokenField || 'token';
              const token = loginData[tokenField];
              
              if (token && data.validateTokenUrl) {
                const validateRes = await fetch(data.validateTokenUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ [tokenField]: token })
                });
                
                if (validateRes.ok) {
                  results.push(`✅ Token validation: Success`);
                } else {
                  results.push(`❌ Token validation: ${validateRes.status}`);
                }
              }
              
              // Test field mapping
              if (data.fieldMappings && Object.keys(data.fieldMappings).length > 0) {
                results.push(`🔗 Field mappings would extract:`);
                Object.entries(data.fieldMappings as Record<string, string>).forEach(([apiPath, formField]) => {
                  const value = getNestedValue(loginData, apiPath);
                  results.push(`  ${apiPath} → ${formField}: ${value}`);
                });
              }
            } else {
              results.push(`❌ Login: ${loginRes.status}`);
            }
          } catch (error) {
            results.push(`❌ Login error: ${error.message}`);
          }
        }
      }
    } catch (error) {
      results.push(`❌ Flow test error: ${error.message}`);
    }

    setTestResults(results);
    setIsTestingFlow(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Auth Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="mapping">Data Mapping</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="docs">API Docs</TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Authentication Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginUrl">Login URL</Label>
                      <Input
                        id="loginUrl"
                        value={data.loginUrl || ""}
                        onChange={(e) => handleChange("loginUrl", e.target.value)}
                        placeholder="https://api.example.com/login"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupUrl">Signup URL</Label>
                      <Input
                        id="signupUrl"
                        value={data.signupUrl || ""}
                        onChange={(e) => handleChange("signupUrl", e.target.value)}
                        placeholder="https://api.example.com/signup"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="useOtp"
                        checked={!!data.useOtp}
                        onCheckedChange={(checked) => handleChange("useOtp", !!checked)}
                      />
                      <Label htmlFor="useOtp">Use OTP (One-Time Password)</Label>
                    </div>

                    {data.useOtp && (
                      <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otpType">OTP Type</Label>
                          <Select
                            value={data.otpType || "email"}
                            onValueChange={(value) => handleChange("otpType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select OTP type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email Only</SelectItem>
                              <SelectItem value="mobile">Mobile Only</SelectItem>
                              <SelectItem value="both">Both Email & Mobile</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {(data.otpType === 'email' || data.otpType === 'both' || !data.otpType) && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sendEmailOtpUrl">Send Email OTP URL</Label>
                              <Input
                                id="sendEmailOtpUrl"
                                value={data.sendEmailOtpUrl || ""}
                                onChange={(e) => handleChange("sendEmailOtpUrl", e.target.value)}
                                placeholder="https://api.example.com/send-email-otp"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="verifyEmailOtpUrl">Verify Email OTP URL</Label>
                              <Input
                                id="verifyEmailOtpUrl"
                                value={data.verifyEmailOtpUrl || ""}
                                onChange={(e) => handleChange("verifyEmailOtpUrl", e.target.value)}
                                placeholder="https://api.example.com/verify-email-otp"
                              />
                            </div>
                          </div>
                        )}

                        {(data.otpType === 'mobile' || data.otpType === 'both') && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sendMobileOtpUrl">Send Mobile OTP URL</Label>
                              <Input
                                id="sendMobileOtpUrl"
                                value={data.sendMobileOtpUrl || ""}
                                onChange={(e) => handleChange("sendMobileOtpUrl", e.target.value)}
                                placeholder="https://api.example.com/send-mobile-otp"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="verifyMobileOtpUrl">Verify Mobile OTP URL</Label>
                              <Input
                                id="verifyMobileOtpUrl"
                                value={data.verifyMobileOtpUrl || ""}
                                onChange={(e) => handleChange("verifyMobileOtpUrl", e.target.value)}
                                placeholder="https://api.example.com/verify-mobile-otp"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenField">Token Field Name</Label>
                      <Input
                        id="tokenField"
                        value={data.tokenField || "token"}
                        onChange={(e) => handleChange("tokenField", e.target.value)}
                        placeholder="token"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tokenStorageKey">Token Storage Key</Label>
                      <Input
                        id="tokenStorageKey"
                        value={data.tokenStorageKey || "authToken"}
                        onChange={(e) => handleChange("tokenStorageKey", e.target.value)}
                        placeholder="authToken"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validateTokenUrl">Validate Token URL (Optional)</Label>
                    <Input
                      id="validateTokenUrl"
                      value={data.validateTokenUrl || ""}
                      onChange={(e) => handleChange("validateTokenUrl", e.target.value)}
                      placeholder="https://api.example.com/validate-token"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nameLabel">Name Field Label</Label>
                      <Input
                        id="nameLabel"
                        value={data.nameLabel || "Name"}
                        onChange={(e) => handleChange("nameLabel", e.target.value)}
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailLabel">Email Field Label</Label>
                      <Input
                        id="emailLabel"
                        value={data.emailLabel || "Email"}
                        onChange={(e) => handleChange("emailLabel", e.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobileLabel">Mobile Field Label</Label>
                      <Input
                        id="mobileLabel"
                        value={data.mobileLabel || "Mobile Number"}
                        onChange={(e) => handleChange("mobileLabel", e.target.value)}
                        placeholder="Mobile Number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requireName"
                        checked={!!data.requireName}
                        onCheckedChange={(checked) => handleChange("requireName", !!checked)}
                      />
                      <Label htmlFor="requireName">Require Name</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requireEmail"
                        checked={!!data.requireEmail}
                        onCheckedChange={(checked) => handleChange("requireEmail", !!checked)}
                      />
                      <Label htmlFor="requireEmail">Require Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requireMobile"
                        checked={!!data.requireMobile}
                        onCheckedChange={(checked) => handleChange("requireMobile", !!checked)}
                      />
                      <Label htmlFor="requireMobile">Require Mobile</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mapping" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    API Response Data Mapping
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Map fields from your API response to form values. Use dot notation for nested values (e.g., "user.department").
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries((data.fieldMappings as Record<string, string>) || {}).map(([apiPath, formField], index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 items-end">
                      <div className="col-span-2 space-y-1">
                        <Label className="text-xs">API Response Path</Label>
                        <Input
                          value={apiPath}
                          onChange={(e) => handleMappingChange(apiPath, e.target.value, formField)}
                          placeholder="user.department"
                          className="text-sm"
                        />
                      </div>
                      <div className="text-center text-muted-foreground">→</div>
                      <div className="space-y-1">
                        <Label className="text-xs">Form Field</Label>
                        <Input
                          value={formField}
                          onChange={(e) => handleMappingChange(apiPath, apiPath, e.target.value)}
                          placeholder="department"
                          className="text-sm"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMapping(apiPath)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button type="button" variant="outline" onClick={addMapping}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Mapping
                  </Button>

                  <div className="p-3 bg-blue-50 rounded text-sm">
                    <strong>Example mappings:</strong>
                    <ul className="mt-1 space-y-1">
                      <li>• <code>user.id</code> → <code>userId</code></li>
                      <li>• <code>user.department</code> → <code>department</code></li>
                      <li>• <code>subscription.tier</code> → <code>userTier</code></li>
                      <li>• <code>metadata.role</code> → <code>userRole</code></li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-4 h-4" />
                    API Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="testName">Test Name</Label>
                      <Input
                        id="testName"
                        value={testData.name}
                        onChange={(e) => setTestData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Test User"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="testEmail">Test Email</Label>
                      <Input
                        id="testEmail"
                        value={testData.email}
                        onChange={(e) => setTestData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="test@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="testMobile">Test Mobile</Label>
                      <Input
                        id="testMobile"
                        value={testData.mobile}
                        onChange={(e) => setTestData(prev => ({ ...prev, mobile: e.target.value }))}
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="testOtp">Test OTP</Label>
                      <Input
                        id="testOtp"
                        value={testData.otp}
                        onChange={(e) => setTestData(prev => ({ ...prev, otp: e.target.value }))}
                        placeholder="123456"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={testEndpoints}>
                      Test Endpoint Reachability
                    </Button>
                    <Button 
                      type="button" 
                      variant="default" 
                      onClick={testFullFlow}
                      disabled={isTestingFlow}
                    >
                      {isTestingFlow ? "Testing..." : "Test Full Authentication Flow"}
                    </Button>
                  </div>

                  {testResults.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded">
                      <h4 className="font-medium mb-2">Test Results:</h4>
                      <pre className="text-sm whitespace-pre-wrap font-mono">
                        {testResults.join('\n')}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    API Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <h3>Required API Endpoints Structure</h3>
                    
                    <h4>1. Login/Signup Endpoints</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Request Format:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`POST /api/login
Content-Type: application/json

{
  "email": "user@example.com", // optional, based on requireEmail
  "mobile": "+1234567890", // optional, based on requireMobile  
  "name": "John Doe" // optional, based on requireName
}`}
                      </pre>
                    </div>

                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Response Format:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`{
  "token": "jwt_token_here",
  "user": {
    "id": "user123",
    "email": "user@example.com", 
    "mobile": "+1234567890",
    "name": "John Doe",
    "role": "user",
    "subscription": "premium",
    "customField1": "value1"
  },
  "success": true
}`}
                      </pre>
                    </div>

                    <h4>2. Email OTP Flow</h4>
                    
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Send Email OTP Request:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`POST /api/send-email-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe" // optional
}`}
                      </pre>
                    </div>

                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Verify Email OTP Request:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`POST /api/verify-email-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}`}
                      </pre>
                    </div>

                    <h4>3. Mobile OTP Flow</h4>
                    
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Send Mobile OTP Request:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`POST /api/send-mobile-otp
Content-Type: application/json

{
  "mobile": "+1234567890",
  "name": "John Doe" // optional
}`}
                      </pre>
                    </div>

                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Verify Mobile OTP Request:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`POST /api/verify-mobile-otp
Content-Type: application/json

{
  "mobile": "+1234567890",
  "otp": "123456"
}`}
                      </pre>
                    </div>

                    <h4>4. Token Validation (optional)</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <strong>Request:</strong>
                      <pre className="mt-2 bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`POST /api/validate-token
Content-Type: application/json

{
  "token": "jwt_token_here"
}`}
                      </pre>
                    </div>

                    <h4>5. Error Response Format</h4>
                    <div className="bg-red-50 p-3 rounded text-sm">
                      <strong>All endpoints should return errors in this format:</strong>
                      <pre className="mt-2 bg-gray-800 text-red-400 p-2 rounded overflow-x-auto">
{`{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_FAILED"
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const AuthBlockItem: React.FC<ContentBlockItemProps> = ({ data }) => {
  return (
    <div className="p-4 border rounded-md text-center text-sm">
      <UserCheck className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
      <div className="font-medium">Authentication Required</div>
      {data.useOtp && (
        <div className="text-xs text-muted-foreground mt-1">
          OTP: {data.otpType === 'both' ? 'Email & Mobile' : data.otpType === 'mobile' ? 'Mobile' : 'Email'}
        </div>
      )}
    </div>
  );
};

const AuthBlockPreview: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-1 text-sm">
      <UserCheck className="w-4 h-4 mr-2" /> Auth
    </div>
  );
};

export const AuthBlock: BlockDefinition = {
  type: "auth",
  name: "Authentication",
  description: "Authenticate user before continuing",
  icon: <UserCheck className="w-4 h-4" />,
  defaultData: {
    type: "auth",
    loginUrl: "",
    signupUrl: "",
    useOtp: false,
    otpType: "email", // email, mobile, both
    sendEmailOtpUrl: "",
    verifyEmailOtpUrl: "",
    sendMobileOtpUrl: "",
    verifyMobileOtpUrl: "",
    tokenField: "token",
    tokenStorageKey: "authToken",
    validateTokenUrl: "",
    requireName: false,
    requireEmail: true,
    requireMobile: false,
    nameLabel: "Name",
    emailLabel: "Email",
    mobileLabel: "Mobile Number",
    fieldMappings: {},
  },
  renderItem: (props: ContentBlockItemProps) => <AuthBlockItem {...props} />,
  renderFormFields: (props: ContentBlockItemProps) => <AuthBlockForm {...props} />,
  renderPreview: () => <AuthBlockPreview />,
  validate: (data: BlockData) => {
    if (!data.loginUrl && !data.signupUrl) {
      return "At least one authentication URL (login or signup) is required";
    }
    if (data.useOtp) {
      const otpType = data.otpType || 'email';
      if (otpType === 'email' || otpType === 'both') {
        if (!data.sendEmailOtpUrl || !data.verifyEmailOtpUrl) {
          return "Both Send Email OTP URL and Verify Email OTP URL are required when Email OTP is enabled";
        }
      }
      if (otpType === 'mobile' || otpType === 'both') {
        if (!data.sendMobileOtpUrl || !data.verifyMobileOtpUrl) {
          return "Both Send Mobile OTP URL and Verify Mobile OTP URL are required when Mobile OTP is enabled";
        }
      }
    }
    return null;
  },
};