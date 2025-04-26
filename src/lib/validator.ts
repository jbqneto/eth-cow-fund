export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

export function isYouTubeUrl(url: string): boolean {
    if (!isValidUrl(url)) return false;

    const parsedUrl = new URL(url);
    return (
        parsedUrl.hostname.includes("youtube.com") ||
        parsedUrl.hostname.includes("youtu.be")
    );
}