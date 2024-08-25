// server
export interface PidInterface {
    public_id: string,
    tags: string[],
}

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