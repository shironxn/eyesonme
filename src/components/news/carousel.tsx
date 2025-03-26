"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

export function NewsCarousel({ images, className }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 100);
  };

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 100);
  }, [currentIndex, isAnimating, images.length]);

  const goToSlide = (slideIndex: number) => {
    if (isAnimating || slideIndex === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(slideIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 100);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating, goToNext]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative h-[400px] w-full overflow-hidden rounded-base border-border">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-500",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className={cn(
                "object-cover transition-transform duration-700",
                isAnimating && "scale-[1.02]",
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority={index === 0}
            />
          </div>
        ))}

        <Button
          variant="noShadow"
          size="icon"
          className="absolute left-4 top-1/2 z-20 h-8 w-8 -translate-y-1/2 bg-bw hover:bg-white hover:scale-110 transition-transform duration-200"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="noShadow"
          size="icon"
          className="absolute right-4 top-1/2 z-20 h-8 w-8 -translate-y-1/2 bg-bw hover:bg-white hover:scale-110 transition-transform duration-200"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-16 w-16 overflow-hidden rounded-base border-border transition-all duration-300",
              currentIndex === index
                ? "ring-2 ring-main ring-offset-2 scale-105"
                : "opacity-70 hover:opacity-100 hover:scale-105",
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={images[index]}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
