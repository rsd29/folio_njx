export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Loading blur overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
          backdropFilter: 'blur(40px)',
          willChange: 'backdrop-filter',
        }}
      />
      
      {/* Additional blur layer */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, transparent 60%)',
          backdropFilter: 'blur(20px)',
        }}
      />
      
      {/* Loading center element */}
      <div
        className="loading-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
