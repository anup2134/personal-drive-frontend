import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function EmailPassword({
  email,
  setEmail,
  password,
  setPassword,
}: {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}) {
  return (
    <>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          autoComplete="username"
          placeholder="Email"
          className="w-80"
          onChange={(e) => {
            setEmail(e.target.value.trim());
          }}
          value={email}
        />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value.trim());
          }}
          autoComplete="current-password"
          value={password}
        />
      </div>
    </>
  );
}
