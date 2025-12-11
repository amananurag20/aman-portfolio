"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaMicrophone } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi';
import Image from 'next/image';
import ProjectGallery from './ProjectGallery';

interface Achievement {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    images: string[];
    date: string;
    highlights: string[];
}

const achievements: Achievement[] = [
    {
        id: 1,
        title: "Gold Medalist",
        subtitle: "Highest CGPA - B.Tech (CSE - AI)",
        description: "Awarded the prestigious Gold Medal for securing the highest CGPA in the School of Engineering & Technology, batch 2020–2024. This recognition celebrates four years of consistent academic excellence and dedication to mastering Artificial Intelligence and Computer Science fundamentals.",
        icon: <FaMedal className="text-3xl text-yellow-400" />,
        images: [
            "/assests/achivements/Gold medal.png",
            "/assests/achivements/medal certificate.png"
        ],
        date: "2024",
        highlights: ["Gold Medal", "Highest CGPA", "B.Tech CSE-AI", "2020-2024"]
    },
    {
        id: 2,
        title: "Guest of Honor",
        subtitle: "MERN Stack Session - Lyallpur Khalsa College",
        description: "Delivered an impactful 2-hour hands-on session on the MERN Stack to B.Tech final year students at Lyallpur Khalsa College Technical Campus. Covered React.js fundamentals, Node.js backend development, MongoDB integration, and real-world project architecture. Honored with the Guest of Honor recognition for exceptional knowledge sharing and industry insights.",
        icon: <FaMicrophone className="text-3xl text-emerald-400" />,
        images: [
            "/assests/achivements/sessation pic.png"
        ],
        date: "2024",
        highlights: ["2-hour session", "MERN Stack", "B.Tech students", "Guest of Honor"]
    }
];

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative group"
        >
            <div className="bg-white dark:bg-gray-800/40 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm overflow-hidden">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                    <Image
                        src={achievement.images[0]}
                        alt={achievement.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                        {achievement.icon}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    {/* Date Badge and Gallery Button Row */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium">
                            <HiAcademicCap className="text-lg" />
                            <span>{achievement.date}</span>
                        </div>

                        {/* Gallery Preview Button - Same as ProjectGallery style */}
                        <ProjectGallery
                            images={achievement.images}
                            projectName={achievement.title}
                        />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        {achievement.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">
                        {achievement.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                        {achievement.description}
                    </p>

                    {/* Highlight Tags */}
                    <div className="flex flex-wrap gap-2">
                        {achievement.highlights.map((highlight, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            >
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const AchievementsSection = () => {
    return (
        <section id="achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mb-4">
                    <FaTrophy className="text-xl" />
                    <span className="text-sm font-semibold">Achievements & Awards</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Recognition & Milestones
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                    Celebrating academic excellence and contributions to the tech community
                </p>
            </motion.div>

            {/* Achievement Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.map((achievement, index) => (
                    <AchievementCard key={achievement.id} achievement={achievement} index={index} />
                ))}
            </div>
        </section>
    );
};

export default AchievementsSection;
