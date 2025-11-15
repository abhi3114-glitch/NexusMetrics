import { memo } from 'react';

// Optimized: Replaced canvas animation with pure CSS for better performance
const ParticleBackground = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient orbs - CSS only, no JavaScript */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s', animationDuration: '10s' }} />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;