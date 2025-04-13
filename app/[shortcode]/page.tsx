'use client';

import { useEffect } from 'react';

export default function RedirectPage({ params }) {
  const { shortcode } = params;
  console.log('Frontend shortcode:', shortcode);

  useEffect(() => {
    if (shortcode) {
      window.location.href = `/api/urls/${shortcode}`;
    } else {
      window.location.href = '/error?message=Missing short code';
    }
  }, [shortcode]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Redirecting…</h1>
      <p className="text-gray-600">Please wait while we send you to the destination.</p>
    </main>
  );
}