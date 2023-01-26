import * as React from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface MapProps extends google.maps.MapOptions {
  style: React.CSSProperties;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

export const Map: React.FC<React.PropsWithChildren<MapProps>> = ({
  style,
  onClick,
  onIdle,
  children,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  useDeepCompareEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName),
      );

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }

      if (onIdle) {
        map.addListener('', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style}></div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export interface MarkerProps extends google.maps.MarkerOptions {
  onClick: (values: {
    map: google.maps.MarkerOptions['map'];
    marker: google.maps.Marker;
  }) => void;
}

export const Marker: React.FC<MarkerProps> = ({ onClick, ...options }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker && onClick) {
      const listener = marker.addListener(
        'click',
        () =>
          void onClick({
            marker,
            map: options.map,
          }),
      );

      return listener.remove;
    }
  }, [marker, onClick, options.map]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};
