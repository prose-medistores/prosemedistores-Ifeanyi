import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Smartphone, Chrome, Globe } from "lucide-react";
export default function HowToInstall() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F4F8FB] flex flex-col items-center px-6 py-12">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-[#00477B] mb-6">
            How to Install ProseMediStore on Your Device
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Access <b>ProseMediStore</b> faster by installing it directly on your
            phone or tablet. No need to visit the website every time, it works
            like a real app, always within your reach.
          </p>
          {/* Android Section */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="text-[#00B2FF]" />
              <h2 className="text-xl font-semibold text-gray-800">
                For Android Users
              </h2>
            </div>
            <div className="bg-[#E8F8FF] border border-[#C2ECFF] rounded-xl p-5 text-gray-700">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  Open <b>Chrome</b> on your Android phone and go to{" "}
                  <span className="text-[#00477B]">prosemedistore.com</span>.
                </li>
                <li>
                  Once the page loads fully, you may see a small prompt at the
                  bottom saying: <b>“Add ProseMediStore to Home screen”</b>.
                </li>
                <li>
                  Tap <b>Add</b>. If you don’t see the banner, tap the{" "}
                  <b>three-dot menu (⋮)</b> in the top-right corner of Chrome.
                </li>
                <li>From the menu, select <b>Add to Home screen</b>.</li>
                <li>
                  Tap <b>Add</b> again to confirm. The ProseMediStore app icon
                  will now appear on your home screen.
                </li>
              </ol>
              <p className="mt-4 text-sm text-gray-500 italic">
                ✅ Tip: Once added, you can browse medicines and healthcare
                products seamlessly — even with limited internet.
              </p>
            </div>
          </section>
          {/* iOS Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="text-[#00477B]" />
              <h2 className="text-xl font-semibold text-gray-800">
                For iPhone & iPad Users
              </h2>
            </div>
            <div className="bg-[#F0F6FF] border border-[#CCE0FF] rounded-xl p-5 text-gray-700">
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  Open <b>Safari</b> and visit{" "}
                  <span className="text-[#00477B]">prosemedistore.com</span>.
                </li>
                <li>
                  Tap the <b>Share icon</b> (a square with an upward arrow) at
                  the bottom of your screen.
                </li>
                <li>Scroll down and tap <b>Add to Home Screen</b>.</li>
                <li>
                  Rename it if you wish, then tap <b>Add</b> in the top-right
                  corner.
                </li>
                <li>
                  You’ll now see the ProseMediStore icon on your home screen —
                  tap it anytime for quick access.
                </li>
              </ol>
              <p className="mt-4 text-sm text-gray-500 italic">
                💡Tip: Opening ProseMediStore from your home screen gives a
                full-screen, app-like experience with faster loading.
              </p>
            </div>
          </section>
          {/* Extra note */}
          <div className="mt-10 text-center">
            <p className="text-gray-700 leading-relaxed">
              With ProseMediStore installed, you’ll enjoy a smooth shopping
              experience for all your health and wellness needs medicines,
              supplements, and trusted healthcare essentials.
            </p>
            <p className="mt-4 font-medium text-[#00477B]">
              Visit <b>prosemedistore.com</b> on your mobile device to get started :rocket:
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

