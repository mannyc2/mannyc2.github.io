import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectGalleryProps = {
  images: readonly GalleryImage[];
  href: string;
  title: string;
  priority?: boolean;
};

export function ProjectGallery({
  images,
  href,
  title,
  priority = false,
}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  const hasMultipleImages = images.length > 1;

  function showPrevious() {
    setSelectedIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNext() {
    setSelectedIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="project-gallery">
      <a
        className="project-gallery-stage"
        href={href}
        aria-label={`Open ${title}`}
      >
        <img
          key={selectedImage.src}
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={selectedImage.width}
          height={selectedImage.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </a>

      {hasMultipleImages ? (
        <div className="project-gallery-controls" aria-label={`${title} images`}>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={`Previous ${title} image`}
          >
            <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.8} />
          </button>
          <span aria-live="polite">
            {selectedIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            onClick={showNext}
            aria-label={`Next ${title} image`}
          >
            <ChevronRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
