"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const openGallery = (index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => setIsOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const galleryContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={closeGallery}
        >
          {/* Close Button */}
          <button
            onClick={closeGallery}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Project Name */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-medium border border-white/10 hidden md:block">
            {projectName}
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm group"
          >
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Main Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-[70vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-7xl mx-auto">
              <Image
                src={images[currentIndex]}
                alt={`${projectName} screenshot ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm group"
          >
            <ChevronRight className="w-8 h-8 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
            <div className="flex gap-3 p-3 bg-white/5 backdrop-blur-md rounded-2xl overflow-x-auto justify-center scrollbar-hide border border-white/10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden relative transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'ring-2 ring-emerald-500 scale-110 opacity-100 z-10 shadow-lg shadow-emerald-500/20' 
                      : 'opacity-50 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => openGallery(0)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-xl hover:bg-emerald-500/20 transition-all hover:scale-105 active:scale-95"
      >
        <Images className="w-4 h-4" />
        Gallery ({images.length})
      </button>

      {mounted ? createPortal(galleryContent, document.body) : null}
    </>
  );
}
