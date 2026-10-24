import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apocrypha DXD: ForeverWorlds — Writer App',
  description: 'Specialized multi-model writing and literary-analysis environment for Apocrypha DXD: ForeverWorlds, supporting Technique Packs, narrative causality analysis, and operational tracking.',
  openGraph: {
    title: 'Apocrypha DXD: ForeverWorlds — Writer App',
    description: 'Specialized multi-model writing and literary-analysis environment for Apocrypha DXD: ForeverWorlds, supporting Technique Packs, narrative causality analysis, and operational tracking.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apocrypha DXD: ForeverWorlds — Writer App',
    description: 'Specialized multi-model writing and literary-analysis environment for Apocrypha DXD: ForeverWorlds, supporting Technique Packs, narrative causality analysis, and operational tracking.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-950 text-stone-100 antialiased font-sans selection:bg-stone-800 selection:text-stone-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
