import Cal from "@calcom/embed-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

type ContactSectionProps = {
  profileImage?: string;
  name?: string;
  initials?: string;
  preText?: string;
  linkText?: string;
  calLink?: string;
};

export default function ContactSection({
  profileImage,
  name,
  initials,
  calLink,
  preText,
  linkText,
}: ContactSectionProps) {
  const getCalUsername = (url?: string): string | null => {
    if (!url) {
      return null;
    }

    try {
      if (url.includes("cal.com/")) {
        const parts = url.split("cal.com/");
        return parts[1]?.split("?")[0] || null;
      }

      if (!(url.includes("/") || url.includes("http"))) {
        return url;
      }

      return null;
    } catch {
      return null;
    }
  };

  const calUsername = getCalUsername(calLink);

  return (
    <section>
      <div>
        <div className="border border-dashed border-black/20 py-8 rounded-md dark:border-white/10">
          <div className="flex w-full flex-col items-center gap-4 px-6">
            {/* Text */}
            <p className="text-center text-base opacity-50 md:text-xl">
              {preText || "Hey, you scrolled this far, let's talk."}
            </p>

            {/* Button */}
            <div className="flex justify-center">
              {calUsername ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
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
                          >
                            <title>Add</title>
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          <div className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-[8px] ml-1 mr-2">
                            You
                          </div>
                        </div>
                        <span className="whitespace-nowrap relative block text-sm font-bold ml-0 group-hover:ml-4 transition-all duration-300">
                          {linkText || "Book a Free Call"}
                        </span>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    className="
                      max-w-[calc(100vw-2rem)]
                      sm:max-w-[calc(100vw-4rem)]
                      md:max-w-4xl!
                      max-h-[90vh]
                      overflow-hidden
                      p-0
                      rounded-xl
                    "
                  >
                    <DialogHeader className="px-6 pt-6 pb-3">
                      <DialogTitle className="text-center text-xl font-semibold">
                        Book a Meeting
                      </DialogTitle>
                      <DialogDescription className="text-center text-sm text-muted-foreground">
                        Schedule a time to connect and discuss opportunities
                      </DialogDescription>
                    </DialogHeader>

                    <div className="overflow-y-auto max-h-[calc(90vh-160px)] w-full px-3 pb-4">
                      <Cal
                        calLink={calUsername}
                        style={{ width: "100%", height: "100%" }}
                        config={{ layout: "month_view" }}
                        className="w-full h-[600px]"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <a
                  href="#contact"
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
                      >
                        <title>Add</title>
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
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
