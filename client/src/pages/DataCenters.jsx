import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { HiLocationMarker } from 'react-icons/hi';
import { datacentersAPI } from '../lib/api';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DataCenters = () => {
  const [datacenters, setDatacenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDC, setSelectedDC] = useState(null);

  useEffect(() => {
    const fetchDatacenters = async () => {
      try {
        const { data } = await datacentersAPI.getAll();
        setDatacenters(data.datacenters);
      } catch (error) {
        console.error('Failed to fetch data centers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatacenters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen section-padding flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">
            Global <span className="gradient-text">Data Centers</span>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Our infrastructure spans across {datacenters.length} strategic locations worldwide,
            ensuring low latency and high availability for your applications.
          </p>
        </div>

        {/* Map */}
        <div className="glass-dark rounded-2xl overflow-hidden mb-12" style={{ height: '500px' }}>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {datacenters.map((dc) => (
              <Marker
                key={dc.id}
                position={[dc.latitude, dc.longitude]}
                eventHandlers={{
                  click: () => setSelectedDC(dc),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-1">{dc.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {dc.city}, {dc.country}
                    </p>
                    {dc.description && (
                      <p className="text-sm">{dc.description}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Data Center Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datacenters.map((dc, index) => (
            <motion.div
              key={dc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-dark p-6 rounded-xl card-hover cursor-pointer border ${
                selectedDC?.id === dc.id ? 'border-primary-500' : 'border-dark-800'
              }`}
              onClick={() => setSelectedDC(dc)}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <HiLocationMarker className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{dc.name}</h3>
                  <p className="text-dark-400 text-sm mb-2">
                    {dc.city}, {dc.country}
                  </p>
                  {dc.description && (
                    <p className="text-dark-500 text-sm">{dc.description}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-800">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-dark-400">Coordinates:</span>
                  <span className="text-primary-400 font-mono">
                    {dc.latitude.toFixed(4)}, {dc.longitude.toFixed(4)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Lightning Fast</h4>
            <p className="text-dark-400 text-sm">
              Choose a datacenter closest to your users for minimal latency
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔒</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Secure Infrastructure</h4>
            <p className="text-dark-400 text-sm">
              Enterprise-grade security with DDoS protection and 24/7 monitoring
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h4 className="text-white font-semibold mb-2">99.9% Uptime</h4>
            <p className="text-dark-400 text-sm">
              Industry-leading uptime guarantee backed by our SLA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenters;
