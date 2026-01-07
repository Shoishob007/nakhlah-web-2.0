export function Circle({ isCompleted, isCurrent, isLocked, icon, type }) {
  const getCircleStyles = () => {
    // Special types (trophy, checkpoint, crown) - always use special styling
    if (type === 'trophy') {
      return 'bg-yellow-500 border-yellow-600 shadow-lg scale-110';
    }
    if (type === 'checkpoint') {
      return 'bg-purple-500 border-purple-600 shadow-lg';
    }
    if (type === 'crown') {
      return 'bg-amber-500 border-amber-600 shadow-lg scale-110';
    }
    
    // Regular lessons
    if (isCurrent) {
      // Current lesson - accent color (assuming accent is a bright color like blue/cyan)
      return 'bg-accent border-accent shadow-lg animate-pulse';
    }
    if (isCompleted) {
      // Completed lesson - primary color (green)
      return 'bg-primary border-primary shadow-md';
    }
    // Locked lesson - gray
    return 'bg-gray-400 border-gray-500 opacity-60';
  };

  return (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${getCircleStyles()} cursor-pointer hover:scale-105 transition-transform`}>
      <div className="text-white">
        {icon}
      </div>
    </div>
  );
}