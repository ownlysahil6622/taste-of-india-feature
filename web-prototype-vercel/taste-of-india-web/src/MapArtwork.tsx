import { useLayoutEffect, useRef } from "react";
import indiaMap from "./assets/india-map.svg?raw";

/**
 * The India map: one inline SVG (src/assets/india-map.svg) holding the design's 42 map layers in
 * their original stacking order. Each of the 9 states has a dormant and a selected layer
 * (<g data-state="…">), and the selected colour cross-fades in (see .india-map in index.css).
 * It is part of the JavaScript bundle, so the map needs no extra requests.
 */
export default function MapArtwork({ selectedState }: { selectedState?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    mapRef.current?.querySelectorAll<SVGGElement>("[data-state]").forEach((layer) => {
      layer.classList.toggle("is-selected", layer.dataset.state === selectedState);
    });
  }, [selectedState]);

  return <div ref={mapRef} className="india-map" dangerouslySetInnerHTML={{ __html: indiaMap }} />;
}
