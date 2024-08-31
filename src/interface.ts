// server
export interface PidInterface {
    public_id: string,
    tags: string[],
};

// client render
export interface GalleryItemInterface {
    props: GalleryItemProps[];
    tags: string[];
};

export interface GalleryItemProps {
    src: string, 
    label: string, 
    tags: string[],
};

// explicitly define frontmatter props for Typescript type safety? 
// this should be auto-generated
export interface FrontmatterProps {
    title?: string,
    url?: string,
    frontmatter?: {
        title : string,
    },
    headings?: {
        depth: number,
        text: string,
        slug: string,
    }[],
};