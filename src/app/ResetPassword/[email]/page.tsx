import FogotPasswordCaptionCard from "@/app/_components/FogotPasswordCaptionCard";
import ForgotPasswordReset from "@/app/_components/ForgotPasswordReset";
interface paramType {
  email: string;
}
export default async function page({ params }: { params: paramType }) {
  const { email } = await params;
  return (
    <div className="w-9/12 m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 mb-20">
        <div className="col-span-1 hidden md:flex px-3">
          <FogotPasswordCaptionCard />
        </div>
        <div className="col-span-1 ">
          <ForgotPasswordReset email={decodeURIComponent(email)} />
        </div>
      </div>
    </div>
  );
}
