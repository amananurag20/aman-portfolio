"use client";

import React from "react";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
  ChevronRight,
  MailPlus,
  MouseIcon,
  Terminal,
  FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CertificationsSection from "@/components/cert";
import Head from "next/head";
import CopyCmd from "@/components/copycmd";
import { FlipWordsDemo } from "@/components/words";
import { DockDemo } from "@/components/dock";
import HoverImageComponent from "@/components/skills";
import ReadmeDisplay from "@/components/readme";
import ContactMe from "@/components/contact";
import { motion } from "framer-motion";
import ResumeSection from '@/components/ResumeSection';
import ExperienceSection from '@/components/ExperienceSection';
import Projects from "@/app/projects/page";

const certifications = [
  {
    id: 1,
    title: "SQL-Basic to Advanced",
    image: "/assests/images/geekster.png",
    description:
      "Received the certificate for comple the geekster SQL assignments",
    issuer: "Geekster",
    date: "2024-05-12",
  },
  {
    id: 2,
    title: "Bitcoin Script & Enterprise Course",
    image: "/assests/images/bitcoin.png",
    description: "Comprehensive course on Bitcoin and blockchain technologies.",
    issuer: "BSV Academy",
    date: "2024-06-15",
  },
  {
    id: 3,
    title: "Rookie Developer Badge",
    image: "/assests/images/tsoc.png",
    description: "Earned for assignment completion of the workshops in TSoC'24",
    issuer: "TimeChain Labs",
    date: "2024-06-35",
  },
  // Add more certification objects...
];
const page = () => {
    return (
        <main className="min-h-screen w-full">
            <section className="lg:max-w-[50%] mt-8 md:mt-24 md:max-w-[90%] relative md:m-auto p-4 flex flex-col">
                <div className=" flex gap-3 flex-col justify-center items-left min-h-[60vh] lg:min-h-screen">
                    <span className=" text-sm lg:text-md flex items-center gap-2 opacity-70 font-medium tracking-widest uppercase">
                        <Terminal size={17} />
                        Hi I am
                    </span>
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl flex gap-12 items-center flex-row md:text-7xl lg:text-8xl font-bold ">Aman Anurag</h1>
                        
                    </div>
                
                    <FlipWordsDemo />
                    
                    <p className=" opacity-80 text-sm lg:text-xl lg:mb-2 font-medium">
                        Software Engineer @< span className="  text-blue-500  font-bold"> <a href="https://sensationsolutions.com/">Sensation Software Solutions</a> </span> 
                    </p>
                    <div className="flex flex-col md:flex-row items-right mt-3 gap-1 md:gap-3">
                        <CopyCmd />
                        <DockDemo />
                    </div>
                    <HoverImageComponent  />
                    <ResumeSection />
                    <ExperienceSection />
                </div>
            </section>

            <Projects />
            
            <section className="lg:max-w-[50%] md:max-w-[90%] relative md:m-auto p-4 flex flex-col">
                <ContactMe />
            </section>
        </main>
    );
};

export default page;
