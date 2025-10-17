"use client"

import { HackathonCard } from "./components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "./components/project-card";
import { ResumeCard } from "./components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PortfolioData } from "@/components/portfolio-data-provider";
import { getLinkIcon } from "./components/portfolio-icons";
import ResponsiveNavbar from "./components/responsive-navbar";
import Link from "next/link";
import Markdown from "react-markdown";
import posthog from "posthog-js";
import { useEffect } from "react";

const BLUR_FADE_DELAY = 0.04;

const capturePostHogEvent = (username: string) => {
  posthog.capture('portfolio_opened', {
    user: username,
  })
}

/**
 * Template-01: Classic Portfolio
 * 
 * A clean and professional single-page portfolio template featuring
 * smooth blur-fade animations, responsive design, and comprehensive sections.
 * 
 * Features:
 * - Animated hero section with avatar
 * - About section with markdown support
 * - Work experience timeline
 * - Education history
 * - Skills showcase
 * - Project gallery with images/videos
 * - Certifications & achievements
 * - Contact section
 * 
 * @param portfolioData - The user's portfolio data
 */
export default function Template01({ portfolioData }: { portfolioData: PortfolioData }) {

  useEffect(() => {
    capturePostHogEvent(portfolioData.username);
  },[portfolioData.username]);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-6 md:space-y-8 px-4  md:pt-8 pb-20 md:pb-10">
      <ResponsiveNavbar portfolioData={portfolioData} />
      
      {/* Hero Section */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-6 md:space-y-8">
          <div className="gap-4 md:gap-2 flex flex-col-reverse sm:flex-row justify-between items-center sm:items-start">
            <div className="flex-col flex flex-1 space-y-1.5 text-center sm:text-left">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${portfolioData.name.split(" ")[0]}`}
              />
              <BlurFadeText
                className="max-w-[600px] text-base md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={portfolioData.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-24 sm:size-28 border">
                <AvatarImage alt={portfolioData.name} src={portfolioData.avatarUrl} />
                <AvatarFallback>{portfolioData.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            <Markdown>
              {portfolioData.summary}
            </Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Work Experience Section */}
      {portfolioData.work && portfolioData.work.length > 0 && (
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">Work Experience</h2>
            </BlurFade>
            {portfolioData.work.map((work: any, id: number) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {portfolioData.education && portfolioData.education.length > 0 && (
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {portfolioData.education.map((education: any, id: number) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {portfolioData.skills && portfolioData.skills.length > 0 && (
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {portfolioData.skills.map((skill: any, id: number) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <section id="projects">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Check out my latest work
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I&apos;ve worked on a variety of projects, from simple
                    websites to complex web applications. Here are a few of my
                    favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
              {portfolioData.projects.map((project: any, id: number) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                >
                  <ProjectCard
                    href={project.href}
                    key={project.title}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links.map((link: any) => ({
                      ...link,
                      icon: getLinkIcon(link.linkTitle)
                    }))}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications & Achievements Section */}
      {portfolioData.hackathons && portfolioData.hackathons.length > 0 && (
        <section id="hackathons">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    Co-curricular Activities
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Certifications & Achievements
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I believe in continuous learning and professional development. Here are some of the{" "}
                    {portfolioData.hackathons.length} certifications and achievements I&apos;ve earned
                    to enhance my skills and stay current with industry trends.
                  </p>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                {portfolioData.hackathons.map((project: any, id: number) => (
                  <BlurFade
                    key={project.title + project.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <HackathonCard
                      title={project.title}
                      description={project.description}
                      location={project.location}
                      dates={project.dates}
                      image={project.image}
                      links={project.links.map((link: any) => ({
                        ...link,
                        icon: getLinkIcon(link.linkTitle)
                      }))}
                    />
                  </BlurFade>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a mail{" "}
                <Link
                  href={portfolioData.contact.email ? `mailto:${portfolioData.contact.email}` : '#'}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
