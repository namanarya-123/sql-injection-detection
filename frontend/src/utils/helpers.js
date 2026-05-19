export const severityLevels = ['Low', 'Medium', 'High', 'Critical'];

export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function badgeClass(level) {
  switch (level) {
    case 'Critical':
      return 'bg-red-500/15 text-red-300 border-red-600/40';
    case 'High':
      return 'bg-orange-500/15 text-orange-300 border-orange-600/40';
    case 'Medium':
      return 'bg-yellow-500/15 text-yellow-300 border-yellow-600/40';
    default:
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-600/40';
  }
}
