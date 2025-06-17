import React from "react";
import { BlockDefinition, ContentBlockItemProps } from "../../types";
import { Input } from "@survey-form-builder/components/ui/input";
import { Label } from "@survey-form-builder/components/ui/label";
import { Checkbox } from "@survey-form-builder/components/ui/checkbox";
import { Button } from "@survey-form-builder/components/ui/button";
import { UserCheck } from "lucide-react";

const AuthBlockForm: React.FC<ContentBlockItemProps> = ({ data, onUpdate }) => {
  const [testResults, setTestResults] = React.useState<string[]>([]);
  const handleChange = (field: string, value: any) => {
    onUpdate?.({
      ...data,
      [field]: value,
    });
  };

  const testEndpoints = async () => {
    const endpoints = [
      { label: "loginUrl", url: data.loginUrl },
      { label: "signupUrl", url: data.signupUrl },
      { label: "sendOtpUrl", url: data.sendOtpUrl },
      { label: "verifyOtpUrl", url: data.verifyOtpUrl },
      { label: "validateTokenUrl", url: data.validateTokenUrl },
    ];
    const results: string[] = [];
    for (const ep of endpoints) {
      if (!ep.url) continue;
      try {
        const res = await fetch(ep.url, { method: "GET" });
        results.push(`${ep.label}: ${res.ok ? "ok" : res.status}`);
      } catch {
        results.push(`${ep.label}: error`);
      }
    }
    setTestResults(results.length ? results : ["No URLs configured"]);
  };

  return (
    <div className="space-y-4">
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nameLabel">Name Label</Label>
          <Input
            id="nameLabel"
            value={data.nameLabel || "Name"}
            onChange={(e) => handleChange("nameLabel", e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emailLabel">Email Label</Label>
          <Input
            id="emailLabel"
            value={data.emailLabel || "Email"}
            onChange={(e) => handleChange("emailLabel", e.target.value)}
            placeholder="Email"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="useOtp"
          checked={!!data.useOtp}
          onCheckedChange={(checked) => handleChange("useOtp", !!checked)}
        />
        <Label htmlFor="useOtp">Use OTP</Label>
      </div>

      {data.useOtp && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sendOtpUrl">Send OTP URL</Label>
            <Input
              id="sendOtpUrl"
              value={data.sendOtpUrl || ""}
              onChange={(e) => handleChange("sendOtpUrl", e.target.value)}
              placeholder="https://api.example.com/send-otp"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="verifyOtpUrl">Verify OTP URL</Label>
            <Input
              id="verifyOtpUrl"
              value={data.verifyOtpUrl || ""}
              onChange={(e) => handleChange("verifyOtpUrl", e.target.value)}
              placeholder="https://api.example.com/verify-otp"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tokenField">Token Field</Label>
          <Input
            id="tokenField"
            value={data.tokenField || ""}
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
        <Label htmlFor="validateTokenUrl">Validate Token URL</Label>
        <Input
          id="validateTokenUrl"
          value={data.validateTokenUrl || ""}
          onChange={(e) => handleChange("validateTokenUrl", e.target.value)}
          placeholder="https://api.example.com/validate-token"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="space-y-2">
        <Button type="button" variant="outline" onClick={testEndpoints}>
          Test Endpoints
        </Button>
        {testResults.length > 0 && (
          <ul className="list-disc pl-4 text-sm">
            {testResults.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const AuthBlockItem: React.FC<ContentBlockItemProps> = () => {
  return (
    <div className="p-4 border rounded-md text-center text-sm">
      Authentication Required
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
    sendOtpUrl: "",
    verifyOtpUrl: "",
    tokenField: "token",
    tokenStorageKey: "authToken",
    validateTokenUrl: "",
    requireName: false,
    requireEmail: true,
    nameLabel: "Name",
    emailLabel: "Email",
  },
  renderItem: (props) => <AuthBlockItem {...props} />,
  renderFormFields: (props) => <AuthBlockForm {...props} />,
  renderPreview: () => <AuthBlockPreview />,
  validate: () => null,
};
