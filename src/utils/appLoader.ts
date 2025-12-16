import { AppEntry } from '../../types';

// Define the interface for the raw JSON data
// createdAt content can be optional in JSON, derived if missing
interface AppData {
    name: string;
    description: string;
    category: string;
    link: string;
    images: string[];
    prompt?: string;
    createdAt?: number;
    id?: string;
}

export function loadApps(): AppEntry[] {
    // 1. Load all JSON files from ../content/apps/
    const modules = import.meta.glob<AppData>('../content/apps/*.json', { eager: true });

    // 2. Transform into AppEntry array
    const apps: AppEntry[] = Object.entries(modules).map(([path, data]) => {
        // Derive ID from filename if not provided
        // e.g., "../content/apps/nebula-runner.json" -> "nebula-runner"
        const filename = path.split('/').pop()?.replace('.json', '') || 'unknown';
        const id = data.id || filename;

        // Process images to handle local paths relative to public
        // If image starts with '/', prepend BASE_URL
        const processedImages = data.images.map(img => {
            if (img.startsWith('/') && !img.startsWith('http')) {
                // Remove leading slash to avoid double slash if BASE_URL ends with /
                // Actually BASE_URL in vite usually ends with / or is ./
                // To be safe: join paths correctly. 
                // However, import.meta.env.BASE_URL defaults to '/' or configured value.

                const baseUrl = import.meta.env.BASE_URL;
                // If base is './', we should treat it carefully.
                // Assuming standard github pages config (e.g. /repo-name/), simple concatenation works if img has leading slash

                // Let's rely on standard logic: 
                // If deployment is on subpath /repo/, BASE_URL is /repo/.
                // Image /apps/foo.png should become /repo/apps/foo.png.

                return `${baseUrl.replace(/\/$/, '')}${img}`;
            }
            return img;
        });

        return {
            id,
            name: data.name,
            description: data.description,
            category: data.category,
            link: data.link,
            images: processedImages,
            prompt: data.prompt,
            createdAt: data.createdAt || Date.now(), // Fallback to now if missing
        };
    });

    // 3. Sort by createdAt desc (newest first)
    return apps.sort((a, b) => b.createdAt - a.createdAt);
}
