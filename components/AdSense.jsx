import React, { useEffect } from 'react';

const AdSense = () => {
  useEffect(() => {
    // Dynamically load the AdSense script if it hasn't been loaded yet
    const scriptId = 'google-adsense-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4039151236725935';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Initialize the ad slot
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense initialization error:', error);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 overflow-hidden flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-4039151236725935"
        data-ad-slot="3908666478"
      />
    </div>
  );
};

export default AdSense;