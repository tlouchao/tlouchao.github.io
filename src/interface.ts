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

export interface HeadingProps {
    depth: number,
    text: string,
    slug: string,
}

// explicitly define frontmatter props for Typescript type safety? This should be auto-generated
export interface FrontmatterProps {
    title?: string,
    url?: string,
    frontmatter?: {
        title : string,
		description: string,
		// Transform string to Date object
		pubDate: Date,
		updatedDate: Date,
		heroImage: string,
        heroImageCaption: string,
    },
    headings?: HeadingProps[],
};