'use client';

import React, { Suspense } from 'react';

export default function AgendaLayout({ children }) {
    return (
        <Suspense fallback={<div className='w-screen h-screen bg-bg text-slate-800 text-xs uppercase'>Loading Agenda...</div>}>
            {children}
        </Suspense>
    );
}
