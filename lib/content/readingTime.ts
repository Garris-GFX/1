
// Simple reading time helper used by pages to display estimated read time.
export function getReadingTime(text?: string | null) {
	const wordsPerMinute = 200;
	if (!text) return { minutes: 0, words: 0, label: '0 min' };
	const words = String(text).trim().split(/\s+/).length;
	const minutesFloat = words / wordsPerMinute;
	const minutes = Math.max(1, Math.round(minutesFloat));
	const label = minutes <= 1 ? `${minutes} min` : `${minutes} min`;
	return { minutes, words, label };
}
