import React, { useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AppEntry } from '../types';

interface AppCardProps {
  app: AppEntry;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const hasMultipleImages = app.images.length > 1;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? app.images.length - 1 : prev - 1
    );
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === app.images.length - 1 ? 0 : prev + 1
    );
  };

  const goToIndex = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLightboxOpen(false);
  };

  return (
    <>
      <div className="bg-studio-surface rounded-2xl overflow-hidden border border-studio-border hover:border-gray-500 transition-all duration-200 flex flex-col h-full group shadow-lg">
        {/* Image Carousel */}
        <div
          className="w-full h-64 bg-black/20 relative overflow-hidden cursor-pointer"
          onClick={app.images.length > 0 ? openLightbox : undefined}
        >
          {app.images.length > 0 ? (
            <>
              <img
                src={app.images[currentImageIndex]}
                alt={`${app.name} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Navigation Arrows - only show on hover when multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {app.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => goToIndex(index, e)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentImageIndex
                        ? 'bg-white scale-110'
                        : 'bg-white/50 hover:bg-white/75'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-studio-bg text-studio-subtext">
              No screenshot
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800/50">
              {app.category}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-studio-text mb-2">{app.name}</h3>

          {app.prompt && (
            <div className="mb-4 p-3 bg-studio-surface border border-studio-border rounded-lg">
              <h4 className="text-xs uppercase tracking-wider text-studio-subtext mb-1 font-semibold">Prompt</h4>
              <code className="text-xs text-studio-text block font-mono whitespace-pre-wrap line-clamp-4">
                {app.prompt}
              </code>
            </div>
          )}

          <a
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-[#0B57D0] hover:bg-[#0842A0] text-white rounded-full text-sm font-medium transition-colors"
          >
            View App
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute top-4 left-4 text-white/70 text-sm">
              {currentImageIndex + 1} / {app.images.length}
            </div>
          )}

          {/* Main Image */}
          <img
            src={app.images[currentImageIndex]}
            alt={`${app.name} screenshot ${currentImageIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {app.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToIndex(index, e)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
