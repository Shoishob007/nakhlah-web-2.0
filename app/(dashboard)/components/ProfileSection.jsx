
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileSection() {
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Username</p>
          <p className="text-sm text-muted-foreground">Joined 2023</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-md font-semibold">Achievements</h3>
        <div className="flex space-x-2 mt-2">
          <span className="text-2xl">🏆</span>
          <span className="text-2xl">🏅</span>
        </div>
      </div>
    </div>
  );
}
