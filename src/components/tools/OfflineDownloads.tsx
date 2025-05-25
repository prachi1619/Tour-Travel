import React, { useState } from 'react';
import { FaDownload, FaSpinner, FaCheck } from 'react-icons/fa';

interface DownloadItem {
  id: string;
  name: string;
  type: 'guide' | 'map' | 'phrasebook';
  size: string;
  status: 'not_downloaded' | 'downloading' | 'downloaded';
  progress?: number;
}

const OfflineDownloads = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: 'guide-delhi',
      name: 'Delhi City Guide',
      type: 'guide',
      size: '25MB',
      status: 'not_downloaded'
    },
    {
      id: 'guide-mumbai',
      name: 'Mumbai City Guide',
      type: 'guide',
      size: '28MB',
      status: 'not_downloaded'
    },
    {
      id: 'map-rajasthan',
      name: 'Rajasthan Offline Map',
      type: 'map',
      size: '45MB',
      status: 'not_downloaded'
    },
    {
      id: 'map-kerala',
      name: 'Kerala Offline Map',
      type: 'map',
      size: '38MB',
      status: 'not_downloaded'
    },
    {
      id: 'phrase-hindi',
      name: 'Hindi Phrasebook',
      type: 'phrasebook',
      size: '12MB',
      status: 'not_downloaded'
    },
    {
      id: 'phrase-tamil',
      name: 'Tamil Phrasebook',
      type: 'phrasebook',
      size: '10MB',
      status: 'not_downloaded'
    }
  ]);

  const handleDownload = (id: string) => {
    setDownloads(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'downloading', progress: 0 };
      }
      return item;
    }));

    // Simulate download progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 100) {
        setDownloads(prev => prev.map(item => {
          if (item.id === id) {
            return { ...item, progress };
          }
          return item;
        }));
      } else {
        clearInterval(interval);
        setDownloads(prev => prev.map(item => {
          if (item.id === id) {
            return { ...item, status: 'downloaded', progress: undefined };
          }
          return item;
        }));
      }
    }, 500);
  };

  const renderDownloadButton = (item: DownloadItem) => {
    switch (item.status) {
      case 'not_downloaded':
        return (
          <button
            onClick={() => handleDownload(item.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <FaDownload className="mr-2" />
            Download
          </button>
        );
      case 'downloading':
        return (
          <div className="flex items-center">
            <FaSpinner className="animate-spin mr-2" />
            <div className="w-24 h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-blue-600 rounded"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        );
      case 'downloaded':
        return (
          <span className="text-green-600 flex items-center">
            <FaCheck className="mr-2" />
            Downloaded
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Offline Downloads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloads.map((item) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.size}</p>
              </div>
              {renderDownloadButton(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineDownloads; 