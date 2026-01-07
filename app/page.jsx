import { redirect } from "next/navigation";
import HomeContent from "@/app/(dashboard)/components/HomeContents";
import ClientWrapper from "./ClientWrapper";

export default function HomePage() {
    redirect("/onboarding");

  return (
    <ClientWrapper>
      <HomeContent />
    </ClientWrapper>
  );
}
