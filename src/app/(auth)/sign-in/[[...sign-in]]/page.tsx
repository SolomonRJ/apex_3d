import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <SignIn appearance={{ elements: { headerTitle: 'text-gold-400' } }} />
        </div>
    );
}
