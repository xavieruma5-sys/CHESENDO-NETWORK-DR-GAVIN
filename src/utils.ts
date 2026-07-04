/**
 * Extracts the YouTube Video ID from a standard URL, share link, or embed code.
 */
export function getYouTubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  
  // Regex to capture YouTube video IDs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return null;
}

/**
 * Checks if a string is a valid URL
 */
export function isValidUrl(urlStr: string): boolean {
  try {
    new URL(urlStr);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Formats a Date string nicely
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (_) {
    return dateString;
  }
}
