"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

type ContactSectionProps = {
  profileImage?: string;
  name?: string;
  initials?: string;
  preText?: string;
  linkText?: string;
  calLink?: string;
  integrationsEnabled?: boolean;
};

export default function ContactSection({
  profileImage,
  name,
  initials,
  calLink,
  integrationsEnabled = true,
  preText = "Hey, you scrolled this far, let's talk.",
  linkText = "Book a Free Call",
}: ContactSectionProps) {
  useEffect(() => {
    console.log("ContactSection mounted", { integrationsEnabled, calLink });
    if (integrationsEnabled && calLink) {
      (async () => {
        const cal = await getCalApi();
        cal("ui", {
          styles: { branding: { brandColor: "#000000" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      })();
    }
  }, [calLink, integrationsEnabled]);

  if (!integrationsEnabled) {
    return null;
  }

  return (
    <section className="mb-1">
      <div className="py-8">
        <div className="flex w-full flex-col items-center gap-4 px-6">
          <p className="text-center text-base opacity-50 md:text-xl">
            {preText}
          </p>

          <div className="flex justify-center">
            {integrationsEnabled && calLink ? (
              <button
                type="button"
                data-cal-link={calLink}
                data-cal-config='{"layout":"month_view"}'
                className="group inline-flex items-center bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_rgba(255,255,255,0.1)] text-black dark:text-white cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 group-hover:gap-8 transition-all duration-300 relative z-20">
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    {profileImage ? (
                      <img
                        alt={name || "Profile"}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                        src={profileImage}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs font-medium text-black">
                        {initials || "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-0 absolute left-6 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <div className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[8px] ml-1 mr-2">
                      You
                    </div>
                  </div>
                  <span className="whitespace-nowrap relative block text-sm font-bold ml-0 group-hover:ml-4 transition-all duration-300">
                    {linkText}
                  </span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="group inline-flex items-center bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] dark:shadow-[0_0_5px_rgba(255,255,255,0.1)] text-black dark:text-white cursor-pointer transition-all"
                onClick={() =>
                  calLink && window.open(`https://cal.com/${calLink}`, "_blank")
                }
              >
                <div className="flex items-center gap-2 group-hover:gap-8 transition-all duration-300 relative z-20">
                  <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                    {profileImage ? (
                      <img
                        alt={name || "Profile"}
                        width={20}
                        height={20}
                        className="w-full h-full object-cover"
                        src={profileImage}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs font-medium text-black">
                        {initials || "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-0 absolute left-6 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <div className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[8px] ml-1 mr-2">
                      You
                    </div>
                  </div>
                  <span className="whitespace-nowrap relative block text-sm font-bold ml-0 group-hover:ml-4 transition-all duration-300">
                    Get in Touch
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
