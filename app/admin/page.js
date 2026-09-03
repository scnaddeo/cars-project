import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/requireAdmin";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  if (await isAdminRequest()) {
    redirect("/admin/dashboard");
  }
  return <LoginForm />;
}
