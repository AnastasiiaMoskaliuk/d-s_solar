import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f2] px-[20px]">
      <div className="w-full max-w-[450px] rounded-[20px] bg-white p-[30px] shadow-lg md:p-[40px]">
        <div className="mb-[30px] text-center">
          <h1 className="font-frontrunner text-[40px] font-bold text-[#154b4b]">
            D&S Solar
          </h1>

          <p className="mt-[8px] text-[16px] text-[#787A80]">
            Adminbereich
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}