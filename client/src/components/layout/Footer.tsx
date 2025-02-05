import { Toaster } from "sonner";

export default function Footer() {
  return (
    <footer className="bg-[#1A2238] font-mono border-t border-[#354766] text-[#9E9E9E] flex items-center justify-center h-16 px-4 lg:px-6 relative text-center">
      <div className="text-xs md:text-base lg:text-sm">
        &copy; {new Date().getFullYear()} chatApp. Made with ❤️ by Anudeep. All rights reserved.
      </div>
      <Toaster />
    </footer>
  );
}
