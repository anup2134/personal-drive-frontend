import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut, Key, Trash2, Upload } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import {
  selectFname,
  selectEmail,
  selectPicture,
  selectLname,
} from "@/store/userSlice";

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = {
    firstName: useAppSelector(selectFname),
    lastName: useAppSelector(selectLname),
    email: useAppSelector(selectEmail),
    avatarUrl: useAppSelector(selectPicture),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setFormData((prev) => ({
              ...prev,
              avatarUrl: event.target?.result as string,
            }));
          }
        };
        if (e.target.files && e.target.files[0])
          reader.readAsDataURL(e.target.files[0]);

        setIsUploading(false);
      }, 1000);
    }
  };

  const handleChangePassword = () => {
    // In a real app, you would implement password change logic here
    console.log("Change password");
  };

  const handleDeleteAccount = () => {
    // In a real app, you would implement account deletion logic here
    console.log("Delete account");
    navigate("/");
  };

  const handleLogoutAll = () => {
    // In a real app, you would implement logout from all devices logic here
    console.log("Logout from all devices");
    navigate("/login");
  };

  return (
    <div className="container max-w-4xl py-10 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={formData.avatarUrl || "/placeholder.svg"}
                  alt={`${formData.firstName} ${formData.lastName}`}
                />
                <AvatarFallback>{`${formData.firstName.charAt(
                  0
                )}${formData.lastName.charAt(0)}`}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Upload className="h-4 w-4" />
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <Separator />

          {/* Account Management Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Management</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Change Password */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and a new password.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleChangePassword}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Delete Account */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Logout from All Devices */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout All Devices
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Logout from all devices?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will sign you out from all devices where you are
                      currently logged in.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogoutAll}>
                      Logout All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <>
              <div></div>
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
